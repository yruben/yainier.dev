import { Resend } from 'resend'
import type { Env, PagesFunction } from '../_types'

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    try {
        const formData = await request.formData()

        // Honeypot anti-spam (matches ContactModal field name)
        if (formData.get('_honey')) {
            return new Response(
                JSON.stringify({ success: false, message: 'Spam detected' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }

        const name = formData.get('name')
        const email = formData.get('email')
        const message = formData.get('message')
        const lang = formData.get('lang') || 'en' // Get language from form, default to 'en'

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ success: false, message: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }

        const resend = new Resend(env.RESEND_API_KEY)

        // Define email subjects based on language
        const subjects = {
            en: `📩 New message from yainier.com`,
            es: `📩 Nuevo mensaje desde yainier.com`
        }

        // Define email content labels based on language
        const labels = {
            en: {
                name: 'Name',
                email: 'Email',
                message: 'Message'
            },
            es: {
                name: 'Nombre',
                email: 'Correo',
                message: 'Mensaje'
            }
        }

        const emailLang = lang === 'es' ? 'es' : 'en'
        const l = labels[emailLang]

        const result = await resend.emails.send({
            from: env.CONTACT_FROM_EMAIL,
            to: env.CONTACT_TO_EMAIL,
            replyTo: email.toString(),
            subject: subjects[emailLang],
            text: `
${l.name}: ${name}
${l.email}: ${email}

${l.message}:
${message}
      `,
        })

        if (result.error) {
            console.error('Resend error:', result.error)
            return new Response(
                JSON.stringify({ success: false, message: 'Failed to send email' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            )
        }

        // Return JSON success response (matches ContactModal expectations)
        return new Response(
            JSON.stringify({ success: true, message: 'Message sent successfully' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        console.error('Contact form error:', error)
        return new Response(
            JSON.stringify({ success: false, message: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}
