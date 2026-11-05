# Khyati — Content Portfolio
Next.js 15 (App Router) · TypeScript · Tailwind · Sanity (embedded Studio at `/admin`) · Netlify.

## 1. Sanity setup
1. `npx sanity@latest login`, then create a project at sanity.io/manage (dataset `production`).
2. Copy `.env.example` → `.env.local`; fill `NEXT_PUBLIC_SANITY_PROJECT_ID` and a random `SANITY_REVALIDATE_SECRET`.
3. **Owner account:** the account that created the project is Administrator. Under *Members* invite nobody else (or only trusted editors). `/admin` forces Sanity login; non-members get no access. Keep the dataset **public read** (published content only) — drafts are never readable without a token, and the site never uses one.
4. `npm install && npm run dev` → site at `localhost:3000`, Studio at `localhost:3000/admin`.
5. In Studio: create **Site settings**, spaces (**Khya.thinks**, **Stellar**), then projects. Publish to make them public.

## 2. Content model
`siteSettings` (singleton) · `space` (reorderable via `order`, hide with `archived`) · `project` (`projectType`: video | script, referencing a space). Featured videos: tick *Feature on homepage* and set *Display order*; the first six by order show on the homepage.

## 3. Deploy to Netlify
1. Push to GitHub. Netlify → *Add new site → Import from Git*. Netlify auto-detects Next.js (`netlify.toml` sets the build command only; no SPA redirects).
2. Add the four env vars from `.env.example` in *Site configuration → Environment variables*.
3. Deploy. Add your domain under *Domain management*.
4. Sanity → API → **CORS origins**: add `https://yourdomain` and `http://localhost:3000` with credentials allowed (needed for Studio login).

## 4. Auto-update without redeploys
Sanity → API → Webhooks → create: URL `https://yourdomain/api/revalidate`, trigger on create/update/delete, **Secret** = your `SANITY_REVALIDATE_SECRET`, projection `{_type}`. Pages also revalidate hourly as a fallback.

## Notes
- Instagram embeds use the public `/reel/<id>/embed` iframe, with thumbnail + direct link fallback. Private/deleted Reels may not render.
- Deleting in Studio asks for confirmation natively.
