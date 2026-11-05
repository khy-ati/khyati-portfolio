'use client'
import { useEffect, useState } from 'react'
export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), [])
  const toggle = () => { const n = !dark; setDark(n); document.documentElement.classList.toggle('dark', n)
    try { localStorage.setItem('theme', n ? 'dark' : 'light') } catch {} }
  return <button onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} className="text-sm underline-offset-4 hover:underline">{dark ? 'Light' : 'Dark'}</button>
}
