/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Direct color utilities (e.g. bg-win-teal, text-win-navy)
        'win-teal': '#008080',
        'win-gray': '#c0c0c0',
        'win-dark': '#808080',
        'win-navy': '#000080',
        'win-blue': '#1084d0',
        // Nested grouping for flexibility
        win: {
          teal: '#008080',
          gray: '#c0c0c0',
          dark: '#808080',
          navy: '#000080',
          blue: '#1084d0',
          light: '#dfdfdf',
          white: '#ffffff',
          black: '#000000',
        },
      },
      boxShadow: {
        // Classic Windows 98 3D Bevel Shadows
        'win-outset': 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf',
        'win-inset': 'inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #000000, inset -2px -2px 0 #dfdfdf',
        'win-pressed': 'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #808080, inset -2px -2px 0 #dfdfdf',
      },
      fontFamily: {
        w95: ['W95FA', '"MS Sans Serif"', 'Tahoma', 'sans-serif'],
        retroMono: ['"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
};
