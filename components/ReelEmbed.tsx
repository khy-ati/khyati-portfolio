'use client'
import { useState } from 'react'
import Image from 'next/image'
export default function ReelEmbed({ id, url, thumb, title }: { id?: string; url?: string; thumb?: string; title: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div>
      <div className="relative mx-auto w-full max-w-[380px] overflow-hidden border border-line" style={{ aspectRatio: '9 / 16' }}>
        {thumb && <Image src={thumb} alt="" fill sizes="380px" className="object-cover" />}
        {!loaded && id && <p className="absolute inset-0 flex items-end justify-center p-4 text-sm text-muted">Loading Reel…</p>}
        {id && <iframe src={`https://www.instagram.com/reel/${id}/embed`} title={`Instagram Reel: ${title}`} loading="lazy" onLoad={() => setLoaded(true)} className="absolute inset-0 h-full w-full bg-white" allowFullScreen />}
      </div>
      {url && <p className="mt-3 text-center text-sm text-muted">Reel not loading? <a href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Open on Instagram</a></p>}
    </div>
  )
}
