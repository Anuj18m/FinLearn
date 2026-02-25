/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0891b2',
        secondary: '#0e7490',
        accent: '#10b981',
        bgPrimary: '#f8fafc',
        bgSecondary: '#f1f5f9'
      }
    },
  },
  plugins: [],
}
