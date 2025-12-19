import { motion } from "motion/react"
import Typewriter from 'typewriter-effect';
import { Github, Linkedin, Youtube, Twitter } from 'lucide-react';
import { siteConfig } from "../config";
import NetworkAnimation from './NetworkAnimation';

interface HeroProps {
    trans: {
        hello: string;
        subtitlePrefix: string;
        hire: string;
        contact: string;
        description?: string;
    };
    titles?: string[]; // Optional override, defaults to config if empty
}

export default function Hero({ trans, titles }: HeroProps) {
    const typewriterStrings = titles && titles.length > 0 ? titles : siteConfig.hero.typewriterWords;

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-light-bg dark:bg-navy-900 overflow-hidden pt-16 transition-colors duration-300">
            {/* Network Animation Background */}
            <NetworkAnimation />

            {/* Background Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-light-primary/20 dark:bg-neon-cyan/20 rounded-full blur-[100px] animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-light-secondary/20 dark:bg-neon-pink/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
                {/* Left Content: Image/Profile */}
                <motion.div
                    className="w-full md:w-1/2 flex justify-center relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
                        {/* Blob Shape behind image */}
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full text-light-primary/30 dark:text-neon-cyan/30 fill-current animate-blob">
                            <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.2C59,42.9,47.1,51.4,34.9,59.3C22.7,67.2,10.2,74.5,-2.1,78.2C-14.4,81.9,-26.6,82,-38.3,77.2C-50,72.4,-61.2,62.7,-69.9,51.1C-78.6,39.5,-84.8,26,-87.3,11.5C-89.8,-3,-88.6,-18.5,-81.1,-31.6C-73.6,-44.7,-59.8,-55.4,-45.6,-62.6C-31.4,-69.8,-16.8,-73.5,-0.9,-71.9L15,-70.3Z" transform="translate(100 100)" />
                        </svg>
                        <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-light-primary dark:border-neon-cyan shadow-lg dark:shadow-neon-cyan">
                            {/* Profile Image */}
                            <img src="/profile_new.png" alt="Profile" className="w-full h-full object-cover object-center-top" style={{ objectPosition: '50% 25%' }} />
                        </div>
                    </div>
                </motion.div>

                {/* Right Content: Text */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-light-primary dark:text-neon-cyan mb-2">{trans.hello}</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            {siteConfig.hero.title}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2">
                            <span>{trans.subtitlePrefix}</span>
                            <span className="text-light-primary dark:text-neon-cyan inline-block text-left min-w-[280px]">
                                <Typewriter
                                    options={{
                                        strings: typewriterStrings,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </span>
                        </h3>
                    </motion.div>

                    <motion.p
                        className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto md:mx-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        {trans.description}
                    </motion.p>

                    {/* Social Links */}
                    <motion.div
                        className="flex gap-4 justify-center md:justify-start mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    >
                        <a href="https://github.com/yruben" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-navy-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-neon-cyan hover:bg-white dark:hover:bg-navy-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com/in/yruben" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-navy-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-neon-cyan hover:bg-white dark:hover:bg-navy-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://youtube.com/@yruben" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-navy-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 hover:bg-white dark:hover:bg-navy-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                            <Youtube size={20} />
                        </a>
                        <a href="https://twitter.com/yruben" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-navy-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-navy-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                            <Twitter size={20} />
                        </a>
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                        <a href="#contact" className="px-8 py-3 bg-light-primary dark:bg-neon-cyan text-white dark:text-navy-900 font-bold rounded-full hover:opacity-90 transition-all shadow-md dark:shadow-neon-cyan">
                            {trans.hire}
                        </a>
                        <a href="#portfolio" className="px-8 py-3 border border-light-primary dark:border-neon-cyan text-light-primary dark:text-neon-cyan font-bold rounded-full hover:bg-light-primary/10 dark:hover:bg-neon-cyan/10 transition-colors">
                            {trans.contact}
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
