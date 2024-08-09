/** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors')
module.exports = {
    darkMode: 'media',
    content: ["./**/*.html", "./static/**/*.js", "./**/*.templ", "./**/*.go"],
    theme: {
        extend: {},
        // colors: {
        //     ...colors
        // },
    },
    plugins: [],
}

