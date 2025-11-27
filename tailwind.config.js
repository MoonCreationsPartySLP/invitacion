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
        Coldiac: ["Coldiac", "serif"],
        CormorantGaramond: ["CormorantGaramond", "sans-serif"],
        Parisienne: ["Parisienne", "sans-serif"],
      },
    },
  },
  plugins: [],
};
