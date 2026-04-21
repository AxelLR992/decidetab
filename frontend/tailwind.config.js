/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7C6CFF',
          lavender: '#A69CFF',
          orange: '#FFA45B',
          blue: '#5FA8FF',
          dark: '#1D1E2C'
        }
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      boxShadow: {
        soft: '0 12px 35px rgba(29,30,44,.12)'
      }
    }
  },
  plugins: []
};
