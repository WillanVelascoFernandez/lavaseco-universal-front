/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': {
          DEFAULT: '#06476D',
          light: '#2980B9',
          dark: '#043452',
        },
        'brand-cyan': '#5EBED6',
        'brand-accent': '#1EA0DC',
        'brand-dark': '#434244',
      },
      fontFamily: {
        'sans': ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
