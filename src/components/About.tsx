import { motion } from "motion/react";

export default function About() {
    return (
        <section id="about" className="py-20 bg-navy-800 overflow-hidden">
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
                        <div className="absolute top-10 left-10 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 z-10">
                            <img src="https://via.placeholder.com/600x800" alt="Working" className="w-full h-full object-cover" />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-10 w-20 h-20 bg-neon-cyan/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="absolute bottom-10 left-0 w-32 h-32 bg-neon-pink/20 rounded-full blur-xl animate-pulse"></div>

                        {/* Floating Badge */}
                        <div className="absolute bottom-20 right-0 bg-navy-900 p-4 rounded-xl shadow-neon-cyan border border-neon-cyan/30 z-20 flex items-center gap-3">
                            <div className="text-3xl font-bold text-neon-cyan">5+</div>
                            <div className="text-xs text-gray-300 uppercase leading-tight">Years<br />Experience</div>
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
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block">
                            About <span className="text-neon-pink">Me</span>
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-neon-pink rounded-full"></span>
                        </h2>

                        <p className="text-gray-300 leading-relaxed mb-6">
                            I'm a passionate Full Stack Developer with over 5 years of experience specializing in building digital applications. I love creating seamless user experiences and writing clean, maintainable code.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-8">
                            My journey began when I discovered my love for problem-solving through code. Since then, I've worked on various projects ranging from small business websites to large-scale enterprise applications.
                        </p>

                        <a href="#contact" className="inline-block px-8 py-3 bg-neon-pink text-white font-bold rounded-lg hover:bg-pink-600 transition-colors shadow-neon-pink">
                            Let's Talk
                        </a>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
