import { motion } from "motion/react";

const skills = [
    { name: "HTML5", icon: "/icons/html5-original.svg" },
    { name: "CSS3", icon: "/icons/css3-original.svg" },
    { name: "JavaScript", icon: "/icons/javascript-original.svg" },
    { name: "TypeScript", icon: "/icons/typescript-original.svg" },
    { name: "React", icon: "/icons/react-original.svg" },
    { name: "Astro", icon: "/icons/astro.svg" },
    { name: "Tailwind", icon: "/icons/tailwindcss-original.svg" },
    { name: "Git", icon: "/icons/git-original.svg" },
    { name: "PHP", icon: "/icons/php-original.svg" },
    { name: "Laravel", icon: "/icons/laravel-original.svg" },
    { name: "Zend", icon: "/icons/zend-original.svg" },
    { name: "NestJS", icon: "/icons/nestjs-original.svg" },
    { name: "AWS", icon: "/icons/amazonwebservices-original-wordmark.svg" },
    { name: "Docker", icon: "/icons/docker-original.svg" },
    { name: "PostgreSQL", icon: "/icons/postgresql-original.svg" },
    { name: "MongoDB", icon: "/icons/mongodb-original.svg" },
    { name: "Java", icon: "/icons/java-original.svg" },
    { name: "Spring Boot", icon: "/icons/spring-original.svg" },
    { name: "Python", icon: "/icons/python-original.svg" },
    { name: "GraphQL", icon: "/icons/graphql-plain.svg" },
];

interface SkillsProps {
    titlePart1: string;
    titlePart2: string;
}

export default function Skills({ titlePart1, titlePart2 }: SkillsProps) {
    return (
        <section id="skills" className="py-20 bg-light-bg dark:bg-navy-900 relative transition-colors duration-300 border-t border-gray-300 dark:border-white/5">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 relative inline-block">
                        {titlePart1} <span className="text-light-secondary dark:text-neon-pink">{titlePart2}</span>
                        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-light-secondary dark:bg-neon-pink rounded-full"></span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-10 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (index % 10) * 0.05, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-navy-800 p-6 rounded-xl flex flex-col items-center justify-center border border-gray-200 dark:border-white/5 hover:border-light-primary/50 dark:hover:border-neon-cyan/50 shadow-sm hover:shadow-md dark:shadow-neon-cyan transition-all group"
                        >
                            <div className="w-16 h-16 mb-4 relative">
                                <img src={skill.icon} alt="" width={64} height={64} loading="lazy" decoding="async" className="w-full h-full object-contain filter group-hover:brightness-125 transition-all" />
                            </div>
                            <h3 className="text-gray-700 dark:text-gray-300 font-medium text-center group-hover:text-light-primary dark:group-hover:text-white transition-colors">{skill.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
