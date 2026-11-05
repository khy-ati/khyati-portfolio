import { revalidateTag } from 'next/cache'
import { type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return new Response('Not configured', { status: 500 })
  const { isValidSignature } = await parseBody(req, secret)
  if (!isValidSignature) return new Response('Invalid signature', { status: 401 })
  revalidateTag('sanity')
  return Response.json({ revalidated: true })
}
