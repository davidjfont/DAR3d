/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./layouts/**/*.{html,js}",
        "./content/**/*.{html,js,md}",
        "./themes/dar3d/layouts/**/*.{html,js}",
    ],
    theme: {
        extend: {
            colors: {
                'fox-red': 'rgb(var(--color-fox-red) / <alpha-value>)',
                'deep-black': 'rgb(var(--color-deep-black) / <alpha-value>)',
                'bone-white': 'rgb(var(--color-bone-white) / <alpha-value>)',
                'neon-green': 'rgb(var(--color-neon-green) / <alpha-value>)',
                'ui-dark-gray': 'rgb(var(--color-ui-dark-gray) / <alpha-value>)',
                'prose-text': 'rgb(var(--color-prose-text) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                title: ['Orbitron', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
