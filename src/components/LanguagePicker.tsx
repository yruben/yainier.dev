import { languages } from '../i18n/ui';

export default function LanguagePicker({ currentLang = 'en' }: { currentLang: string }) {
    // Simple link based switching
    return (
        <div className="flex gap-2 text-sm font-medium">
            {Object.entries(languages).map(([lang, label]) => (
                <a
                    key={lang}
                    href={lang === 'en' ? '/' : `/${lang}/`}
                    className={`px-2 py-1 rounded transition-colors ${currentLang === lang ? 'text-light-primary dark:text-neon-cyan bg-gray-100 dark:bg-navy-800' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    {lang.toUpperCase()}
                </a>
            ))}
        </div>
    );
}
