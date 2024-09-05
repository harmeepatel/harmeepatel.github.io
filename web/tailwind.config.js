/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
    darkMode: 'media',
    content: ["./**/*.html", "./**/*.templ", "./**/*.go", "./static/**/*.js"],
    theme: {
        extend: {
            screens: {
                '3xl': '1792px',
            },
            fontSize: {
                '2xs': ['0.5rem', { lineHeight: '0.75rem' }],
            },
            colors: {
                "dark-bg": "var(--dark-bg)",
                "light-bg": "var(--light-bg)"
            },
        },
        colors: {
            ...colors
        },
    },
    plugins: [],
}

