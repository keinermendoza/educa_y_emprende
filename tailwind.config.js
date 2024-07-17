/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./core/**/templates/**/**/*.html",
    "./components/*.html",
    "./components/**/*.html",

  ],
  theme: {
    extend: {
      screens: {
        'xs': '490px',
        'xxs':'320px',
        'mdl':'800px',
      },
      colors: {
        'c-black': '#2D294B',
        'primary': '#1b98e0',
        'secundary': '#00bfb3',
      },
      fontFamily: {
        lalezar: ["lalezar", "sans-serif"],
      },

    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

