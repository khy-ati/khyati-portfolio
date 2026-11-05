'use client'
import { useEffect, useState } from 'react'
export default function ScrollTop() {
    const [show, setShow] = useState(false)
    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 500)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            tabIndex={show ? 0 : -1}
            className={`fixed bottom-6 right-6 z-40 border border-line bg-bg px-3 py-2 text-sm transition-opacity ${show ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
            ↑ Top
        </button>
    )
}