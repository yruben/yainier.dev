import { motion, AnimatePresence } from "motion/react";
import { useStore } from "@nanostores/react";
import { isContactOpen } from "../stores/contactStore";
import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

interface ContactModalProps {
    trans: {
        titlePart1: string;
        titlePart2: string;
        desc: string;
        name: string;
        email: string;
        message: string;
        namePlaceholder: string;
        emailPlaceholder: string;
        messagePlaceholder: string;
        send: string;
        success: string;
        error: string;
    };
}

export default function ContactModal({ trans }: ContactModalProps) {
    const $isOpen = useStore(isContactOpen);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Detect language from URL
    const lang = typeof window !== 'undefined'
        ? (window.location.pathname.startsWith('/es') ? 'es' : 'en')
        : 'en';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Check honeypot
        if (formData.get('_honey')) {
            console.log('Spam detected');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setStatus('success');
                form.reset();

                // Close modal after 2 seconds
                setTimeout(() => {
                    isContactOpen.set(false);
                    setStatus('idle');
                }, 2000);
            } else {
                const data = await response.json().catch(() => ({ message: 'Error sending message' }));
                setErrorMessage(data.message || 'Error sending message');
                setStatus('error');
            }
        } catch (error) {
            setErrorMessage('Network error. Please try again.');
            setStatus('error');
        }
    };

    const handleClose = () => {
        isContactOpen.set(false);
        setStatus('idle');
        setErrorMessage('');
    };

    if (!$isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
                >
                    {/* Header */}
                    <div className="relative bg-white dark:bg-navy-900 border-b-2 border-light-primary dark:border-neon-cyan p-6">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-full p-2 transition-colors"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {trans.titlePart1} <span className="text-light-secondary dark:text-neon-pink">{trans.titlePart2}</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{trans.desc}</p>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-8"
                            >
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{trans.success}</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Honeypot field - hidden from users */}
                                <input
                                    type="text"
                                    name="_honey"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    style={{ display: 'none' }}
                                />

                                {/* Language field - hidden */}
                                <input
                                    type="hidden"
                                    name="lang"
                                    value={lang}
                                />

                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {trans.name}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        placeholder={trans.namePlaceholder}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-navy-900 dark:text-white rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-neon-cyan focus:border-transparent outline-none transition-colors"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {trans.email}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        placeholder={trans.emailPlaceholder}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-navy-900 dark:text-white rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-neon-cyan focus:border-transparent outline-none transition-colors"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {trans.message}
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={5}
                                        required
                                        placeholder={trans.messagePlaceholder}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-navy-900 dark:text-white rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-neon-cyan focus:border-transparent outline-none transition-colors resize-none"
                                    ></textarea>
                                </div>

                                {/* Error Message */}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                                    >
                                        <p className="text-sm text-red-600 dark:text-red-400">{errorMessage || trans.error}</p>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full bg-light-primary dark:bg-neon-cyan text-white dark:text-navy-900 font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:focus:ring-neon-cyan"
                                >
                                    {status === 'sending' ? 'Enviando...' : trans.send}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
