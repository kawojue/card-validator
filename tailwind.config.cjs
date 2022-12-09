/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        cabin: ['Cabin', 'sans-serif']
      }
    },
  },
  plugins: [],
}