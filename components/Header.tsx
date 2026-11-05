import ThemeToggle from './ThemeToggle'
import HomeLink from './HomeLink'
export default function Header({ links }: { links?: { label: string; url: string }[] }) {
  return (
    <header className="mx-auto flex max-w-6xl items-start justify-between gap-4 px-6 py-8">
      <HomeLink />
      <nav aria-label="Main" className="ml-auto flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm">
        {links?.map(l => (
          <a key={l.label + l.url} href={l.url}
            {...(l.url.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            className="underline-offset-4 hover:underline">{l.label}</a>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  )
}