import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { projectId, dataset, apiVersion } from '@/sanity/env'
// Published content only: never use a token or the previewDrafts perspective here.
export const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })
const builder = imageUrlBuilder({ projectId, dataset })
export const urlFor = (src: any) => builder.image(src)
export async function sfetch<T>(query: string, params: Record<string, any> = {}, fallback: T): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600, tags: ['sanity'] },
    })
  } catch {
    return fallback
  }
}
const card = `_id, title, projectType, "slug": slug.current, description, synopsis, reelUrl, thumbnail, "space": space->{title, label}`
export const Q = {
  settings: `*[_type=="siteSettings"][0]`,
  featured: `*[_type=="project" && projectType=="video" && featured==true && defined(slug.current)] | order(order asc)[0...6]{${card}}`,
  scripts: `*[_type=="project" && projectType=="script" && defined(slug.current)] | order(order asc){${card}}`,
  spaces: `*[_type=="space" && archived!=true] | order(order asc){_id, title, "slug": title}`,
  all: `*[_type=="project" && defined(slug.current)] | order(order asc, _createdAt desc){${card}, "spaceId": space._ref}`,
  one: `*[_type=="project" && slug.current==$slug][0]{..., "space": space->{title, label}}`,
  slugs: `*[_type=="project" && defined(slug.current)].slug.current`,
}
export function reelId(url?: string) { return url?.match(/instagram\.com\/(?:[\w.]+\/)?(?:reel|reels|p|tv)\/([\w-]+)/)?.[1] }
