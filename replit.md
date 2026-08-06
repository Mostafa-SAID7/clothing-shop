# HAVEN Fashion Store

A full-stack e-commerce app — React + Vite frontend, Express 5 API backend, PostgreSQL via Drizzle ORM, Stripe checkout, and JWT auth.

## Project structure

```
artifacts/
  haven/          — React 18 + Vite frontend (the storefront UI)
  api-server/     — Express 5 REST API (currently: health route; products/auth/stripe pending)
lib/
  db/             — Drizzle ORM schema and PostgreSQL client
  api-zod/        — Shared Zod schemas (request/response types)
  api-spec/       — OpenAPI spec (source for orval codegen)
  api-client-react/ — Generated React Query hooks (orval output)
scripts/          — Post-merge and utility scripts
```

## Run & Operate

Both services start automatically via Replit workflows:

- **Frontend** (`artifacts/haven`): `pnpm --filter @workspace/haven run dev`
- **Backend API** (`artifacts/api-server`): `pnpm --filter @workspace/api-server run dev`

### Database
- `pnpm --filter @workspace/db run push` — push schema to the database
- `DATABASE_URL` must be set (Replit built-in PostgreSQL or external, e.g. Supabase)

### Typecheck
- `pnpm run typecheck` — checks all workspace packages

## Stack

- **Frontend**: React 19, Vite 7, Tailwind CSS v4, shadcn/ui (Radix), TanStack Query, Wouter, Framer Motion
- **Backend**: Express 5, TypeScript, Drizzle ORM + PostgreSQL, Zod, Pino logging
- **Auth**: JWT (access + refresh tokens) — routes not yet wired in api-server
- **Payments**: Stripe checkout sessions — routes not yet wired in api-server

## Required secrets

| Secret | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `STRIPE_SECRET_KEY` | Stripe payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification |
| `JWT_SECRET` | JWT access token signing |
| `JWT_REFRESH_SECRET` | JWT refresh token signing |

## What's working vs. pending

### ✅ Working
- Frontend storefront UI (all pages: home, shop, product detail, cart, about, contact, checkout, success)
- API server health endpoint (`GET /api/healthz`)
- Database schema defined in `lib/db/src/schema/`
- Shared Zod types and API client codegen pipeline

### 🚧 Pending (follow-up task)
- Live product, auth, cart, and Stripe routes in `artifacts/api-server`
- Database provisioning and schema push
- Frontend wired to live API (currently uses static data in `artifacts/haven/src/lib/data.ts`)

## Gotchas

- Framer Motion `ease` cubic-bezier arrays must be cast as `[number, number, number, number]` tuples to satisfy the Framer Motion v12 type definitions.
- The frontend uses `import.meta.env.BASE_URL` as the Wouter router base — do not use root-relative API URLs; prefix with the base path.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._
