/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        logo: ["Crimson Text", "serif"],
      },
      colors: {
        navBar: "#2E2E2E",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
