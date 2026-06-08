# NORM Studio Portfolio

Replicated from your Figma Make design using a production-ready stack.

## Stack

- Next.js (App Router)
- tRPC v11 + React Query
- Prisma ORM + PostgreSQL
- Local image storage (`public/projects/`)
- Motion (`motion/react`)

## Setup

1. `pnpm install`
2. Copy `.env.example` to `.env` and fill in your PostgreSQL credentials.
3. `pnpm db:generate`
4. `pnpm db:push`
5. Add project images under `public/projects/<slug>/` (e.g. `public/projects/d02-lounge/`)
6. `pnpm db:seed`
7. `pnpm dev`

## Project images

Images are stored locally on disk, not in Supabase Storage:

- Place files in `public/projects/<project-slug>/`
- Supported formats: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`
- Run `pnpm db:seed` after adding or changing images so the database URLs stay in sync
- The first image in each folder becomes the hero image

## Routes

- `/` Home
- `/projects` Work index
- `/projects/[slug]` Project detail
- `/about`
- `/contact`

## Deployment

- Set env vars from `.env.example` on your server.
- Project images must be deployed alongside the app in `public/projects/`.
- Build command: `pnpm build`
- Start command: `pnpm start`