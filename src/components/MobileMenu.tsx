import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggle from './ThemeToggle';
import LanguagePicker from './LanguagePicker';
import NavContact from './NavContact';
import NavLink from './NavLink';

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
    };
}

export default function MobileMenu({ lang, pathname, trans }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className="md:hidden flex items-center">
            <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-lg transition-colors focus:outline-none"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

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
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed right-0 top-0 bottom-0 z-[70] w-[80%] max-w-[320px] bg-white dark:bg-navy-900 shadow-2xl p-6 flex flex-col gap-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    yainier<span className="text-light-primary dark:text-neon-cyan">.com</span>
                                </span>
                                <button onClick={closeMenu} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-full">
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-2">
                                <div onClick={closeMenu} className="flex flex-col gap-2">
                                    <NavLink href={`/${lang === 'en' ? 'home' : lang}`} icon="home" text={trans.home} />
                                    <NavLink href={`/${lang === 'en' ? 'about' : `${lang}/about`}`} icon="about" text={trans.about} />
                                    <NavLink href={`/${lang === 'en' ? 'projects' : `${lang}/projects`}`} icon="projects" text={trans.projects} />
                                    <NavLink href={`/${lang === 'en' ? 'blog' : `${lang}/blog`}`} icon="blog" text={trans.blog} />
                                    <NavLink href={`/${lang === 'en' ? 'recommended' : `${lang}/recommended`}`} icon="recommended" text={trans.recommended} />
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
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Settings</span>
                                    <div className="flex items-center gap-4">
                                        <LanguagePicker currentLang={lang} pathname={pathname} />
                                        <ThemeToggle />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
