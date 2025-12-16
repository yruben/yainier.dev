import { motion } from "motion/react";

interface Project {
    data: {
        title: string;
        description: string;
        tags: string[];
        githubUrl?: string;
        liveUrl?: string;
    };
    slug: string;
}

interface Props {
    projects: Project[];
}

export default function Projects({ projects }: Props) {
    return (
        <section id="projects" className="py-20 bg-navy-900">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Projects</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Here are some of my recent works.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="bg-navy-800 rounded-xl overflow-hidden border border-white/5 hover:border-neon-cyan/30 shadow-lg group"
                        >
                            <div className="h-48 bg-navy-700 relative overflow-hidden">
                                {/* Placeholder Thumbnail - User to replace */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent opacity-60 z-10"></div>
                                <img src={`https://via.placeholder.com/600x400?text=${project.data.title}`} alt={project.data.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">{project.data.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.data.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.data.tags.map((tag, i) => (
                                        <span key={i} className="text-xs font-medium px-2 py-1 bg-navy-900 text-neon-cyan rounded-md border border-neon-cyan/20">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center">
                                    <a href={`/projects`} className="text-sm font-bold text-white hover:text-neon-pink transition-colors">Details &rarr;</a>
                                    {project.data.liveUrl && (
                                        <a href={project.data.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">Live Demo</a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="/projects" className="inline-block px-8 py-3 border border-neon-cyan text-neon-cyan font-bold rounded-full hover:bg-neon-cyan hover:text-navy-900 transition-all shadow-neon-cyan">
                        View All Projects
                    </a>
                </div>
            </div>
        </section>
    );
}
