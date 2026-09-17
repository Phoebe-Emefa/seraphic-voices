# Seraphic Voices of Toronto

Public website for the choir. Content is edited in Sanity Studio at `/admin`.

## Setup

This project uses **pnpm**.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Required env (local files `.env*.local`):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (use `revamp` locally/preview; keep production Vercel on `production` until cutover)
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `EMAIL`
- `EMAIL_PASS`

There is no default dataset. A missing `NEXT_PUBLIC_SANITY_DATASET` will fail instead of writing to production.

To isolate the revamp without touching live content:

```bash
pnpm exec sanity dataset copy production revamp
```

The CLI reads `NEXT_PUBLIC_SANITY_PROJECT_ID` from `.env.local` via `sanity.cli.ts`. You must be logged in (`pnpm exec sanity login`).

Then set local/preview `NEXT_PUBLIC_SANITY_DATASET=revamp`. Fill the **Home** and **Events page** singleton documents in `/admin` (fixed ids `home` and `eventsPage`). Cutover is a rebuild that points production at `revamp`.

```bash
pnpm build
pnpm start
pnpm lint
```
