/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        star: {
          '0%': {
            opacity: 0,
            transform: 'scale(1.5) translateY(-0.75em)',
          },
          '20%': {
            opacity: 1,
          },
          '89%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateZ(-1000em)',
          },
        },
        wars: {
          '0%': {
            opacity: 0,
            transform: 'scale(1.5) translateY(0.5em)',
          },
          '20%': {
            opacity: 1,
          },
          '90%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateZ(-1000em)',
          },
        },
      },
      animation: {
        'opening-wars': 'wars 5s ease-out',
        'opening-star': 'star 5s ease-out',
      },
    },
  },
  plugins: [],
}
