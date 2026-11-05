import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sfetch, Q, urlFor, reelId } from '@/lib/sanity'
import RichText from '@/components/RichText'
import ReelEmbed from '@/components/ReelEmbed'
import { cleanTitle } from '@/lib/labels'
export const revalidate = 3600
export const dynamicParams = true
export async function generateStaticParams() { return [] }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p: any = await sfetch(Q.one, { slug: (await params).slug }, null); return { title: p?.title }
}
const Links = ({ items }: { items?: { label?: string; url?: string }[] }) => items?.length ? (
  <ul className="mt-3 space-y-1 text-sm">{items.map((l, i) => l.url && <li key={i}><a href={l.url} target="_blank" rel="noopener noreferrer" className="break-words underline underline-offset-4">{l.label || l.url}</a></li>)}</ul>) : null
const Section = ({ title, children, show }: any) => show ? <section className="mb-10"><h2 className="mb-3 text-xs uppercase tracking-widest text-accent">{title}</h2>{children}</section> : null
const has = (v?: any[]) => !!v?.length
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p: any = await sfetch(Q.one, { slug: (await params).slug }, null)
  if (!p) notFound()
  const back = <Link href="/work" className="text-sm underline underline-offset-4">← All work</Link>
  if (p.projectType === 'script') return (
    <article className="mx-auto max-w-2xl px-6 pb-24">
      {back}
      <h1 className="mt-8 font-serif text-4xl sm:text-5xl">{p.title}</h1>
      {p.synopsis && <p className="mt-6 text-lg text-muted">{p.synopsis}</p>}
      <div className="mt-12"><Section title="Research & creative approach" show={has(p.approach)}><RichText value={p.approach} /></Section></div>
      <Section title="Script" show={has(p.script)}><div className="font-serif text-lg"><RichText value={p.script} /></div></Section>
      <Section title="References" show={has(p.references)}><Links items={p.references} /></Section>
    </article>
  )
  return (
    <article className="mx-auto max-w-6xl px-6 pb-24">
      {back}
      <h1 className="mt-8 font-serif text-4xl sm:text-5xl">{p.title}</h1>
      <div className="mt-12 grid gap-12 lg:grid-cols-[380px_minmax(0,1fr)]">
        <ReelEmbed id={reelId(p.reelUrl)} url={p.reelUrl} thumb={p.thumbnail ? urlFor(p.thumbnail).width(760).url() : undefined} title={p.title} />
        <div className="max-w-2xl">
          <Section title="The idea" show={has(p.idea)}><RichText value={p.idea} /></Section>
          <Section title="Research" show={has(p.research) || has(p.sources)}><RichText value={p.research} /><Links items={p.sources} /></Section>
          <Section title="Ideation" show={has(p.ideation)}><RichText value={p.ideation} /></Section>
          <Section title="Scripting" show={has(p.scripting)}><RichText value={p.scripting} /></Section>
          <Section title="Performance" show={has(p.metrics)}><ul className="text-sm">{p.metrics?.map((m: any, i: number) => <li key={i}>{m.label}: {m.value}</li>)}</ul></Section>
        </div>
      </div>
      {has(p.script) && <section className="mt-16 border-t border-line pt-10"><h2 className="mb-6 text-xs uppercase tracking-widest text-accent">The script</h2><div className="max-w-3xl font-serif text-lg"><RichText value={p.script} /></div></section>}
    </article>
  )
}
