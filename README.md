# Oluwadamilola John Joseph, Portfolio & CV

A Next.js 15 portfolio and CV for a Business Analyst and Agile Delivery Specialist. Built with TypeScript, Tailwind CSS, Framer Motion and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

Standard Next.js app (server-rendered, not a static export), so it deploys cleanly to Vercel or Netlify.

## Content

- Personal details, experience, skills, certifications, education, leadership, contact facts: `data/site.ts`
- Case studies: `data/projects.ts`
- Downloads metadata: `data/downloads.ts` (only describe files that actually exist in `public/downloads`)

Everything on the site is sourced from the resume provided. There are no placeholder sections, invented testimonials, or claimed certifications/skills beyond what is on the CV.

## Downloads

1. Copy a file into `public/downloads/`.
2. Optionally add a friendly title, description and category in `data/downloads.ts` (categories: `Resume`, `Case Studies`, `References`).
3. Run `npm run build` (runs `scripts/generate-downloads-manifest.mjs`, which scans the folder for filename, size and last-updated date automatically). Files tagged `References` also appear at the top of `/references`.

The Downloads page also automatically pulls in every reference letter and every Certificates/Skills/Experience entry that has a document attached (uploaded via `/admin/references` or `/admin/content`), so visitors have one place to find every real document on the site, not just the ones in `public/downloads`.

## Live visitor counter

A small floating badge in the hero (next to the "Focus" badge, visible on tablet/desktop) shows a running count of site visits.

**1. Create the table and counting function.** Supabase SQL Editor:

```sql
create table public.site_stats (
  id int primary key,
  visits bigint not null default 0,
  constraint single_row check (id = 1)
);

insert into public.site_stats (id, visits) values (1, 0);

create or replace function public.increment_visits()
returns bigint
language plpgsql
security definer
as $$
declare
  new_count bigint;
begin
  update public.site_stats set visits = visits + 1 where id = 1 returning visits into new_count;
  return new_count;
end;
$$;

alter table public.site_stats enable row level security;

create policy "Public can read site stats"
  on public.site_stats for select
  to public
  using (true);

grant execute on function public.increment_visits() to anon;
```

**2. Done.** No new environment variables needed.

**Honest limitation**: this counts once per browser session (so refreshing or navigating between pages doesn't inflate it), but since it has to be callable by any visitor with no login, a determined person could still call the increment endpoint directly and inflate the number. That's an accepted trade-off for a lightweight counter like this, not a real analytics platform, if you need tamper-proof numbers later, a proper analytics service (Vercel Analytics, Plausible, etc.) is the right tool instead.

## Contact form

Falls back to opening the visitor's email client (`mailto:`) by default. To receive submissions directly:

1. Create a free account at [web3forms.com](https://web3forms.com) and get an access key.
2. Set `NEXT_PUBLIC_WEB3FORMS_KEY` in your environment.
3. Redeploy. The form now POSTs to Web3Forms instead of opening mail.

Update `data/site.ts` with a real `calendlyUrl` to show a "Book a call directly" button on `/contact`, and edit `relocation` / `sponsorship` to reflect your actual situation, these are personal facts only you can confirm accurately.

## Testimonials / recommendation system (Supabase)

A real, moderated recommendation system: visitors submit a rating and recommendation, it is held for review, and only appears publicly once approved. No sample or fabricated testimonials are included, the section is honestly empty until real ones are approved.

**1. Create a Supabase project** (free tier is enough) at [supabase.com](https://supabase.com).

**2. Run this SQL** in the Supabase SQL editor to create the table and lock it down with row-level security:

```sql
create extension if not exists "pgcrypto";

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  role text,
  company text,
  linkedin_url text,
  rating int not null check (rating between 1 and 5),
  recommendation text not null,
  email text,
  approved boolean not null default false
);

alter table public.testimonials enable row level security;

-- Anyone can submit a new testimonial (always starts unapproved).
create policy "Public can insert testimonials"
  on public.testimonials for insert
  to anon
  with check (approved = false);

-- Anyone can read only testimonials that have been approved.
create policy "Public can read approved testimonials"
  on public.testimonials for select
  to anon
  using (approved = true);

-- No public update or delete policy is created, so only the service role
-- (used by the admin API routes below) can approve or remove submissions.
```

**3. Set these environment variables** (Project Settings > API in Supabase for the URL and keys):

| Variable | Where to find it | Exposed to browser? |
|---|---|---|
| `SUPABASE_URL` | Project URL | No, server-only |
| `SUPABASE_ANON_KEY` | `anon` `public` key | No, server-only (used inside API routes, never sent to the client) |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key | No, server-only, keep this secret |
| `ADMIN_SECRET` | Any password you choose | No, server-only |

**4. Moderate submissions** by visiting `/admin/testimonials` on your deployed site, entering the `ADMIN_SECRET` you set, and approving or rejecting each pending recommendation. The page is excluded from search engines and sitemaps. This is a lightweight, personal-site-appropriate gate (a shared secret compared server-side), not enterprise SSO, keep the secret private and treat the URL as unlisted rather than fully public-proof.

**Spam protection included:** a hidden honeypot field on the form (bots that fill every input trip it and are silently ignored) plus server-side validation of field lengths and the rating range. For heavier spam traffic later, consider adding Cloudflare Turnstile or hCaptcha to the form.

Until these environment variables are set, the Testimonials section shows an honest "not connected yet" message instead of erroring.

## Uploadable content (Certificates, Skills, Work Experience)

A single admin page at `/admin/content` (same `ADMIN_SECRET` as the other two admin pages) lets you add a certificate, skill, or work experience entry with a name, description, tools used, and an optional document or picture. It appears immediately on the matching public page (`/certifications`, `/skills`, `/experience`), underneath the existing curated content, nothing gets overwritten.

Testimonials and References aren't in this same form, they already have their own purpose-built flows (`/admin/testimonials` for moderated visitor submissions, `/admin/references` for PDF letters), and the content page will point you to those if you pick either from the dropdown, rather than duplicating the same data in two places.

**1. Create the table.** Supabase SQL Editor:

```sql
create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  section text not null check (section in ('certificates','skills','experience')),
  name text not null,
  description text,
  tools text,
  file_name text,
  image_name text,
  display_order int not null default 0
);

alter table public.content_items enable row level security;

create policy "Public can read content items"
  on public.content_items for select
  to public
  using (true);
```

No public insert policy is needed, every write goes through the admin API route using your service role key, the same pattern as the testimonials moderation and reference letters features.

**2. Create the storage bucket.** Supabase dashboard → **Storage** → **New bucket** → name it exactly `content-uploads` → leave "Public bucket" unchecked → Create.

**3. Done.** No new environment variables needed, this reuses `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_SECRET` that are already set up.

## Reference letters (Supabase Storage)

Upload real, signed reference-letter PDFs from an admin page, they appear on `/references` immediately, downloadable with one tap. No public upload, no moderation queue needed, since only you can reach the admin page.

**1. Create a Storage bucket.** In your Supabase dashboard: **Storage** (left sidebar) → **New bucket** → name it exactly `reference-letters` → leave **Public bucket** unchecked (keep it private) → Create.

That's it, no SQL, no RLS policies to write. Every upload, download and delete goes through your own API routes using the `SUPABASE_SERVICE_ROLE_KEY` you already set up for testimonials, the bucket itself never needs to be public. Downloads are served through short-lived signed URLs (1 hour) generated on each page load.

**2. Upload letters** at `/admin/references`, same `ADMIN_SECRET` password as the testimonials admin page. PDF, JPG, PNG or WEBP, up to 10MB per file.

**3. Done.** Approved letters show up automatically on `/references`, no extra config.

## Skills

The Skills page and data (`data/site.ts` -> `skillGroups`) intentionally only lists tools and methods that are actually on the CV. UK BA/Agile job ads frequently list BPMN, UML, SAFe, PRINCE2, Azure DevOps, GitHub, Visio, Draw.io, Figma, RAID logs, RACI, and similar. None were added here because they aren't evidenced on the resume, claiming them risks a bad moment in an interview. If any of these are genuinely familiar (even briefly used), add them to the relevant group in `data/site.ts` with an honest label, the pattern for marking something still developing is already there (see the `(in progress)` suffix handling in `components/skills-panel.tsx`).

## SEO

- `app/layout.tsx` sets Open Graph, Twitter Card, JSON-LD (`Person`) metadata and a canonical URL.
- `app/opengraph-image.tsx` generates the social preview image at build time (no external image dependency).
- `app/sitemap.ts` and `app/robots.ts` are wired up and exclude `/admin` and `/api` from crawling.
- Set `NEXT_PUBLIC_SITE_URL` to your real production domain once deployed.

## Deploy to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. Import it in Vercel (auto-detects Next.js).
3. Set `NEXT_PUBLIC_SITE_URL`, and optionally `NEXT_PUBLIC_WEB3FORMS_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_SECRET`.
4. Deploy.

## Performance & accessibility, honestly

Image optimization is enabled (Vercel/Netlify both support Next's image pipeline), animations respect `prefers-reduced-motion`, there's a skip-to-content link, visible focus rings, and semantic landmarks throughout. This is a solid good-faith pass, not a certified WCAG 2.2 AA audit or a verified Lighthouse score, neither can be produced without running real audit tooling against a live deployment, which is worth doing once this is deployed.

## Notes on images

No stock photography or invented product screenshots. The only photo is the real headshot provided (`public/images/profile/oluwadamilola.png`), used in the hero and About page. Project covers are original SVG/gradient artwork generated in code. If real product screenshots become available later, drop them into `public/images/projects/` and swap them into `components/project-cover.tsx`.
