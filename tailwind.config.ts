import type { Config } from 'tailwindcss'
export default { darkMode: 'class', content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { bg: 'var(--bg)', fg: 'var(--fg)', muted: 'var(--muted)', line: 'var(--line)', accent: 'var(--accent)' },
    fontFamily: { serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'], sans: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'] } } },
  plugins: [] } satisfies Config
