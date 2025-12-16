/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                navy: {
                    900: '#0a192f',
                    800: '#112240',
                    700: '#233554',
                },
                neon: {
                    cyan: '#64ffda',
                    pink: '#ff0066',
                    blue: '#00e0ff',
                },
                // Light mode palette
                light: {
                    bg: '#f8fafc', // slate-50
                    surface: '#ffffff',
                    text: '#0f172a', // slate-900
                    primary: '#0ea5e9', // sky-500
                    secondary: '#ec4899', // pink-500
                }
            },
            boxShadow: {
                'neon-cyan': '0 0 10px #64ffda, 0 0 20px #64ffda',
                'neon-pink': '0 0 10px #ff0066, 0 0 20px #ff0066',
            },
            animation: {
                'blob': 'blob 7s infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            }
        },
    },
    plugins: [],
}
