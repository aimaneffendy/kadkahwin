/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['Great Vibes', 'cursive'],
      },
      colors: {
        gold: {
          100: '#FDF9E6',
          200: '#F5D0A9',
          300: '#E7B372',
          400: '#D4AF37',
          500: '#B8860B',
          600: '#A06F0F',
          700: '#8A5F0C',
          800: '#6D4D08',
          900: '#4D3605',
        },
      },
    },
  },
  plugins: [],
};