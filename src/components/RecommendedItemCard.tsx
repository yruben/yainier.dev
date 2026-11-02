import { useState } from "react";
import { motion } from "motion/react";

interface RecommendedItemCardProps {
    title: string;
    description: string;
    url: string;
    image?: string;
    index: number;
    visitLabel: string;
    playLabel?: string;
    watchLabel?: string;
}

// Extracts the video ID from youtube.com/watch, youtu.be, /embed and /shorts URLs
function getYouTubeId(url: string): string | null {
    try {
        const { hostname, pathname, searchParams } = new URL(url);
        const host = hostname.replace(/^(www\.|m\.)/, '');
        let id: string | null = null;
        if (host === 'youtu.be') id = pathname.slice(1);
        else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
            id = pathname === '/watch' ? searchParams.get('v') : pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] ?? null;
        }
        return id && /^[\w-]{11}$/.test(id) ? id : null;
    } catch {
        return null;
    }
}

export default function RecommendedItemCard({ title, description, url, image, index, visitLabel, playLabel = 'Play video', watchLabel = 'Watch on YouTube' }: RecommendedItemCardProps) {
    const videoId = getYouTubeId(url);
    const [playing, setPlaying] = useState(false);

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

            {videoId ? (
                <div className="mb-6 aspect-video overflow-hidden rounded-xl border border-gray-100 dark:border-white/5 shadow-inner relative z-10 bg-black">
                    {playing ? (
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => setPlaying(true)}
                            aria-label={`${playLabel}: ${title}`}
                            className="group/play relative w-full h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-light-primary dark:focus-visible:ring-neon-cyan"
                        >
                            <img
                                src={image ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                                alt=""
                                decoding="async"
                                loading="lazy"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute inset-0 bg-black/20 group-hover/play:bg-black/40 transition-colors duration-300" aria-hidden="true"></span>
                            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-light-primary dark:bg-neon-cyan text-white dark:text-navy-900 shadow-lg transform group-hover/play:scale-110 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 ml-1">
                                        <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.93-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
                                    </svg>
                                </span>
                            </span>
                        </button>
                    )}
                </div>
            ) : image && (
                <div className="mb-6 aspect-video overflow-hidden rounded-xl border border-gray-100 dark:border-white/5 shadow-inner">
                    <img src={image} alt="" decoding="async" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy" />
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
                    {videoId ? watchLabel : visitLabel}
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </motion.div>
    );
}
