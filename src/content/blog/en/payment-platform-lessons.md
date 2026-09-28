---
title: "Lessons from Building a National Payment Platform"
pubDate: 2026-08-10
description: "What working on a digital payment platform taught me about idempotency, consistency and designing for failure."
author: "Yainier Martínez Ruben"
authorImage: "/profile_new.webp"
image: "/projects/plataforma-pagos.webp"
category: "Software Architecture"
tags: ["payments", "architecture", "backend", "reliability"]
---

# Lessons from Building a National Payment Platform

Working on a digital payment platform used for e-commerce and e-government services changes the way you think about software. When every request can move someone's money, "it works on my machine" is no longer an acceptable standard. These are the lessons that stayed with me.

## 1. Every operation must be idempotent

Networks fail at the worst possible moment. A client sends a payment, the connection drops, and the client retries. If your API is not idempotent, you just charged someone twice.

The fix is simple in concept:

- The client generates an **idempotency key** for each logical operation.
- The server stores the key together with the result of the first execution.
- Any retry with the same key returns the stored result instead of executing again.

```ts
async function handlePayment(req: PaymentRequest) {
  const existing = await store.find(req.idempotencyKey);
  if (existing) return existing.response;

  const response = await processPayment(req);
  await store.save(req.idempotencyKey, response);
  return response;
}
```

In production you also need to handle the race where two identical requests arrive at the same time — a unique constraint on the key in the database solves most of it.

## 2. Model money as states, not as a single write

A payment is not a single event; it is a **state machine**: `created → authorized → captured → settled`, with branches for `failed`, `reversed` and `refunded`. Making those states explicit gives you:

- Clear rules about which transitions are allowed.
- An audit trail that support and finance teams can actually read.
- A safe place to resume when a process crashes halfway through.

Never use floating point numbers for amounts. Store integers in the smallest unit (cents) or use a decimal type.

## 3. Integrations are the real system

A payment platform is mostly integrations: banks, merchants, government services, notification providers. Placing an **integration layer** (an ESB or a set of well-defined adapters) between your core and the outside world pays off quickly:

- Each external system can fail, change or be replaced without touching the core domain.
- Timeouts, retries and circuit breakers live in one place.
- You can simulate external systems in testing environments.

## 4. Reconciliation is not optional

No matter how good your code is, at some point your records and the bank's records will disagree. Build **daily reconciliation** processes from the start: compare transactions, flag differences and give operators tools to resolve them. It is far cheaper than discovering mismatches months later.

## 5. Observability is part of the feature

Logs with correlation IDs, metrics per integration and alerts on error rates are not "nice to have". When a merchant calls saying a payment didn't arrive, you need to answer in minutes, not days.

## Conclusion

Financial systems reward boring, predictable engineering. Idempotency, explicit states, isolated integrations, reconciliation and observability are the foundations I now bring to every project — even when no money is involved.
