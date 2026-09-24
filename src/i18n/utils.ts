import { ui, defaultLang, languages } from './ui';

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as Lang;
    return defaultLang;
}

export function useTranslations(lang: Lang) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}

/** Prefixes a root-relative path with the language segment (none for the default language). */
export function localizePath(lang: Lang, path = '/') {
    const clean = path.startsWith('/') ? path : `/${path}`;
    if (lang === defaultLang) return clean;
    return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/** Translates the current pathname into the equivalent pathname for another language. */
export function switchLangPath(pathname: string, currentLang: Lang, targetLang: Lang) {
    let slug = pathname;
    if (currentLang !== defaultLang && slug.startsWith(`/${currentLang}`)) {
        slug = slug.slice(currentLang.length + 1);
    }
    return localizePath(targetLang, slug || '/');
}

/** getStaticPaths helper for `[lang]` routes: the default language is served from the root. */
export function nonDefaultLangPaths() {
    return (Object.keys(languages) as Lang[])
        .filter((lang) => lang !== defaultLang)
        .map((lang) => ({ params: { lang } }));
}

export const dateLocale: Record<Lang, string> = { en: 'en-US', es: 'es-ES' };
export const ogLocale: Record<Lang, string> = { en: 'en_US', es: 'es_ES' };

/** Strips the `en/` or `es/` prefix from a content collection slug. */
export const stripLang = (slug: string) => slug.replace(/^[a-z]{2}\//, '');

/** Labels shared by the contact modal and the /contact page form. */
export function contactFormTrans(lang: Lang) {
    const t = useTranslations(lang);
    return {
        titlePart1: t('contact.title.part1'),
        titlePart2: t('contact.title.part2'),
        desc: t('contact.desc'),
        name: t('contact.form.name'),
        email: t('contact.form.email'),
        message: t('contact.form.message'),
        namePlaceholder: t('contact.form.name.placeholder'),
        emailPlaceholder: t('contact.form.email.placeholder'),
        messagePlaceholder: t('contact.form.message.placeholder'),
        send: t('contact.send'),
        sending: t('contact.sending'),
        success: t('contact.success'),
        error: t('contact.error'),
        networkError: t('contact.networkError'),
        honeypot: t('form.honeypot'),
        close: t('contact.close'),
    };
}

export type ContactFormTrans = ReturnType<typeof contactFormTrans>;
