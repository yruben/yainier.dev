import { Resend } from 'resend'
import type { Env, PagesFunction } from '../_types'

const MAX_FIELD_LENGTH = 5000

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    const data = await request.formData().catch(() => null)
    const lang = data?.get('lang') === 'es' ? 'es' : 'en'
    const prefix = lang === 'es' ? '/es' : ''
    const redirect = (path: string) => new Response(null, { status: 303, headers: { Location: `${prefix}${path}` } })

    if (!data) {
        return redirect('/hire-me?error=1')
    }

    // Anti-spam honeypot: pretend it worked so bots don't retry
    if (data.get('_honey')) {
        return redirect('/gracias-hire')
    }

    const field = (key: string) => data.get(key)?.toString().trim().slice(0, MAX_FIELD_LENGTH) ?? ''
    const name = field('name')
    const email = field('email')
    const company = field('company') || '—'
    const projectType = field('project_type')
    const description = field('description')
    const budget = field('budget')
    const timeline = field('timeline')

    if (!name || !email || !projectType || !description || !budget || !timeline) {
        return redirect('/hire-me?error=1')
    }

    const subjects = {
        en: `🔥 Hire Request — ${budget} — ${projectType}`,
        es: `🔥 Solicitud de Proyecto — ${budget} — ${projectType}`,
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
        },
        es: {
            name: 'Nombre',
            email: 'Email',
            company: 'Empresa',
            type: 'Tipo de proyecto',
            budget: 'Presupuesto',
            timeline: 'Cronograma',
            desc: 'Descripción',
        },
    }
    const l = labels[lang]

    try {
        const resend = new Resend(env.RESEND_API_KEY)

        // No auto-reply to the submitted address: anyone could use the form to
        // make yainier.com send mail to arbitrary third parties.
        const result = await resend.emails.send({
            from: env.CONTACT_FROM_EMAIL,
            to: env.CONTACT_TO_EMAIL,
            replyTo: email,
            subject: subjects[lang],
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

        if (result.error) {
            console.error('Resend error:', result.error)
            return redirect('/hire-me?error=1')
        }

        return redirect('/gracias-hire')
    } catch (error) {
        console.error('Hire form error:', error)
        return redirect('/hire-me?error=1')
    }
}
