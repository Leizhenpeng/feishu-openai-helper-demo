const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./index.html",
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                main: '#243763',
                secondary:{
                    light: '#FF9264',
                    DEFAULT: '#FF6E31',
                    dark: '#FF5912',
                    darker: '#FD4B00',
                },
                third: '#FFEBB7',
                fourth: '#AD8E70',
            },
            fontFamily: {
                hero: ['grand', 'sans-serif'],
            }
        },

    },

    plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
}

module.exports = config
