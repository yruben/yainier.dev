import { languages } from '../i18n/ui';
import { switchLangPath, type Lang } from '../i18n/utils';

interface LanguagePickerProps {
    currentLang: string;
    pathname?: string;
}

export default function LanguagePicker({ currentLang = 'en', pathname = '/' }: LanguagePickerProps) {
    return (
        <div className="flex gap-2 text-sm font-medium notranslate" translate="no">
            {(Object.entries(languages) as [Lang, string][]).map(([lang, label]) => (
                <a
                    key={lang}
                    href={switchLangPath(pathname, currentLang as Lang, lang)}
                    hrefLang={lang}
                    lang={lang}
                    aria-label={label}
                    aria-current={currentLang === lang ? 'true' : undefined}
                    className={`px-2 py-1 rounded transition-colors ${currentLang === lang ? 'text-light-primary dark:text-neon-cyan bg-gray-100 dark:bg-navy-800' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'}`}
                >
                    {lang.toUpperCase()}
                </a>
            ))}
        </div>
    );
}
