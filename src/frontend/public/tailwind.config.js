// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        'primary-blue': '#3B82F6',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
    },
  },
  // ...
};