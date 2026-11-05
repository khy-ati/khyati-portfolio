import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter, Hanken_Grotesk, Instrument_Sans } from 'next/font/google'
import { sfetch, Q } from '@/lib/sanity'

const neue = localFont({
  src: [
    { path: './fonts/NeueHaasDisplayRoman.ttf', weight: '400', style: 'normal' },
    { path: './fonts/NeueHaasDisplayMediu.ttf', weight: '500', style: 'normal' },
    { path: './fonts/NeueHaasDisplayBold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--f-neue',
  display: 'swap',
  preload: false,
})
const inter = Inter({ subsets: ['latin'], variable: '--f-inter', display: 'swap', preload: false })
const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--f-hanken', display: 'swap', preload: false })
const instrument = Instrument_Sans({ subsets: ['latin'], variable: '--f-instrument', display: 'swap', preload: false })

const valid = ['neue', 'inter', 'hanken', 'instrument']
const pick = (v: any) => (valid.includes(v) ? v : 'neue')

export const metadata: Metadata = { title: 'Khyati — Content portfolio', description: 'Research-driven content, strategy, ideation and scriptwriting.' }
const themeScript = `try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}`

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s: any = await sfetch(Q.settings, {}, null)
  const style = {
    '--font-heading': `var(--f-${pick(s?.headingFont)})`,
    '--font-body': `var(--f-${pick(s?.bodyFont)})`,
  } as React.CSSProperties
  return (
    <html lang="en" className={[neue, inter, hanken, instrument].map(f => f.variable).join(' ')} style={style} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}