import { motion } from "motion/react";

const stats = [
    { num: "10+", label: "Years of Experience" },
    { num: "30+", label: "Projects Completed" },
    { num: "5+", label: "Technologies Mastered" },
    { num: "100+", label: "Satisfied Clients" },
];

export default function Stats() {
    return (
        <section className="bg-navy-800 py-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center"
                        >
                            <h3 className="text-4xl font-bold mb-2">{stat.num}</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
