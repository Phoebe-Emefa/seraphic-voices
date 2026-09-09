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
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `EMAIL`
- `EMAIL_PASS`

```bash
pnpm build
pnpm start
pnpm lint
```
