import { Resend } from 'resend'

// Cloudflare Pages Function types
interface Env {
    RESEND_API_KEY: string
    CONTACT_FROM_EMAIL: string
    CONTACT_TO_EMAIL: string
}

interface PagesFunction<Env = unknown> {
    (context: { request: Request; env: Env }): Response | Promise<Response>
}

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

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ success: false, message: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }

        const resend = new Resend(env.RESEND_API_KEY)

        const result = await resend.emails.send({
            from: env.CONTACT_FROM_EMAIL,
            to: env.CONTACT_TO_EMAIL,
            replyTo: email.toString(),
            subject: `📩 Nuevo mensaje desde yainier.com`,
            text: `
Nombre: ${name}
Email: ${email}

Mensaje:
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
