# Clothing Shop

A full-stack e-commerce app for a clothing shop, with a React + Vite frontend and an Express 5 backend following clean architecture.

## Run & Operate

- **Frontend** (port 5173): `cd frontend && pnpm run dev`
- **Backend API** (port 3001): `cd backend && pnpm run dev`
- Both run automatically via the configured Replit workflows.

### Database
- `cd backend && pnpm run db:push` — push schema changes to the dev database
- `cd backend && pnpm run db:studio` — open Drizzle Studio to inspect data
- `DATABASE_URL` is runtime-managed by Replit (auto-provisioned PostgreSQL)

### Auth & Secrets
- `JWT_SECRET` / `JWT_REFRESH_SECRET` — JWT signing keys (have in-code fallback defaults for dev)
- `STRIPE_SECRET_KEY` — required only when processing real payments

## Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS, shadcn/ui, Tanstack Query, Wouter, Framer Motion
- **Backend**: Express 5, TypeScript, Drizzle ORM + PostgreSQL, Zod validation, Pino logging
- **Auth**: JWT (access + refresh tokens), bcrypt password hashing
- **Payments**: Stripe checkout sessions

## Where things live

- `backend/src/domain/` — entities, repository interfaces, service interfaces
- `backend/src/application/use-cases/` — business logic / use cases
- `backend/src/infrastructure/` — DB connection, repository impls, Stripe/auth services
- `backend/src/presentation/` — Express routes, controllers, Zod request schemas
- `backend/src/infrastructure/database/schema.ts` — source of truth for DB schema
- `frontend/src/` — React pages and components

## Architecture decisions

- 4-layer clean architecture in the backend (Domain → Application → Infrastructure → Presentation)
- Dependency injection container pattern (`backend/src/infrastructure/container/`)
- Drizzle ORM with `db:push` (schema-first, no migration files in dev)
- Orval codegen planned for generating typed API hooks from an OpenAPI spec

## Product

An e-commerce clothing shop with product catalog browsing, user registration/login, shopping cart, and Stripe-powered checkout.

## What's implemented vs. in-progress

### ✅ Working
- Server boots and connects to the database
- User registration and login endpoints (JWT auth)
- Database schema (users, products, carts, orders, addresses, inventory)

### 🚧 In progress (from original repo)
- Product listing endpoint (`GET /api/products`) — use case wiring incomplete
- Cart management
- Order workflow

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `JWT_SECRET` / `JWT_REFRESH_SECRET` have in-code fallback defaults — the server starts without them, but set real values before going to production.
- `STRIPE_SECRET_KEY` is only loaded at payment time; the server starts fine without it.
- `DATABASE_URL` is runtime-managed by Replit — do not set it manually.

## Pointers

- See `backend/README.md` for the full backend architecture overview and next steps.
