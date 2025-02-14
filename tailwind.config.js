module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ['hover', 'focus']
    },
  },
  plugins: [
    require('tailwindcss-animatecss')({
      variants: ['responsive', 'hover', 'reduced-motion'],
    })
  ],
}
