import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import type { ContactFormTrans } from "../i18n/utils";

interface ContactFormProps {
    lang: string;
    trans: ContactFormTrans;
    /** Keeps field ids unique when the modal and the /contact page form coexist. */
    idPrefix: string;
    onSuccess?: () => void;
}

const inputClass = "w-full px-4 py-2 border border-gray-300 dark:border-white/10 bg-white dark:bg-navy-900 dark:text-white rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-neon-cyan focus:border-transparent outline-none transition-colors";

export default function ContactForm({ lang, trans, idPrefix, onSuccess }: ContactFormProps) {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        // Bots fill the hidden honeypot field: pretend it worked and send nothing
        if (formData.get('_honey')) {
            setStatus('success');
            return;
        }

        setStatus('sending');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', { method: 'POST', body: formData });
            if (response.ok) {
                setStatus('success');
                form.reset();
                onSuccess?.();
            } else {
                setErrorMessage(trans.error);
                setStatus('error');
            }
        } catch {
            setErrorMessage(trans.networkError);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
                role="status"
            >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{trans.success}</p>
            </motion.div>
        );
    }

    return (
        <form method="post" action="/api/contact" onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field - hidden from users */}
            <div className="hidden" aria-hidden="true">
                <label htmlFor={`${idPrefix}-honey`}>{trans.honeypot}</label>
                <input type="text" name="_honey" id={`${idPrefix}-honey`} tabIndex={-1} autoComplete="off" />
            </div>

            <input type="hidden" name="lang" value={lang} />

            <div>
                <label htmlFor={`${idPrefix}-name`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {trans.name}
                </label>
                <input
                    type="text"
                    name="name"
                    id={`${idPrefix}-name`}
                    required
                    autoComplete="name"
                    placeholder={trans.namePlaceholder}
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor={`${idPrefix}-email`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {trans.email}
                </label>
                <input
                    type="email"
                    name="email"
                    id={`${idPrefix}-email`}
                    required
                    autoComplete="email"
                    placeholder={trans.emailPlaceholder}
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor={`${idPrefix}-message`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {trans.message}
                </label>
                <textarea
                    name="message"
                    id={`${idPrefix}-message`}
                    rows={5}
                    required
                    placeholder={trans.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                ></textarea>
            </div>

            {status === 'error' && (
                <div role="alert" className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-400">{errorMessage || trans.error}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-light-primary dark:bg-neon-cyan text-white dark:text-navy-900 font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:focus:ring-neon-cyan"
            >
                {status === 'sending' ? trans.sending : trans.send}
            </button>
        </form>
    );
}
