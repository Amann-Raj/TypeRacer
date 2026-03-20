/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#0f0f0f',
          secondary: '#1a1a1a',
          tertiary: '#242424',
        },
        accent: {
          primary: '#e2b714',
          error: '#ca4754',
          success: '#4caf74',
        },
        text: {
          primary: '#d1d0c5',
          secondary: '#646669',
          muted: '#3a3a3a',
        }
      }
    },
  },
  plugins: [],
}