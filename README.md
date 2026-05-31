# Prooforio MVP 0.1

Minimal Prooforio scaffold built with Next.js App Router, TypeScript, and Tailwind CSS.

## Start

```bash
npm install
npm run dev
```

## Routes

- `/` — Landing page
- `/login` — Login placeholder for future Google OAuth via Supabase
- `/dashboard` — User dashboard with profile summary and review list
- `/review/[username]` — Public review page with a feedback form

## Architecture

- `src/app/` — Next.js app routes
- `src/entities/` — domain entities (`profile`, `review`)
- `src/features/` — feature-specific UI modules
- `src/widgets/` — shared widgets like header
- `src/shared/` — reusable UI primitives and styles

## Documentation

- `PROJECT_OVERVIEW.html` — short overview of current product, routes, stack, structure, and export pipeline
- `STYLE_BUILDER_CONCEPT.html` — concept of a future style builder as a layer on top of the current template system
- `Тех долги.md` — current technical debt map with priorities and progress
