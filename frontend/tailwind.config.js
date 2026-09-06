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
          primary: '#722EDC',
          'primary-hover': '#5F24BD',
          'primary-dark': '#531CAB',
          'primary-light': '#F4EEFF',
          'primary-subtle': '#E8DCFF',
          'primary-border': '#D4B8FF',
          purple: {
            50: '#FBF9FF',
            100: '#F4EEFF',
            200: '#E8DCFF',
            500: '#722EDC',
            600: '#5F24BD',
            700: '#531CAB',
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
        'onefi-card': '0 4px 20px -2px rgba(114, 46, 220, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'onefi-glow': '0 8px 24px -4px rgba(114, 46, 220, 0.35)',
        'onefi-subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
