/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // matcher alt i src
  ],
  theme: {
    extend: {
      colors: {
        main: {
          light: "#F3F4F4",
          blue: "#00A6DB",
          darkblue: "#09366D",
          red: "#E15E60",
          white: "#FFFFFF",
          blue2: "#0090BF",
          blue3: "#3576A7",
          green: "#009933",
        },
      },
    },
  },
  plugins: [],
};
