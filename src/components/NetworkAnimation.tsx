import { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

const NODE_COUNT = 50;
const CONNECTION_DISTANCE = 150;

export default function NetworkAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let isDark = document.documentElement.classList.contains('dark');
        let isVisible = true;
        let frame = 0;

        const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
            x: 0,
            y: 0,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: 2 + Math.random() * 2,
        }));

        // The canvas is absolutely positioned over its section (hero / footer):
        // match the drawing buffer to that box instead of the whole window
        const resize = () => {
            if (canvas.width === canvas.clientWidth && canvas.height === canvas.clientHeight) return;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            for (const node of nodes) {
                node.x = Math.random() * canvas.width;
                node.y = Math.random() * canvas.height;
            }
        };
        resize();

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // neon-cyan for dark, indigo for light
            const rgb = isDark ? '0, 229, 255' : '99, 102, 241';
            ctx.fillStyle = `rgba(${rgb}, ${isDark ? 0.5 : 0.6})`;

            for (const node of nodes) {
                if (!reducedMotion.matches) {
                    node.x += node.vx;
                    node.y += node.vy;
                    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                }
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.lineWidth = 0.5;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                    if (distance < CONNECTION_DISTANCE) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(${rgb}, ${(1 - distance / CONNECTION_DISTANCE) * 0.3})`;
                        ctx.stroke();
                    }
                }
            }
        };

        const loop = () => {
            draw();
            frame = requestAnimationFrame(loop);
        };

        // Only run the loop while the canvas is on screen and motion is allowed
        const sync = () => {
            cancelAnimationFrame(frame);
            if (reducedMotion.matches) draw();
            else if (isVisible) loop();
        };

        const themeObserver = new MutationObserver(() => {
            isDark = document.documentElement.classList.contains('dark');
            if (reducedMotion.matches) draw();
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        const visibilityObserver = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            sync();
        });
        visibilityObserver.observe(canvas);

        const resizeObserver = new ResizeObserver(() => {
            resize();
            if (reducedMotion.matches) draw();
        });
        resizeObserver.observe(canvas);
        reducedMotion.addEventListener('change', sync);

        return () => {
            cancelAnimationFrame(frame);
            themeObserver.disconnect();
            visibilityObserver.disconnect();
            resizeObserver.disconnect();
            reducedMotion.removeEventListener('change', sync);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full opacity-20 dark:opacity-30 pointer-events-none"
        />
    );
}
