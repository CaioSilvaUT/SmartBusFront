/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        allura: ['Allura', 'sans-serif'],
        abril: ['Abril Fatface', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      colors: {
        white: '#fffdff',
        grey: '#6a786e',
        beige: {
          100: '#F5F6EA',
          200: '#dfe1b9',
          300: '#ebedd5',
        },
        green: {
          100: '#89b196',
          200: '#538c63',
          300: '#a1cda8',
          400: '#3c6545',
        },
    },
  },
  plugins: [],
}
}
