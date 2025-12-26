import { languages, defaultLang } from '../i18n/ui';

interface LanguagePickerProps {
    currentLang: string;
    pathname?: string;
}

export default function LanguagePicker({ currentLang = 'en', pathname = '/' }: LanguagePickerProps) {
    const getLocalizedPath = (targetLang: string) => {
        // If the link is for the current language, just return # or current path
        if (targetLang === currentLang) return pathname;

        // 1. Remove the current language prefix to get the base "slug"
        let slug = pathname;
        if (currentLang !== defaultLang) {
            // Remove /es or /es/ from the start
            const prefix = `/${currentLang}`;
            if (slug.startsWith(prefix)) {
                slug = slug.slice(prefix.length);
            }
        }

        // Ensure slug is clean (e.g. if we stripped /es from /es/about, we have /about. 
        // If we stripped /es from /es, we have empty string or /)
        if (!slug.startsWith('/')) {
            slug = '/' + slug;
        }

        // 2. Build the new path
        if (targetLang === defaultLang) {
            return slug;
        } else {
            // Avoid double slashes if slug is just '/'
            if (slug === '/') return `/${targetLang}/`;
            return `/${targetLang}${slug}`;
        }
    };

    return (
        <div className="flex gap-2 text-sm font-medium">
            {Object.entries(languages).map(([lang, label]) => (
                <a
                    key={lang}
                    href={getLocalizedPath(lang)}
                    className={`px-2 py-1 rounded transition-colors ${currentLang === lang ? 'text-light-primary dark:text-neon-cyan bg-gray-100 dark:bg-navy-800' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    {lang.toUpperCase()}
                </a>
            ))}
        </div>
    );
}
