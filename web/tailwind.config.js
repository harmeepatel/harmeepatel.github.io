/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'media',
    content: ["./**/*.html", "./**/*.templ", "./**/*.go", "./static/**/*.js"],
    theme: {
        extend: {
            boxShadow: {
                "blurShadow": `inset 0 0 64px rgba(255, 255, 255, 0.1),
                            inset 0 0 48px rgba(255, 255, 255, 0.2), 
                            inset 0 0 24px rgba(255, 255, 255, 0.3)`,
            }
        },
    },
    plugins: [],
}

