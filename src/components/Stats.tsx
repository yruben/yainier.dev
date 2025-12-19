import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef } from "react";

interface StatsProps {
    trans: {
        years: string;
        projects: string;
        tech: string;
        clients: string;
        linkedin: string;
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
        { num: 1500, suffix: "+", label: trans.linkedin },
    ];

    return (
        <section className="bg-navy-800 dark:bg-navy-800 py-10 border-t border-white/5">
            <div className="bg-light-primary dark:bg-navy-800 py-10 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center items-stretch text-center text-white">
                        {stats.map((stat, index) => {
                            // Determine if border should show based on breakpoint
                            const isLastInRow = {
                                mobile: (index % 2 === 1), // 2 cols: every odd index is last
                                tablet: ((index + 1) % 3 === 0), // 3 cols: every 3rd item is last
                                desktop: index === stats.length - 1, // 5 cols: only last item
                            };

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`flex flex-col items-center justify-center px-6 md:px-8 lg:px-12 py-4 w-1/2 md:w-1/3 lg:w-1/5 ${
                                        !isLastInRow.mobile ? 'border-r border-white/20' : ''
                                    } ${!isLastInRow.tablet ? 'md:border-r' : 'md:border-r-0'} ${
                                        !isLastInRow.desktop ? 'lg:border-r' : 'lg:border-r-0'
                                    }`}
                                >
                                    <CountUp to={stat.num} suffix={stat.suffix} />
                                    <p className="text-white/80 dark:text-gray-400 text-sm uppercase tracking-wide">{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
