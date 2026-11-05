import Link from 'next/link'
import { sfetch, Q } from '@/lib/sanity'
import { VideoCard, WritingCard } from '@/components/ProjectCard'
export const revalidate = 3600
export default async function Home() {
  const [s, videos, scripts]: any[] = await Promise.all([sfetch(Q.settings, {}, null), sfetch(Q.featured, {}, []), sfetch(Q.scripts, {}, [])])
  return (
    <>
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 pb-16">
        {s?.name && (
          <div className="mb-6">
            <span className="mb-5 block h-px w-12 bg-accent" />
            <p className="font-serif text-2xl text-accent sm:text-3xl">{s.name}</p>
          </div>
        )}
        {s?.headline ? <h1 className="max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">{s.headline}</h1>
          : <p className="text-muted">Add a headline in Admin → Site settings.</p>}
        {s?.intro && <p className="mt-6 max-w-xl text-lg text-muted">{s.intro}</p>}
        <a href="#work" className="mt-10 w-fit text-sm underline underline-offset-4">Explore my work ↓</a>
      </section>
      <section id="work" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-24">
        <div className="mb-8 flex items-baseline justify-between border-t border-line pt-8">
          <h2 className="font-serif text-3xl">Short-form videos</h2>
          <Link href="/work" className="text-sm underline underline-offset-4">View all work</Link>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((p: any) => <VideoCard key={p._id} p={p} play />)}
        </div>
        {videos.length === 0 && <p className="text-muted">No featured videos yet.</p>}
        <h2 className="mb-2 mt-24 font-serif text-3xl">Long-form scripts</h2>
        <div>{scripts.map((p: any) => <WritingCard key={p._id} p={p} />)}</div>
        {scripts.length === 0 && <p className="text-muted">No scripts published yet.</p>}
      </section>
    </>
  )
}