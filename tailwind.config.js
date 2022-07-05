const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./src/**/*.{html,js}'],
    darkMode: false,
    theme: {
        gap: { // defaults to theme => theme('spacing') as per Tailwind 1.2
            '0': '0',
            '1': '0.25rem',
            '2': '0.5rem',
            '3': '0.75rem',
            '4': '1rem',
        },
        fontFamily: {
            lato: ['Lato', 'sans-serif'],
            montserrat: ['Montserrat', 'sans-serif']
        },
        color: {
            "white": "#FFF",
            "black": "#000",
            ...defaultTheme.colors,
        },
        spacing: {
            sm: '16px',
            md: '32px',
            lg: '64px',
        },
        extend: {}
    },
    variants: {},
    plugins: []
}