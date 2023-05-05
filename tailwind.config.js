/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        backgroundDark: "#202020",
        layoutDark: "#2c2c2c",
        layoutLight: "#ffffff",
        backgroundLight: "#f3f6f8",
        font: "#dddddd",
      },
    },
  },
  plugins: [],
};
