import { motion } from "motion/react"
import Typewriter from 'typewriter-effect';
import { siteConfig } from "../config";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-navy-900 overflow-hidden pt-16">
            {/* Background Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-[100px] animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-pink/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
                {/* Left Content: Image/Profile (Based on screenshot analysis it was left, but standard hero is usually Text Left, Image Right. The user said 'analyze image'. In the screenshot provided earlier, the person was on the LEFT and text on the RIGHT. It had a big blue blob behind.) */}
                <motion.div
                    className="w-full md:w-1/2 flex justify-center relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
                        {/* Blob Shape behind image */}
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full text-neon-cyan/30 fill-current animate-blob">
                            <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.2C59,42.9,47.1,51.4,34.9,59.3C22.7,67.2,10.2,74.5,-2.1,78.2C-14.4,81.9,-26.6,82,-38.3,77.2C-50,72.4,-61.2,62.7,-69.9,51.1C-78.6,39.5,-84.8,26,-87.3,11.5C-89.8,-3,-88.6,-18.5,-81.1,-31.6C-73.6,-44.7,-59.8,-55.4,-45.6,-62.6C-31.4,-69.8,-16.8,-73.5,-0.9,-71.9L15,-70.3Z" transform="translate(100 100)" />
                        </svg>
                        <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-neon-cyan shadow-neon-cyan">
                            {/* Placeholder Image - User will replace */}
                            <img src="https://via.placeholder.com/500x500" alt="Profile" className="w-full h-full object-cover" />
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
                        <h2 className="text-xl md:text-2xl font-bold text-neon-cyan mb-2">Hello, I'm</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Chandni Chauhan
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2">
                            <span>{siteConfig.hero.subtitlePrefix}</span>
                            <span className="text-neon-cyan inline-block text-left min-w-[280px]">
                                <Typewriter
                                    options={{
                                        strings: siteConfig.hero.typewriterWords,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </span>
                        </h3>
                    </motion.div>

                    <motion.p
                        className="text-gray-400 mb-8 max-w-lg mx-auto md:mx-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eveniet lecto tempore possimus voluptates quis necessitatibus.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                        <a href="#contact" className="px-8 py-3 bg-neon-cyan text-navy-900 font-bold rounded-full hover:bg-cyan-400 transition-colors shadow-neon-cyan">
                            Hire Me
                        </a>
                        <a href="#portfolio" className="px-8 py-3 border border-neon-cyan text-neon-cyan font-bold rounded-full hover:bg-neon-cyan/10 transition-colors">
                            Contact Me
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
