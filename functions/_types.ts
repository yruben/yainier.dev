// Shared Cloudflare Pages Function types

export interface Env {
    RESEND_API_KEY: string
    CONTACT_FROM_EMAIL: string
    CONTACT_TO_EMAIL: string
}

export interface PagesFunction<Env = unknown> {
    (context: { request: Request; env: Env }): Response | Promise<Response>
}
