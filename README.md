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
