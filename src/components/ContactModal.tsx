import { motion, AnimatePresence } from "motion/react";
import { useStore } from "@nanostores/react";
import { useRef } from "react";
import { X } from "lucide-react";
import { isContactOpen } from "../stores/contactStore";
import { useDialog } from "./useDialog";
import ContactForm from "./ContactForm";
import type { ContactFormTrans } from "../i18n/utils";

interface ContactModalProps {
    lang: string;
    trans: ContactFormTrans;
}

export default function ContactModal({ lang, trans }: ContactModalProps) {
    const $isOpen = useStore(isContactOpen);
    const dialogRef = useRef<HTMLDivElement>(null);
    const handleClose = () => isContactOpen.set(false);

    useDialog(dialogRef, $isOpen, handleClose);

    return (
        <AnimatePresence>
            {$isOpen && (
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
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-modal-title"
                        tabIndex={-1}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative z-10 outline-none"
                    >
                        <div className="relative bg-white dark:bg-navy-900 border-b-2 border-light-primary dark:border-neon-cyan p-6">
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-full p-2 transition-colors"
                                aria-label={trans.close}
                            >
                                <X size={24} aria-hidden="true" />
                            </button>
                            <h2 id="contact-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-6 relative inline-block">
                                {trans.titlePart1} <span className="text-light-secondary dark:text-neon-pink">{trans.titlePart2}</span>
                                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-light-secondary dark:bg-neon-pink rounded-full" aria-hidden="true"></span>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{trans.desc}</p>
                        </div>

                        <div className="p-6">
                            <ContactForm
                                lang={lang}
                                trans={trans}
                                idPrefix="contact-modal"
                                onSuccess={() => setTimeout(handleClose, 2000)}
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
