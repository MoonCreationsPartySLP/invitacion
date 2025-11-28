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
        coldiac: ["Coldiac", "serif"],
        cormorant: ["CormorantGaramond", "serif"],
        parisienne: ["Parisienne", "cursive"],
        motterdam: ["Motterdam", "cursive"],
      },
    }
  },
  plugins: [],
};
