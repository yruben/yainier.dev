import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef } from "react";

interface StatsProps {
    trans: {
        years: string;
        projects: string;
        tech: string;
        clients: string;
    };
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!nodeRef.current || !isInView) return;

        const node = nodeRef.current;
        const controls = animate(0, to, {
            duration: 2,
            onUpdate(value) {
                node.textContent = Math.round(value) + suffix;
            },
        });

        return () => controls.stop();
    }, [to, suffix, isInView]);

    return <span ref={nodeRef} className="text-4xl font-bold mb-2">0{suffix}</span>;
}

export default function Stats({ trans }: StatsProps) {
    const stats = [
        { num: 10, suffix: "+", label: trans.years },
        { num: 30, suffix: "+", label: trans.projects },
        { num: 5, suffix: "+", label: trans.tech },
        { num: 100, suffix: "+", label: trans.clients },
    ];

    return (
        <section className="bg-navy-800 dark:bg-navy-800 py-10 border-t border-white/5">
            <div className="bg-light-primary dark:bg-navy-800 py-10 transition-colors duration-300">
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
                                <CountUp to={stat.num} suffix={stat.suffix} />
                                <p className="text-white/80 dark:text-gray-400 text-sm uppercase tracking-wide">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
