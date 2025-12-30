import { motion } from "motion/react";

interface RecommendedItemCardProps {
    title: string;
    description: string;
    url: string;
    image?: string;
    index: number;
    lang: string;
}

export default function RecommendedItemCard({ title, description, url, image, index, lang }: RecommendedItemCardProps) {
    const visitLabel = lang === 'es' ? 'Visitar recurso' : 'Visit resource';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group bg-white dark:bg-navy-800 rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-light-primary/20 dark:hover:shadow-neon-cyan/20 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
        >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-light-primary/5 dark:bg-neon-cyan/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

            {image && (
                <div className="mb-6 aspect-video overflow-hidden rounded-xl border border-gray-100 dark:border-white/5 shadow-inner">
                    <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
            )}

            <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-light-primary dark:group-hover:text-neon-cyan transition-colors duration-300 leading-snug">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-50 dark:bg-navy-700 text-sm font-bold text-gray-900 dark:text-white group-hover:bg-light-primary dark:group-hover:bg-neon-cyan group-hover:text-white dark:group-hover:text-navy-900 transition-all duration-300 shadow-sm"
                >
                    {visitLabel}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </motion.div>
    );
}
