/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        card: 'rgba(15, 23, 42, 0.85)',
        'ns-muted': 'var(--ns-muted, #0284c7)',
        foreground: 'var(--foreground, #00D2FF)',
        border: 'var(--border, rgba(0, 210, 255, 0.25))',
        accent: 'var(--accent, rgba(56, 189, 248, 0.15))',
        cyan: {
          400: '#00D2FF',
          500: '#06b6d4',
          600: '#0891b2',
        },
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 30px rgba(0, 210, 255, 0.35)',
        'cyan-glow-lg': '0 0 50px rgba(0, 210, 255, 0.55)',
        'blue-glow': '0 0 30px rgba(37, 99, 235, 0.35)',
      },
    },
  },
  plugins: [],
}
