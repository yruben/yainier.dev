import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind(),
        react(),
        sitemap({
            i18n: {
                defaultLocale: 'en',
                locales: { en: 'en-US', es: 'es-ES' },
            },
            filter: (page) => !page.includes('/gracias-hire'),
        })
    ],
    site: 'https://yainier.com',
    i18n: {
        defaultLocale: "en",
        locales: ["en", "es"],
        routing: {
            prefixDefaultLocale: false
        }
    }
});
