/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend:{
      fontFamily:{  
      }, 
      colors:{ 
      }
    },
    screens: {
      'sm':'480px',
      'md':'768px',
      'lg':'976px',
      'xl':'1440px'
    },
    animation: {
      fade: 'fadeOut 2s ease-in-out',
    },
 
  },
  plugins: [],
}
