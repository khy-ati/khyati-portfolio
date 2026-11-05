'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function HomeLink() {
    const pathname = usePathname()
    if (pathname === '/') return null
    return <Link href="/" className="text-sm underline-offset-4 hover:underline">← Home</Link>
}