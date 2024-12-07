/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
    darkMode: 'media',
    content: ["../**/*.html", "../**/*.templ", "../**/*.svg", "../**/*.go", "../static/**/*.js", "!./node_modules/"],
    theme: {
        extend: {
            screens: {
                'xs': '532px',
                '3xl': '1792px',
            },
            fontSize: {
                '2xs': ['0.435rem', { lineHeight: '0.70rem' }],
            },
            fontFamily: {
                'serif': ['Trirong', 'ui-serif', 'Georgia']
            },
            colors: {
                "accent-p": "#FF5F1F",
                "dark": "#111",
                // "dark": "#0F172A",
                "dark-btn-p": "#1d1d1d",
                "light": "#fafafa",
                // "light": "#ddf5ff",
                "fg-light": "#e1e1e1",
                "light-btn-p": "#fff",
            },
            boxShadow: {
                sm: '0 0 2px 0 var(--tw-shadow-color)',
                DEFAULT: '0 0 3px 0 var(--tw-shadow-color), 0 0 2px -1px var(--tw-shadow-color)',
                md: '0 0 6px -1px var(--tw-shadow-color), 0 0 4px -2px var(--tw-shadow-color)',
                lg: '0 0 15px -3px var(--tw-shadow-color), 0 0 6px -4px var(--tw-shadow-color)',
                xl: '0 0 25px -5px var(--tw-shadow-color), 0 0 10px -6px var(--tw-shadow-color)',
                '2xl': '0 0 50px -12px var(--tw-shadow-color)',
                inner: 'inset 0 0 4px 0 var(--tw-shadow-color)',
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

