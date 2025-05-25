/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,jsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                'custom-dark': '#0a0a0a',
                'custom-gray': '#1a1a1a',
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
            },
            backdropBlur: {
                'xs': '2px',
            }
        },
    },
    plugins: [],
} 