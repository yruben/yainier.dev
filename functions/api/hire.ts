import { Resend } from 'resend'
import type { Env, PagesFunction } from '../_types'

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    try {
        const data = await request.formData()

        // Anti-spam honeypot (matches Astro template field name)
        if (data.get('_honey')) {
            return new Response('Spam detected', { status: 400 })
        }

        const name = data.get('name')
        const email = data.get('email')
        const company = data.get('company') || '—'
        const projectType = data.get('project_type')
        const description = data.get('description')
        const budget = data.get('budget')
        const timeline = data.get('timeline')
        const lang = data.get('lang') || 'en'

        if (!name || !email || !projectType || !description || !budget || !timeline) {
            return new Response('Missing required fields', { status: 400 })
        }

        const resend = new Resend(env.RESEND_API_KEY)

        /* ==========================
           LOCALIZATION STRINGS
        ========================== */
        const subjects = {
            en: {
                lead: `🔥 Hire Request — ${budget} — ${projectType}`,
                auto: `Thanks for reaching out`
            },
            es: {
                lead: `🔥 Solicitud de Proyecto — ${budget} — ${projectType}`,
                auto: `Gracias por contactarme`
            }
        }

        const labels = {
            en: {
                name: 'Name',
                email: 'Email',
                company: 'Company',
                type: 'Project type',
                budget: 'Budget',
                timeline: 'Timeline',
                desc: 'Description',
                autoHi: 'Hi',
                autoBody: "Thanks for your interest in working together.\n\nI've received your project details and will review them shortly.\nYou can expect a response within 24–48 hours.\n\nBest regards,\nYainier"
            },
            es: {
                name: 'Nombre',
                email: 'Email',
                company: 'Empresa',
                type: 'Tipo de proyecto',
                budget: 'Presupuesto',
                timeline: 'Cronograma',
                desc: 'Descripción',
                autoHi: 'Hola',
                autoBody: "Gracias por tu interés en trabajar conmigo.\n\nHe recibido los detalles de tu proyecto y los revisaré pronto.\nPuedes esperar una respuesta en un plazo de 24 a 48 horas.\n\nSaludos cordiales,\nYainier"
            }
        }

        const emailLang = lang === 'es' ? 'es' : 'en'
        const s = subjects[emailLang]
        const l = labels[emailLang]

        /* ==========================
           EMAIL PARA TI (LEAD)
        ========================== */
        await resend.emails.send({
            from: env.CONTACT_FROM_EMAIL,
            to: env.CONTACT_TO_EMAIL,
            replyTo: email.toString(),
            subject: s.lead,
            text: `
${l.name}: ${name}
${l.email}: ${email}
${l.company}: ${company}

${l.type}: ${projectType}
${l.budget}: ${budget}
${l.timeline}: ${timeline}

${l.desc}:
${description}
      `,
        })

        /* ==========================
           EMAIL AUTOMÁTICO CLIENTE
        ========================== */
        await resend.emails.send({
            from: env.CONTACT_FROM_EMAIL,
            to: email.toString(),
            subject: s.auto,
            text: `
${l.autoHi} ${name},

${l.autoBody}
      `,
        })

        const redirectPath = lang === 'es' ? '/es/gracias-hire' : '/gracias-hire'

        return new Response(null, {
            status: 303,
            headers: {
                Location: redirectPath,
            },
        })
    } catch (error) {
        console.error(error)
        return new Response('Internal Server Error', { status: 500 })
    }
}
