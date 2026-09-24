import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Modal dialog behaviour: locks body scroll, closes on Escape, traps Tab inside
 * the dialog and gives focus back to the element that opened it.
 */
export function useDialog(ref: RefObject<HTMLElement | null>, isOpen: boolean, onClose: () => void) {
    useEffect(() => {
        if (!isOpen) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Effects run after commit, so the dialog is already in the DOM
        const initial = ref.current?.querySelector<HTMLElement>(FOCUSABLE);
        (initial ?? ref.current)?.focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            if (e.key !== 'Tab' || !ref.current) return;

            const focusable = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (!ref.current.contains(document.activeElement)) {
                e.preventDefault();
                first.focus();
            } else if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
            previouslyFocused?.focus();
        };
    }, [isOpen]);
}
