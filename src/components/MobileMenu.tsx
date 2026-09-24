import { useState, useRef } from 'react';
import { useDialog } from './useDialog';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggle from './ThemeToggle';
import LanguagePicker from './LanguagePicker';
import NavContact from './NavContact';
import NavLink from './NavLink';
import { localizePath, type Lang } from '../i18n/utils';

interface MobileMenuProps {
    lang: string;
    pathname: string;
    trans: {
        home: string;
        about: string;
        projects: string;
        blog: string;
        recommended: string;
        contact: string;
        resume: string;
        settings: string;
        toggle: string;
        close: string;
        theme: string;
    };
}

export default function MobileMenu({ lang, pathname, trans }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const panelRef = useRef<HTMLDivElement>(null);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    const path = (p: string) => localizePath(lang as Lang, p);

    useDialog(panelRef, isOpen, closeMenu);

    return (
        <div className="md:hidden flex items-center">
            <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-lg transition-colors focus:outline-none"
                aria-label={trans.toggle}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
            >
                {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>

            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeMenu}
                                className="fixed inset-0 z-[60] bg-navy-900/60 backdrop-blur-sm"
                            />

                            {/* Menu Panel */}
                            <motion.div
                                ref={panelRef}
                                id="mobile-menu"
                                role="dialog"
                                aria-modal="true"
                                aria-label="Menu"
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'tween', duration: 0.3 }}
                                className="fixed right-0 top-0 bottom-0 z-[70] w-[80%] max-w-[320px] bg-white dark:bg-navy-900 shadow-2xl p-6 flex flex-col gap-6 overflow-y-auto"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                                        yainier<span className="text-light-primary dark:text-neon-cyan">.com</span>
                                    </span>
                                    <button onClick={closeMenu} aria-label={trans.close} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-full">
                                        <X size={24} aria-hidden="true" />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-2">
                                    <div onClick={closeMenu} className="flex flex-col gap-2">
                                        <NavLink href={path('/')} icon="home" text={trans.home} />
                                        <NavLink href={path('/about')} icon="about" text={trans.about} />
                                        <NavLink href={path('/projects')} icon="projects" text={trans.projects} />
                                        <NavLink href={path('/blog')} icon="blog" text={trans.blog} />
                                        <NavLink href={path('/recommended')} icon="recommended" text={trans.recommended} />
                                    </div>
                                    <div className="border-t border-gray-100 dark:border-white/5 my-4 pt-4 flex flex-col gap-4">
                                        <div onClick={closeMenu}>
                                            <NavContact text={trans.contact} icon="contact" />
                                        </div>
                                        <NavLink href="/resume.pdf" icon="download" text={trans.resume} isButton={true} />
                                    </div>
                                </nav>

                                <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-gray-100 dark:border-white/5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{trans.settings}</span>
                                        <div className="flex items-center gap-4">
                                            <LanguagePicker currentLang={lang} pathname={pathname} />
                                            <ThemeToggle label={trans.theme} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}
