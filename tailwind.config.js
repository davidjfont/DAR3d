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
                'fox-red': 'var(--color-fox-red)',
                'deep-black': 'var(--color-deep-black)',
                'bone-white': 'var(--color-bone-white)',
                'neon-green': 'var(--color-neon-green)',
                'ui-dark-gray': 'var(--color-ui-dark-gray)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                title: ['Orbitron', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
