/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
        archivo: ['Archivo', 'sans-serif'],
      },
      colors: {
        primary: '#6b66ff',
      }
    },
  },
  plugins: [],
}
