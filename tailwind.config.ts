/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /text-(red|yellow|green)-600/,
    },
    {
      pattern: /border-(red|yellow|green)-500/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
