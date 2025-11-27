/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        TuFuenteSerif: ["TuFuenteSerif", "serif"],
        TuFuenteRegular: ["TuFuenteRegular", "sans-serif"],
        TuFuenteLigera: ["TuFuenteLigera", "sans-serif"],
      },
    },
  },
  plugins: [],
};
