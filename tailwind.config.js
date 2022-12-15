/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'list-blue': '#2b2c37',
        'box-color': "#686c741a " , 
        'list-dim-blue': '#2b2c3759'
      }
    },
  },
  plugins: [],
};