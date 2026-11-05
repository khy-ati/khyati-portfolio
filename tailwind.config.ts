import type { Config } from 'tailwindcss'
export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { bg: 'var(--bg)', fg: 'var(--fg)', muted: 'var(--muted)', line: 'var(--line)', accent: 'var(--accent)' },
      fontFamily: {
        serif: ['var(--font-heading)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['var(--font-body)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    }
  },
  plugins: [],
} satisfies Config