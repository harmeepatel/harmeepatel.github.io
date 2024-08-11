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
                '2xs': ['0.4rem', { lineHeight: '0.5rem' }],
                'xs': ['0.5rem', { lineHeight: '0.75rem' }],
                'sm': ['0.75rem', { lineHeight: '1rem' }],
                'base': ['0.875rem', { lineHeight: '1.25rem' }],
                'lg': ['1rem', { lineHeight: '1.5rem' }],
                'xl': ['1.125rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '3xl': ['1.5rem', { lineHeight: '2rem' }],
                '4xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '5xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '6xl': ['3rem', { lineHeight: '1' }],
                '7xl': ['3.75rem', { lineHeight: '1' }],
                '8xl': ['4.5rem', { lineHeight: '1' }],
                '9xl': ['6rem', { lineHeight: '1' }],
                '10xl': ['8rem', { lineHeight: '1' }],
            },
        },
        colors: {
            ...colors
        },
    },
    plugins: [],
}

