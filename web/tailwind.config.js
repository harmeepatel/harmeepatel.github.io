/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
content: [ "./**/*.html", "./**/*.templ", "./**/*.go", "./static/**/*.js"],
    theme: {
        extend: {
            colors: {
                primary: colors.blue["600"],
                secondary: colors.yellow,
                neutral: colors.gray,
            },
            boxShadow: {
                "blurShadow": `inset 0 0 64px rgba(255, 255, 255, 0.1),
                            inset 0 0 48px rgba(255, 255, 255, 0.2), 
                            inset 0 0 24px rgba(255, 255, 255, 0.3)`,
            }
        },
    },
    plugins: [
        function({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
        }
    ]
}
