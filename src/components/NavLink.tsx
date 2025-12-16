import { Home, User, FolderGit2, BookOpen, Star, Mail, Download } from 'lucide-react';

interface NavLinkProps {
    href: string;
    icon: string;
    text: string;
    isButton?: boolean;
}

const iconMap = {
    home: Home,
    about: User,
    projects: FolderGit2,
    blog: BookOpen,
    recommended: Star,
    contact: Mail,
    download: Download,
};

export default function NavLink({ href, icon, text, isButton = false }: NavLinkProps) {
    const IconComponent = iconMap[icon as keyof typeof iconMap];

    if (isButton) {
        return (
            <a
                href={href}
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-2 bg-light-primary dark:bg-neon-cyan text-white dark:text-navy-900 font-bold rounded-full hover:opacity-90 transition-opacity shadow-md dark:shadow-neon-cyan"
            >
                {IconComponent && <IconComponent className="w-4 h-4" />}
                <span>{text}</span>
            </a>
        );
    }

    return (
        <a
            href={href}
            className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-neon-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
            {IconComponent && <IconComponent className="w-4 h-4" />}
            <span>{text}</span>
        </a>
    );
}
