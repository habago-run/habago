import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,css}",
        "../shared/**/*.{js,ts,jsx,tsx,css}"
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui()]
}

export default config;