import { PortableText } from 'next-sanity'
const components = {
  block: { h2: ({ children }: any) => <h3 className="mt-10 mb-3 font-serif text-2xl">{children}</h3>, h3: ({ children }: any) => <h4 className="mt-6 mb-2 font-serif text-xl">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 leading-8">{children}</p>, blockquote: ({ children }: any) => <blockquote className="my-6 border-l-2 border-accent pl-4 italic">{children}</blockquote> },
  list: { bullet: ({ children }: any) => <ul className="mb-4 list-disc pl-6 leading-8">{children}</ul>, number: ({ children }: any) => <ol className="mb-4 list-decimal pl-6 leading-8">{children}</ol> },
  marks: { link: ({ value, children }: any) => <a href={value?.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 break-words">{children}</a> },
}
export default function RichText({ value }: { value?: any[] }) { return value?.length ? <PortableText value={value} components={components} /> : null }
