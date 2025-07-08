/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        purple :{
          200 : "#e0e6fe",
          300 : "#e0e7ff",
          500 : "#9492db",
          600 : "#5046E4",
        },
        gray : {
            100 : "#f8fafc",
            200 : "#e6e9ed",
            600 : "95989c"
        },
      }
    },
  },
  plugins: [],
}