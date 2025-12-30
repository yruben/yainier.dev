import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';

interface Project {
    data: {
        title: string;
        description: string;
        tags: string[];
        githubUrl?: string;
        liveUrl?: string;
        image?: string;
    };
    slug: string;
    body: string;
}

interface ProjectsProps {
    projects: Project[];
    trans: {
        titlePart1: string;
        titlePart2: string;
        desc: string;
        viewAll: string;
        details: string;
    };
    enableInfiniteScroll?: boolean;
}

export default function Projects({ projects, trans, enableInfiniteScroll = false }: ProjectsProps) {
    const [visibleCount, setVisibleCount] = useState(enableInfiniteScroll ? 6 : projects.length);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const visibleProjects = projects.slice(0, visibleCount);

    useEffect(() => {
        if (!enableInfiniteScroll) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + 3, projects.length));
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [enableInfiniteScroll, projects.length]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject]);


    const accentTextColor = "text-light-secondary dark:text-neon-pink";

    const underlineColor = "bg-light-secondary dark:bg-neon-pink";

    return (
        <section id="projects" className="py-20 bg-light-bg dark:bg-navy-900 transition-colors duration-300 border-t border-gray-300 dark:border-white/5">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 relative inline-block">
                        {trans.titlePart1} <span className={accentTextColor}>{trans.titlePart2}</span>
                        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-light-secondary dark:bg-neon-pink rounded-full"></span>
                    </h2>
                    {!enableInfiniteScroll && (
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
                            {trans.desc}
                        </p>
                    )}
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
                    {visibleProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-navy-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/10 hover:shadow-xl hover:shadow-light-primary/20 dark:hover:shadow-neon-cyan/20 transition-all group h-[300px] relative w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
                        >
                            {/* Image Section - Always visible, covers full background */}
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent dark:from-navy-900/90 dark:to-transparent z-10"></div>
                                <img
                                    src={project.data.image || `https://via.placeholder.com/600x400?text=${project.data.title}`}
                                    alt={project.data.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>

                            {/* Title - Always visible at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
                                <h3 className="text-lg font-bold text-white mb-1">{project.data.title}</h3>
                            </div>

                            {/* Overlay - Appears on hover with smooth gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

                            {/* Content - Slides up on hover */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-40">
                                <div className="bg-gradient-to-t from-black/95 via-black/90 to-transparent pt-6 -mt-6">
                                    <h3 className="text-lg font-bold text-white mb-2">{project.data.title}</h3>
                                    <p className="text-gray-200 text-xs mb-3 line-clamp-2">{project.data.description}</p>

                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {project.data.tags.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="text-xs font-medium px-2 py-0.5 bg-white/20 text-white rounded-md backdrop-blur-sm border border-white/20">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center pt-2 border-t border-white/20">
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="text-xs font-bold text-white hover:text-light-secondary dark:hover:text-neon-cyan transition-colors cursor-pointer"
                                        >
                                            {trans.details} &rarr;
                                        </button>
                                        {project.data.liveUrl && (
                                            <a href={project.data.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 hover:text-white transition-colors">Live Demo</a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {/* Infinite Scroll Loader Target */}
                    {enableInfiniteScroll && visibleCount < projects.length && (
                        <div ref={loadMoreRef} className="h-20 flex justify-center items-center mt-8">
                            <div className="w-8 h-8 border-4 border-light-primary dark:border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

                {!enableInfiniteScroll && (
                    <div className="text-center mt-12">
                        <a href="/projects" className="inline-block px-8 py-3 border border-light-primary dark:border-neon-cyan text-light-primary dark:text-neon-cyan font-bold rounded-full hover:bg-light-primary hover:text-white dark:hover:bg-neon-cyan dark:hover:text-navy-900 transition-all shadow-md">
                            {trans.viewAll}
                        </a>
                    </div>
                )}

                {/* Project Details Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProject(null)}
                                className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col"
                            >
                                {/* Modal Header / Image */}
                                <div className="relative h-48 md:h-64 shrink-0">
                                    <img
                                        src={selectedProject.data.image || `https://via.placeholder.com/800x400?text=${selectedProject.data.title}`}
                                        alt={selectedProject.data.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-4 right-4 text-white hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors cursor-pointer z-50"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <div className="absolute bottom-4 left-6 right-6">
                                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{selectedProject.data.title}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.data.tags.map((tag, i) => (
                                                <span key={i} className="text-xs font-medium px-2.5 py-1 bg-light-primary/80 dark:bg-neon-cyan/20 text-white dark:text-neon-cyan rounded-full border border-white/10">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Content - Scrollable */}
                                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                                    <div className="prose dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-light-primary dark:prose-a:text-neon-cyan hover:prose-a:text-light-secondary dark:hover:prose-a:text-neon-pink">
                                        <ReactMarkdown>
                                            {selectedProject.body}
                                        </ReactMarkdown>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex gap-4">
                                        {selectedProject.data.githubUrl && (
                                            <a
                                                href={selectedProject.data.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-navy-900 font-bold hover:opacity-90 transition-opacity"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                                GitHub
                                            </a>
                                        )}
                                        {selectedProject.data.liveUrl && (
                                            <a
                                                href={selectedProject.data.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-light-primary dark:bg-neon-cyan text-white dark:text-navy-900 font-bold hover:bg-light-secondary dark:hover:bg-neon-cyan/80 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
