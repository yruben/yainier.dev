import { isContactOpen } from "../stores/contactStore";

export default function FooterContact({ text }: { text: string }) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        isContactOpen.set(true);
    };

    return (
        <button
            type="button"
            aria-haspopup="dialog"
            onClick={handleClick}
            className="text-gray-600 dark:text-gray-400 hover:text-light-primary dark:hover:text-neon-cyan transition-colors text-left"
        >
            {text}
        </button>
    );
}
