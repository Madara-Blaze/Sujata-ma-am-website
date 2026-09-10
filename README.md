# Sidenote

A marketplace where working teachers pick up freelance tutoring side-gigs in
what they already teach. "Sidenote" is a working brand name, isolated to
[`src/config/site.ts`](src/config/site.ts) — renaming the platform is a
one-line change there.

This is a fully independent project — it does not share a codebase, brand,
or domain with any other site.

## Stack

Next.js 15 (App Router) + React 19 + TypeScript, Tailwind CSS (CSS-variable
theming), Framer Motion for scroll/interaction animation, React Three Fiber
+ three.js for the 3D hero scene, and an optional Supabase backend that
falls back to bundled seed data with zero configuration.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The app runs fully on seed data
(`src/data/tutors.ts`) out of the box — no environment variables required.

To point it at a real Supabase project instead, copy `.env.example` to
`.env.local`, fill in the Supabase values, set `DATA_SOURCE=supabase`, and
apply `supabase/migrations/0001_init.sql`.

## Design system

The visual language is "notebook": warm paper background, a red margin
rule, index cards, sticky notes, and a handwriting display font (Caveat)
paired with Work Sans for body copy. Theme tokens live in
[`src/app/globals.css`](src/app/globals.css) and
[`tailwind.config.ts`](tailwind.config.ts).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint
