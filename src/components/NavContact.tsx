import { isContactOpen } from "../stores/contactStore";
import { Mail } from "lucide-react";

interface NavContactProps {
    text: string;
    icon: string;
}

const iconMap = {
    contact: Mail,
};

export default function NavContact({ text, icon }: NavContactProps) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        isContactOpen.set(true);
    };

    const Icon = iconMap[icon as keyof typeof iconMap];

    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-light-primary dark:hover:text-neon-cyan transition-colors font-medium"
        >
            {Icon && <Icon size={18} />}
            <span>{text}</span>
        </button>
    );
}
