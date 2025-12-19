import { motion } from "motion/react";

interface AboutProps {
    trans: {
        titlePart1: string;
        titlePart2: string;
        p1: string;
        p2: string;
        cta: string;
    };
    lang?: string;
}

export default function About({ trans, lang = 'en' }: AboutProps) {
    const aboutLink = lang === 'en' ? '/about' : `/${lang}/about`;

    return (
        <section id="about" className="py-20 bg-gray-50 dark:bg-navy-800 overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Left: Image Collage */}
                    <motion.div
                        className="w-full md:w-1/2 relative min-h-[400px]"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Main Image */}
                        <div className="absolute top-10 left-10 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 z-10">
                            <img src="/about_me_new.png" alt="Working" className="w-full h-full object-cover" />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-10 w-20 h-20 bg-light-primary/20 dark:bg-neon-cyan/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="absolute bottom-10 left-0 w-32 h-32 bg-light-secondary/20 dark:bg-neon-pink/20 rounded-full blur-xl animate-pulse"></div>

                        {/* Floating Badge */}
                        <div className="absolute bottom-20 right-0 bg-white dark:bg-navy-900 p-4 rounded-xl shadow-lg dark:shadow-neon-cyan border border-gray-100 dark:border-neon-cyan/30 z-20 flex items-center gap-3">
                            <div className="text-3xl font-bold text-light-primary dark:text-neon-cyan">10+</div>
                            <div className="text-xs text-gray-600 dark:text-gray-300 uppercase leading-tight">Years<br />Experience</div>
                        </div>
                    </motion.div>

                    {/* Right: Text Content */}
                    <motion.div
                        className="w-full md:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 relative inline-block">
                            {trans.titlePart1} <span className="text-light-secondary dark:text-neon-pink">{trans.titlePart2}</span>
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-light-secondary dark:bg-neon-pink rounded-full"></span>
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            {trans.p1}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            {trans.p2}
                        </p>

                        <a href={aboutLink} className="inline-block px-8 py-3 bg-light-secondary dark:bg-neon-pink text-white font-bold rounded-lg hover:bg-pink-600 transition-colors shadow-md dark:shadow-neon-pink">
                            {trans.cta}
                        </a>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
