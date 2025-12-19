import { motion } from "motion/react";

interface AboutDetailProps {
    abstract: string;
    trans: {
        pageTitle: string;
        pageSubtitle: string;
        professionalSummary: string;
    };
}

const Keyword = ({ children }: { children: string }) => (
    <span className="text-light-primary dark:text-neon-cyan font-semibold">{children}</span>
);

export default function AboutDetail({ abstract, trans }: AboutDetailProps) {
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

    const renderAbstract = () => {
        const highlighted = highlightKeywords(abstract);
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

    return (
        <section className="py-20 bg-light-bg dark:bg-navy-900 transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-5xl">
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
                    className="bg-white dark:bg-navy-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-white/10"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        {trans.professionalSummary}
                    </h2>

                    <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-4">
                        {renderAbstract()}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
