# NORM Studio Portfolio

Replicated from your Figma Make design using a production-ready stack.

## Stack

- Next.js (App Router)
- tRPC v11 + React Query
- Prisma ORM
- Supabase Postgres
- Motion (`motion/react`)

## Setup

1. `pnpm install`
2. Copy `.env.example` to `.env.local` and fill credentials.
3. `pnpm db:generate`
4. `pnpm db:push`
5. `pnpm db:seed`
6. `pnpm dev`

## Routes

- `/` Home
- `/projects` Work index
- `/projects/[slug]` Project detail
- `/about`
- `/contact`

## Vercel deployment

- Set all env vars from `.env.example` in Vercel Project Settings.
- Build command: `pnpm build`
- Install command: `pnpm install`
- Output: default Next.js output