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
        },
        colors: {
            ...colors
        },
    },
    plugins: [],
}

