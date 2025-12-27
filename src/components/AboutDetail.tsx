import { motion } from "motion/react";
import Timeline from "./Timeline";

interface AboutDetailProps {
    abstract: string;
    trans: {
        pageTitle: string;
        pageSubtitle: string;
        professionalSummary: string;
    };
    lang?: string;
    timelineItems?: any[];
}

const Keyword = ({ children }: { children: string }) => (
    <span className="text-light-primary dark:text-neon-cyan font-semibold">{children}</span>
);

export default function AboutDetail({ abstract, trans, lang = 'en', timelineItems = [] }: AboutDetailProps) {
    // Function to highlight keywords in the abstract
    const highlightKeywords = (text: string) => {
        const keywords = [
            // English keywords
            'Senior Software Engineer',
            '10+ years',
            'HTML5',
            'CSS3',
            'JavaScript',
            'ExpressJS',
            'NestJS',
            'NextJS',
            'React Native',
            'RESTful',
            'GraphQL APIs',
            'MySQL',
            'PostgreSQL',
            'MariaDB',
            'MongoDB',
            'SOLID principles',
            'OOP',
            'component-based development',
            'leading engineering teams',
            'high code quality',
            'performance',
            'cross-functional teams',
            // Spanish keywords
            'Ingeniero de Software Senior',
            '10+ años',
            'APIs RESTful',
            'GraphQL',
            'principios SOLID',
            'POO',
            'desarrollo basado en componentes',
            'liderando equipos de ingeniería',
            'alta calidad de código',
            'rendimiento',
            'equipos multifuncionales'
        ];

        let highlightedText = text;

        // Sort keywords by length (longest first) to avoid partial matches
        const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);

        sortedKeywords.forEach((keyword) => {
            const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            highlightedText = highlightedText.replace(regex, `<mark>$1</mark>`);
        });

        return highlightedText;
    };

    const renderAbstract = (text: string) => {
        const highlighted = highlightKeywords(text);
        const parts = highlighted.split('<mark>');

        return parts.map((part, index) => {
            if (index === 0) return <span key={index}>{part}</span>;

            const [keyword, ...rest] = part.split('</mark>');
            return (
                <span key={index}>
                    <Keyword>{keyword}</Keyword>
                    {rest.join('</mark>')}
                </span>
            );
        });
    };

    // Split abstract into two paragraphs
    const sentences = abstract.split('. ');
    const midPoint = Math.ceil(sentences.length / 2);
    const firstParagraph = sentences.slice(0, midPoint).join('. ') + (sentences.length > midPoint ? '.' : '');
    const secondParagraph = sentences.slice(midPoint).join('. ');

    return (
        <section className="py-20 bg-light-bg dark:bg-navy-900 transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {trans.pageTitle} <span className="text-light-secondary dark:text-neon-pink">{trans.pageSubtitle}</span>
                    </h1>
                    <div className="w-20 h-1 bg-light-secondary dark:bg-neon-pink rounded-full"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-navy-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-white/10 mb-20"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        {trans.professionalSummary}
                    </h2>

                    <div className="relative text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        {/* Image - Floated Right */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="lg:float-right lg:ml-8 lg:mb-2 lg:w-80 w-full mb-8"
                        >
                            <div className="relative">
                                <img
                                    src="/about_me.png"
                                    alt="About Me"
                                    className="rounded-2xl shadow-2xl border-4 border-white dark:border-white/10 w-full object-cover"
                                />
                                {/* Decorative glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-light-primary/20 to-light-secondary/20 dark:from-neon-cyan/20 dark:to-neon-pink/20 rounded-2xl blur-lg -z-10"></div>
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="space-y-6">
                            <p>
                                {renderAbstract(firstParagraph)}
                            </p>
                            <p>
                                {renderAbstract(secondParagraph)}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Timeline Section */}
                <div className="mt-20">
                    <Timeline items={timelineItems} title="Timeline" />
                </div>
            </div>
        </section>
    );
}
