import { motion } from "motion/react";
import type { CollectionEntry } from 'astro:content';

interface BlogCardProps {
    post: CollectionEntry<'blog'>;
    index?: number;
}

// Function to calculate reading time based on word count
function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
    const readingTime = calculateReadingTime(post.body);
    const formattedDate = post.data.pubDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white dark:bg-navy-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-white/10 hover:shadow-xl hover:shadow-light-primary/20 dark:hover:shadow-neon-cyan/20 transition-all group h-[280px] relative"
        >
            {/* Image Section - Always visible */}
            <div className="absolute inset-0">
                {post.data.image ? (
                    <img
                        src={post.data.image}
                        alt={post.data.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-light-primary/30 to-light-primary/10 dark:from-neon-cyan/30 dark:to-neon-cyan/10"></div>
                )}
            </div>

            {/* Overlay - Appears on hover with smooth gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Content - Hidden by default, shows on hover */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
                    <a href={`/blog/${post.slug}`}>
                        {post.data.title}
                    </a>
                </h3>

                {/* Date and Reading Time */}
                <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
                    <time dateTime={post.data.pubDate.toISOString()}>
                        {formattedDate}
                    </time>
                    <span>·</span>
                    <span>{readingTime} min read</span>
                </div>

                {/* Description */}
                <p className="text-gray-200 mb-2 line-clamp-2 text-xs">
                    {post.data.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.data.tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Author Section */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/20">
                    <img
                        src={post.data.authorImage}
                        alt={post.data.author}
                        className="w-5 h-5 rounded-full object-cover"
                    />
                    <p className="text-xs font-medium text-white">
                        {post.data.author}
                    </p>
                </div>
            </div>
        </motion.article>
    );
}
