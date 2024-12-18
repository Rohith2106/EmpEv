/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#93C5FD', // Light Blue
          DEFAULT: '#2563EB', // Blue
          dark: '#333333', // Dark Blue
        },
        background: '#1E293B', // Dark Background
        text: {
          DEFAULT: '#F3F4F6', // Light Text
          secondary: '#9CA3AF', // Secondary Light Text
        },
        border: '#4B5563', // Gray Border
      },
    },
  },
  plugins: [],
};
