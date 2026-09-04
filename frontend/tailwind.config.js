/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onefi: {
          primary: '#6C38FF',
          'primary-hover': '#5824EC',
          'primary-dark': '#4813DC',
          'primary-light': '#F3EFFF',
          'primary-subtle': '#E8DCFF',
          'primary-border': '#D8C7FF',
          purple: {
            50: '#F7F5FF',
            100: '#EFEAFF',
            200: '#DDD4FF',
            500: '#6C38FF',
            600: '#5A25E8',
            700: '#4714D2',
            900: '#2A0885'
          },
          green: {
            DEFAULT: '#00C88C',
            light: '#E6F9F3',
            text: '#008C62'
          },
          dark: '#151928',
          body: '#4B5565',
          muted: '#8C93A8',
          border: '#E8ECF4',
          bg: '#F5F6FA',
          surface: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'onefi-card': '0 4px 20px -2px rgba(108, 56, 255, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'onefi-glow': '0 8px 24px -4px rgba(108, 56, 255, 0.35)',
        'onefi-subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
