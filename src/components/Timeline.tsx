import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

interface TimelineItem {
    id: string;
    data: {
        label: string;
        title: string;
        fullDescription: string;
        markerTitle: string;
        markerText: string;
        image?: string;
        icon?: string;
    };
    body: string;
}

interface TimelineProps {
    items: TimelineItem[];
    title?: string;
}

const IconMap: Record<string, any> = {
    'home': (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    ),
    'work': (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 2.613H3.75m0 0a2.18 2.18 0 01-.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
    ),
    'education': (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.24 50.552 50.552 0 00-2.658.813m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
    ),
    'travel': (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
    ),
    'default': (
        <div className="w-2.5 h-2.5 bg-current rounded-full" />
    )
}

export default function Timeline({ items }: TimelineProps) {
    // Sort items by label
    const sortedItems = [...items].sort((a, b) => parseInt(a.data.label) - parseInt(b.data.label));

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [windowStart, setWindowStart] = useState(0);

    if (sortedItems.length === 0) {
        return null;
    }

    const windowSize = 5;
    const selectedItem = sortedItems[selectedIndex];

    const nextItem = () => {
        const newIndex = (selectedIndex + 1) % sortedItems.length;

        // Only slide the window if we're at the last visible item in the current window
        // and there are more items to show
        const isAtLastVisibleItem = selectedIndex === windowStart + windowSize - 1;
        const hasMoreItemsAhead = windowStart + windowSize < sortedItems.length;

        if (isAtLastVisibleItem && hasMoreItemsAhead) {
            // Slide window forward by 1
            setWindowStart(windowStart + 1);
        } else if (newIndex === 0) {
            // Wrapped around to start
            setWindowStart(0);
        }

        setSelectedIndex(newIndex);
    };

    const prevItem = () => {
        const newIndex = (selectedIndex - 1 + sortedItems.length) % sortedItems.length;

        // Only slide the window if we're at the first visible item in the current window
        // and there are items before
        const isAtFirstVisibleItem = selectedIndex === windowStart;
        const hasItemsBefore = windowStart > 0;

        if (isAtFirstVisibleItem && hasItemsBefore) {
            // Slide window backward by 1
            setWindowStart(windowStart - 1);
        } else if (newIndex === sortedItems.length - 1) {
            // Wrapped around to end
            setWindowStart(Math.max(sortedItems.length - windowSize, 0));
        }

        setSelectedIndex(newIndex);
    };

    return (
        <section className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto">

            {/* Top Featured Card */}
            <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl overflow-hidden mb-16 relative min-h-[400px] flex flex-col md:flex-row transition-colors duration-300">

                {/* Navigation Arrows (Absolute positioned or integrated) */}
                <button
                    onClick={prevItem}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-gray-100/10 dark:bg-navy-700/10 hover:bg-gray-200/30 dark:hover:bg-navy-600/30 transition-colors shadow-lg backdrop-blur-sm group"
                    aria-label="Previous event"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-200 group-hover:scale-110 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button
                    onClick={nextItem}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-gray-100/10 dark:bg-navy-700/10 hover:bg-gray-200/30 dark:hover:bg-navy-600/30 transition-colors shadow-lg backdrop-blur-sm group"
                    aria-label="Next event"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-200 group-hover:scale-110 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedItem.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col md:flex-row w-full h-full"
                    >
                        {/* Text Content */}
                        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center relative z-10">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-sm md:text-base font-bold text-light-primary dark:text-neon-cyan tracking-wider uppercase mb-2"
                            >
                                {selectedItem.data.label}
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                            >
                                {selectedItem.data.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
                            >
                                {selectedItem.data.fullDescription}
                            </motion.p>
                        </div>

                        {/* Image Content */}
                        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent z-10 pointer-events-none md:hidden"></div>
                            {selectedItem.data.image ? (
                                <img
                                    src={selectedItem.data.image}
                                    alt={selectedItem.data.title}
                                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 dark:bg-navy-900 flex items-center justify-center">
                                    <span className="text-gray-400 dark:text-gray-600">No Image Available</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Timeline Navigation */}
            <div className="relative pt-8 group/timeline">
                {/* Connecting Line */}
                <div className="absolute top-[3.75rem] left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />

                {/* Fade Gradients (Visual only, pointer events none) */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-light-bg dark:from-navy-900 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-light-bg dark:from-navy-900 to-transparent z-10 pointer-events-none" />

                {/* Scrollable list - Simplified for fixed items */}
                <div className="overflow-hidden pb-8 mx-auto max-w-4xl px-8">
                    <div className="flex justify-center items-start gap-4 md:gap-8 transition-all duration-300 ease-in-out">
                        {(() => {
                            // Calculate sliding window
                            const windowSize = 5;
                            const totalItems = sortedItems.length;

                            let startIndex = 0;
                            if (totalItems <= windowSize) {
                                startIndex = 0;
                            } else {
                                // Try to center the selected index
                                // For window 5, center is index 2. So we want start = selected - 2
                                startIndex = selectedIndex - 2;

                                // Clamp start to valid range [0, total - window]
                                if (startIndex < 0) startIndex = 0;
                                if (startIndex > totalItems - windowSize) startIndex = totalItems - windowSize;
                            }

                            const visibleItems = sortedItems.slice(startIndex, startIndex + windowSize);

                            return visibleItems.map((item, i) => {
                                // We need the original index to handle selection correctly
                                const originalIndex = startIndex + i;
                                const isSelected = originalIndex === selectedIndex;
                                const iconKey = item.data.icon || 'default';
                                const Icon = IconMap[iconKey] || IconMap['default'];

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedIndex(originalIndex)}
                                        className={`flex flex-col items-center group focus:outline-none min-w-[120px] md:min-w-[140px] relative transition-all duration-500 ease-in-out ${isSelected ? 'opacity-100 scale-100' : 'opacity-50 hover:opacity-100 scale-90'}`}
                                    >
                                        {/* Marker Circle */}
                                        <div className={`
                                            w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 relative z-10 mb-4 transition-all duration-300
                                            ${isSelected
                                                ? 'bg-light-primary dark:bg-neon-cyan border-white dark:border-navy-900 text-white dark:text-navy-900 shadow-lg scale-110'
                                                : 'bg-white dark:bg-navy-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-light-primary dark:hover:border-neon-cyan'
                                            }
                                        `}>
                                            {Icon}

                                            {/* Pulse effect for selected */}
                                            {isSelected && (
                                                <span className="absolute inset-0 rounded-full bg-light-primary/30 dark:bg-neon-cyan/30 animate-ping -z-10"></span>
                                            )}
                                        </div>

                                        {/* Text Labels */}
                                        <div className="text-center space-y-1">
                                            <h4 className={`text-xs md:text-sm font-bold transition-colors ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                                {item.data.markerTitle}
                                            </h4>
                                            <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight hidden md:block mx-auto text-center">
                                                {item.data.markerText}
                                            </p>
                                        </div>
                                    </button>
                                );
                            });
                        })()}
                    </div>
                </div>
            </div>

        </section>
    );
}
