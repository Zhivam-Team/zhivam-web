// File: tailwind.config.js
/* eslint-disable @typescript-eslint/no-require-imports */

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // Create a custom name for your font, e.g., 'chetta'
                chetta: ['ChettaVissto', 'serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')]
}
