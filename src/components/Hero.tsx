import { motion } from "motion/react"
import Typewriter from 'typewriter-effect';
import { Github, Linkedin, Youtube, Twitter } from 'lucide-react';
import { siteConfig, type SocialName } from "../config";
import { isContactOpen } from "../stores/contactStore";
import NetworkAnimation from './NetworkAnimation';

const socialIcons: Record<SocialName, { Icon: typeof Github; hover: string }> = {
    GitHub: { Icon: Github, hover: 'hover:text-light-primary dark:hover:text-neon-cyan' },
    LinkedIn: { Icon: Linkedin, hover: 'hover:text-light-primary dark:hover:text-neon-cyan' },
    YouTube: { Icon: Youtube, hover: 'hover:text-red-600 dark:hover:text-red-500' },
    Twitter: { Icon: Twitter, hover: 'hover:text-sky-600 dark:hover:text-sky-400' },
};

interface HeroProps {
    trans: {
        hello: string;
        subtitlePrefix: string;
        hire: string;
        contact: string;
        description?: string;
        profileAlt: string;
    };
    titles: string[];
    hireHref: string;
}

export default function Hero({ trans, titles, hireHref }: HeroProps) {

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-light-bg dark:bg-navy-900 overflow-hidden pt-16 transition-colors duration-300">
            {/* Network Animation Background */}
            <NetworkAnimation />

            {/* Background Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-light-primary/20 dark:bg-neon-cyan/20 rounded-full blur-[100px] animate-blob" aria-hidden="true"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-light-secondary/20 dark:bg-neon-pink/20 rounded-full blur-[100px] animate-blob animation-delay-2000" aria-hidden="true"></div>

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
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full text-light-primary/30 dark:text-neon-cyan/30 fill-current animate-blob" aria-hidden="true">
                            <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.2C59,42.9,47.1,51.4,34.9,59.3C22.7,67.2,10.2,74.5,-2.1,78.2C-14.4,81.9,-26.6,82,-38.3,77.2C-50,72.4,-61.2,62.7,-69.9,51.1C-78.6,39.5,-84.8,26,-87.3,11.5C-89.8,-3,-88.6,-18.5,-81.1,-31.6C-73.6,-44.7,-59.8,-55.4,-45.6,-62.6C-31.4,-69.8,-16.8,-73.5,-0.9,-71.9L15,-70.3Z" transform="translate(100 100)" />
                        </svg>
                        <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-light-primary dark:border-neon-cyan shadow-lg dark:shadow-neon-cyan">
                            {/* Profile Image */}
                            <img
                                src="/profile_new.webp"
                                alt={trans.profileAlt}
                                width={900}
                                height={900}
                                fetchPriority="high"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: '50% 25%' }}
                            />
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
                        <p className="text-xl md:text-2xl font-bold text-light-primary dark:text-neon-cyan mb-2">{trans.hello}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            {siteConfig.name}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2">
                            <span>{trans.subtitlePrefix}</span>
                            <span className="text-light-primary dark:text-neon-cyan inline-block text-left min-w-[280px]">
                                <Typewriter
                                    options={{
                                        strings: titles,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </span>
                        </div>
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
                        {siteConfig.socials.map(({ name, url }) => {
                            const { Icon, hover } = socialIcons[name];
                            return (
                                <a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={name}
                                    className={`p-2 bg-gray-100 dark:bg-navy-800 rounded-full text-gray-700 dark:text-gray-300 ${hover} hover:bg-white dark:hover:bg-navy-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-1`}
                                >
                                    <Icon size={20} aria-hidden="true" />
                                </a>
                            );
                        })}
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                        <a
                            href={hireHref}
                            className="px-8 py-3 bg-light-primary dark:bg-neon-cyan text-white dark:text-navy-900 font-bold rounded-full hover:opacity-90 transition-all shadow-md dark:shadow-neon-cyan text-center"
                        >
                            {trans.hire}
                        </a>

                        {/* Contact - Opens general modal */}
                        <button
                            onClick={() => isContactOpen.set(true)}
                            className="px-8 py-3 border border-light-primary dark:border-neon-cyan text-light-primary dark:text-neon-cyan font-bold rounded-full hover:bg-light-primary/10 dark:hover:bg-neon-cyan/10 transition-colors"
                        >
                            {trans.contact}
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
