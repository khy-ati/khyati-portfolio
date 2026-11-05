import Link from 'next/link'
import Image from 'next/image'
import { urlFor, reelId } from '@/lib/sanity'
import { cleanTitle} from '@/lib/labels'

export function VideoCard({ p, play }: { p: any; play?: boolean }) {
  const id = play ? reelId(p.reelUrl) : undefined
  return (
    <div className="group flex h-full flex-col">
      {id ? (
        <div className="relative w-full overflow-hidden border border-line bg-white" style={{ aspectRatio: '9 / 16' }}>
          <iframe src={`https://www.instagram.com/reel/${id}/embed`} title={`Instagram Reel: ${cleanTitle(p.title)}`} loading="lazy" className="absolute inset-0 h-full w-full" allowFullScreen />
        </div>
      ) : (
        <Link href={`/work/${p.slug}`} className="block">
          <div className="relative w-full overflow-hidden border border-line bg-line/30" style={{ aspectRatio: '9 / 16' }}>
            {p.thumbnail && <Image src={urlFor(p.thumbnail).width(600).height(1067).fit('crop').url()} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />}
          </div>
        </Link>
      )}
      <Link href={`/work/${p.slug}`} className="mt-4 block">
        <h3 className="font-serif text-xl group-hover:underline underline-offset-4">{cleanTitle(p.title)}</h3>
        {p.description && <p className="mt-1 line-clamp-2 text-sm text-muted">{p.description}</p>}
      </Link>
    </div>
  )
}

export function WritingCard({ p }: { p: any }) {
  return (
    <Link href={`/work/${p.slug}`} className="group block border-t border-line py-8">
      <h3 className="mt-0 font-serif text-2xl group-hover:underline underline-offset-4">{cleanTitle(p.title)}</h3>
      {p.synopsis && <p className="mt-2 max-w-2xl text-muted">{p.synopsis}</p>}
      <span className="mt-3 inline-block text-sm underline underline-offset-4">Read the full script →</span>
    </Link>
  )
}