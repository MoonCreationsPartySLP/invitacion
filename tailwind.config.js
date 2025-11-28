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
        coldiac: ['var(--font-coldiac)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        parisienne: ['var(--font-parisienne)', 'cursive'],
      },
    },
  },
  plugins: [],
};
