module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006994',
          dark: '#005a82',
        },
        secondary: {
          DEFAULT: '#FFB800',
          dark: '#E5A600',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}