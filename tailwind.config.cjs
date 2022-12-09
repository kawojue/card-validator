/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        cabin: ['Cabin', 'sans-serif']
      },
      colors: {
        "pry-clr-0": "rgb(240, 240, 240)"
      }
    },
  },
  plugins: [],
}