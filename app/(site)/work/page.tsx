import Link from 'next/link'
import { sfetch, Q } from '@/lib/sanity'
import { VideoCard, WritingCard } from '@/components/ProjectCard'
export const revalidate = 3600
export const metadata = { title: 'All work' }

export default async function Work({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams
  const all: any[] = await sfetch(Q.all, {}, [])
  const videos = all.filter(p => p.projectType !== 'script')
  const scripts = all.filter(p => p.projectType === 'script')
  const active = type === 'video' || type === 'script' ? type : 'all'
  const pill = (on: boolean) => `border px-4 py-1.5 text-sm transition-colors ${on ? 'border-fg bg-fg text-bg' : 'border-line hover:border-fg'}`
  const filters = [{ key: 'all', label: 'All', href: '/work' }, { key: 'video', label: 'Short-form', href: '/work?type=video' }, { key: 'script', label: 'Long-form', href: '/work?type=script' }]
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <h1 className="font-serif text-4xl">All work</h1>
      <nav aria-label="Filter work" className="mt-8 flex flex-wrap gap-2">
        {filters.map(f => <Link key={f.key} href={f.href} aria-current={active === f.key ? 'page' : undefined} className={pill(active === f.key)}>{f.label}</Link>)}
      </nav>

      {active !== 'script' && (
        <section className="mt-12">
          <h2 className="mb-8 border-t border-line pt-8 font-serif text-3xl">Short-form videos</h2>
          <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map(p => <VideoCard key={p._id} p={p} />)}
          </div>
          {videos.length === 0 && <p className="text-muted">No short-form videos yet.</p>}
        </section>
      )}

      {active !== 'video' && (
        <section className="mt-16">
          <h2 className="mb-2 border-t border-line pt-8 font-serif text-3xl">Long-form scripts</h2>
          <div>{scripts.map(p => <WritingCard key={p._id} p={p} />)}</div>
          {scripts.length === 0 && <p className="text-muted">No long-form scripts yet.</p>}
        </section>
      )}
    </div>
  )
}