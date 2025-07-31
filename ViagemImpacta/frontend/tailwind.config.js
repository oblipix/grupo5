/* eslint-disable no-undef */
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 1.5s infinite',
        'bounce-very-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  
  plugins: [
    require('@tailwindcss/line-clamp'), 
    require('@tailwindcss/typography'),  
  ],
}