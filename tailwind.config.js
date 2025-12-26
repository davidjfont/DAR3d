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
                'fox-red': '#E5442A',
                'deep-black': '#0A0A0A',
                'bone-white': '#F5F3EE',
                'neon-green': '#5CFFBF',
                'ui-dark-gray': '#202326',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                title: ['Orbitron', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
