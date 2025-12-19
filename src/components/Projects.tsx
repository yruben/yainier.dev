import { motion } from "motion/react";

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
}

interface ProjectsProps {
    projects: Project[];
    trans: {
        title: string;
        desc: string;
        viewAll: string;
        details: string;
    }
}

export default function Projects({ projects, trans }: ProjectsProps) {
    return (
        <section id="projects" className="py-20 bg-light-bg dark:bg-navy-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{trans.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {trans.desc}
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
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
                                        <a href={`/projects`} className="text-xs font-bold text-white hover:text-light-secondary dark:hover:text-neon-cyan transition-colors">{trans.details} &rarr;</a>
                                        {project.data.liveUrl && (
                                            <a href={project.data.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 hover:text-white transition-colors">Live Demo</a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="/projects" className="inline-block px-8 py-3 border border-light-primary dark:border-neon-cyan text-light-primary dark:text-neon-cyan font-bold rounded-full hover:bg-light-primary hover:text-white dark:hover:bg-neon-cyan dark:hover:text-navy-900 transition-all shadow-md">
                        {trans.viewAll}
                    </a>
                </div>
            </div>
        </section>
    );
}
