/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}",
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif']
      },
      minWidth: {
        '600': '600px' // Define min-w-600
      },
      backgroundImage: {
        'home': "url('/_assets/bg.png')"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

