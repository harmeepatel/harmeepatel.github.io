/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
    darkMode: 'media',
    content: ["../**/*.html", "../**/*.templ", "../**/*.go", "../static/**/*.js", "!./node_modules/"],
    theme: {
        extend: {
            screens: {
                'xs': '557px',
                '3xl': '1792px',
            },
            fontSize: {
                '2xs': ['0.435rem', { lineHeight: '0.70rem' }],
            },
            colors: {
                "accent-p": "#FF5F1F",
                "dark": "#111",
                "dark-btn-p": "#1d1d1d",
                "light": "#fafafa",
                "fg-light": "#e1e1e1",
                "light-btn-p": "#fff",
            },
            boxShadow: {
                sm: '0 0 2px 0 rgb(0 0 0 / 0.05)',
                DEFAULT: '0 0 3px 0 rgb(0 0 0 / 0.1), 0 0 2px -1px rgb(0 0 0 / 0.1)',
                md: '0 0 6px -1px rgb(0 0 0 / 0.1), 0 0 4px -2px rgb(0 0 0 / 0.1)',
                lg: '0 0 15px -3px rgb(0 0 0 / 0.1), 0 0 6px -4px rgb(0 0 0 / 0.1)',
                xl: '0 0 25px -5px rgb(0 0 0 / 0.1), 0 0 10px -6px rgb(0 0 0 / 0.1)',
                '2xl': '0 0 50px -12px rgb(0 0 0 / 0.25)',
                inner: 'inset 0 0 4px 0 rgb(0 0 0 / 0.05)',
                none: 'none',
            },
            boxShadowColor: ({ theme }) => ({
                ...theme('colors'),
            }),
        },
    },
    variants: {
        fill: ['hover', 'focus'], // this line does the trick
    },
    plugins: [],
}

