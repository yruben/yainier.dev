import { motion } from "motion/react";
import { Mail } from "lucide-react";

interface HireMeFABProps {
    text: string;
    href: string;
}

export default function HireMeFAB({ text, href }: HireMeFABProps) {
    return (
        <motion.a
            href={href}
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-6 py-3 bg-light-primary dark:bg-neon-cyan text-white dark:text-navy-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-light-primary/30 dark:hover:shadow-neon-cyan/30 transition-shadow border border-white/20 dark:border-navy-900/10 backdrop-blur-sm"
        >
            <Mail size={20} />
            <span>{text}</span>
        </motion.a>
    );
}
