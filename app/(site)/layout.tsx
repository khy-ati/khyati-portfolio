import Header from '@/components/Header'
import { sfetch, Q } from '@/lib/sanity'
import ScrollTop from '@/components/ScrollTop'
export const revalidate = 3600

const norm = (u: string) => {
  const t = u.trim()
  if (/^(https?:|mailto:)/i.test(t)) return t
  return t.includes('@') ? `mailto:${t}` : `https://${t}`
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const s: any = await sfetch(Q.settings, {}, null)
  const all = (s?.links || []).filter((l: any) => l?.url && l?.label).map((l: any) => ({ label: l.label, url: norm(l.url) }))
  const isEmail = (l: any) => /^e-?mail$/i.test(l.label) || l.url.startsWith('mailto:')
  const others = all.filter((l: any) => !isEmail(l))
  const address = (s?.email || '').trim().replace(/^mailto:/i, '') || all.find(isEmail)?.url.replace(/^mailto:/i, '')
  const mail = address ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address)}` : null
  const links = [...others, ...(mail ? [{ label: 'Email', url: mail }] : [])]
  return (
    <div className="top-wash">
      <Header links={links} />
      <main>{children}</main>
      <ScrollTop />
    </div>
  )
}