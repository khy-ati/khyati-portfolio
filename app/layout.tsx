import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Khyati — Content portfolio', description: 'Research-driven content, strategy, ideation and scriptwriting.' }
const themeScript = `try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}`
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
    <body className="font-sans antialiased">{children}</body></html>)
}
