/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#FFFFFF',   // Pure white
          100: '#E5E5E5',  // Light gray
          200: '#A3A3A3',  // Medium gray
          300: '#525252',  // Dark gray
          400: '#272727',  // Near black
          500: '#171717',  // Darkest gray
          600: '#0D0D0D',  // Almost black
        },
        dark: {
          DEFAULT: '#171717',
          surface: '#272727',
          accent: '#525252',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};