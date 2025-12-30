import { motion } from "motion/react";

interface CategoryCardProps {
    title: string;
    description: string;
    image: string;
    count: number;
    href: string;
    lang: string;
}

export default function CategoryCard({ title, description, image, count, href, lang }: CategoryCardProps) {
    const countLabel = lang === 'es'
        ? `${count} ${count === 1 ? 'elemento' : 'elementos'}`
        : `${count} ${count === 1 ? 'item' : 'items'}`;

    const exploreLabel = lang === 'es' ? 'Explorar categoría' : 'Explore category';

    return (
        <motion.a
            href={href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative block bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/10 hover:shadow-2xl hover:shadow-light-primary/20 dark:hover:shadow-neon-cyan/20 transition-all duration-500"
        >
            <div className="aspect-[16/10] overflow-hidden relative">
                <img
                    src={image || "https://via.placeholder.com/800x500"}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Count Badge Overlay */}
                <div className="absolute bottom-4 left-4 z-10">
                    <span className="px-3 py-1 bg-light-primary/80 dark:bg-neon-cyan/20 text-white dark:text-neon-cyan text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md border border-white/10">
                        {countLabel}
                    </span>
                </div>
            </div>

            <div className="p-6 relative">
                <div className="absolute -top-8 right-6 w-12 h-12 bg-white dark:bg-navy-700 rounded-xl shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 border border-gray-100 dark:border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-primary dark:text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-light-primary dark:group-hover:text-neon-cyan transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <div className="mt-6 flex items-center text-light-primary dark:text-neon-cyan font-bold text-xs uppercase tracking-widest pt-4 border-t border-gray-100 dark:border-white/5">
                    {exploreLabel}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-light-primary to-light-secondary dark:from-neon-cyan dark:to-neon-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </motion.a>
    );
}
