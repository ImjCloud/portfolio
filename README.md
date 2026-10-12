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

The Downloads page also automatically pulls in every reference letter and every Certificates/Skills/Experience entry that has a document attached (uploaded via `/admin/references` or `/admin/content`ֻǱ˞