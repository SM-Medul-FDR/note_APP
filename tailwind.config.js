/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        'darkTheme' : '#31363F'
      },
    },
    fontFamily:{
      'roboto' : ' "Roboto", sans-serif',
      'nunito' : ' "Nunito", sans-serif',
      'Monstarait' : ' "Montserrat", sans-serif',
    },
    
  },
  plugins: [],
}