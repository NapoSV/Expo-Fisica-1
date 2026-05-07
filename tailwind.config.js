/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}', './Presentacion1.jsx'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'Consolas', 'monospace'],
        sans: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#050402',
      },
      boxShadow: {
        halo: '0 0 0 1px rgba(110,240,255,0.22), 0 0 48px rgba(110,240,255,0.12)',
      },
    },
  },
  plugins: [],
}
