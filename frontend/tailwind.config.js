/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#94a3b8',
          600: '#64748b',
          700: '#475569',
        },
        navy: {
          800: '#253668',
          900: '#1e2d5c',
        },
      },
    },
  },
  plugins: [],
};
