/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef0ff',
          100: '#e0e4ff',
          500: '#7367f0', // Vuexy primary
          600: '#5e50ee',
          700: '#4a3ede',
          900: '#32279c',
        },
        dark: {
          bg: '#25293c',      // Vuexy dark mode background
          card: '#2f3349',    // Vuexy dark mode card
          border: '#434968',  // Vuexy dark mode border
          text: '#cfd3ec',
          muted: '#7983bb'
        }
      },
      boxShadow: {
        'card': '0 .125rem .25rem rgba(165,163,174,.15)',
        'card-dark': '0 .125rem .25rem rgba(15,20,34,.15)',
        'primary': '0 .125rem .375rem 0 rgba(115,103,240,.3)',
      }
    },
  },
  plugins: [],
}
