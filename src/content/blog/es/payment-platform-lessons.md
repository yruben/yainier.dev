---
title: "Lecciones de construir una plataforma de pagos nacional"
pubDate: 2026-08-10
description: "Lo que trabajar en una plataforma de pagos digitales me enseñó sobre idempotencia, consistencia y diseñar pensando en los fallos."
author: "Yainier Martínez Ruben"
authorImage: "/profile_new.webp"
image: "/projects/plataforma-pagos.webp"
category: "Arquitectura de Software"
tags: ["pagos", "arquitectura", "backend", "fiabilidad"]
---

# Lecciones de construir una plataforma de pagos nacional

Trabajar en una plataforma de pagos digitales usada para comercio electrónico y servicios de gobierno electrónico cambia tu forma de pensar sobre el software. Cuando cada petición puede mover el dinero de alguien, "en mi máquina funciona" deja de ser un estándar aceptable. Estas son las lecciones que me quedaron.

## 1. Toda operación debe ser idempotente

Las redes fallan en el peor momento posible. Un cliente envía un pago, la conexión se cae y el cliente reintenta. Si tu API no es idempotente, acabas de cobrarle dos veces a alguien.

La solución es sencilla en concepto:

- El cliente genera una **clave de idempotencia** para cada operación lógica.
- El servidor guarda la clave junto con el resultado de la primera ejecución.
- Cualquier reintento con la misma clave devuelve el resultado guardado en lugar de ejecutarse de nuevo.

```ts
async function handlePayment(req: PaymentRequest) {
  const existing = await store.find(req.idempotencyKey);
  if (existing) return existing.response;

  const response = await processPayment(req);
  await store.save(req.idempotencyKey, response);
  return response;
}
```

En producción también hay que manejar la condición de carrera en la que dos peticiones idénticas llegan a la vez: una restricción única sobre la clave en la base de datos resuelve la mayor parte.

## 2. Modela el dinero como estados, no como una sola escritura

Un pago no es un evento único; es una **máquina de estados**: `creado → autorizado → capturado → liquidado`, con ramas para `fallido`, `revertido` y `reembolsado`. Hacer explícitos esos estados te da:

- Reglas claras sobre qué transiciones están permitidas.
- Un historial de auditoría que los equipos de soporte y finanzas pueden leer.
- Un punto seguro desde donde continuar cuando un proceso falla a mitad de camino.

Nunca uses números de punto flotante para los importes. Guarda enteros en la unidad mínima (centavos) o usa un tipo decimal.

## 3. Las integraciones son el sistema real

Una plataforma de pagos es, sobre todo, integraciones: bancos, comercios, servicios de gobierno, proveedores de notificaciones. Colocar una **capa de integración** (un ESB o un conjunto de adaptadores bien definidos) entre tu núcleo y el mundo exterior se paga rápido:

- Cada sistema externo puede fallar, cambiar o ser reemplazado sin tocar el dominio principal.
- Los timeouts, reintentos y circuit breakers viven en un solo lugar.
- Puedes simular los sistemas externos en los entornos de prueba.

## 4. La conciliación no es opcional

Por muy bueno que sea tu código, en algún momento tus registros y los del banco no coincidirán. Construye procesos de **conciliación diaria** desde el principio: compara transacciones, marca las diferencias y da a los operadores herramientas para resolverlas. Es mucho más barato que descubrir descuadres meses después.

## 5. La observabilidad es parte de la funcionalidad

Logs con IDs de correlación, métricas por integración y alertas sobre la tasa de errores no son un "extra". Cuando un comercio llama diciendo que un pago no llegó, necesitas responder en minutos, no en días.

## Conclusión

Los sistemas financieros premian la ingeniería aburrida y predecible. Idempotencia, estados explícitos, integraciones aisladas, conciliación y observabilidad son las bases que ahora llevo a cada proyecto, incluso cuando no hay dinero de por medio.
