# Style Haven

A modern e-commerce clothing store where users can browse products, filter by category, manage a shopping cart, and checkout via Stripe.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/style-haven run dev` — run the frontend (port varies)
- `pnpm run typecheck` — full typecheck across all packages
- Required env: `STRIPE_SECRET_KEY` — Stripe secret key for checkout
- Optional env: `VITE_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key (frontend)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, wouter (routing), shadcn/ui
- API: Express 5 + Stripe
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/style-haven/src/pages/` — Home, Checkout, Success pages
- `artifacts/style-haven/src/components/` — ProductCard, CartDrawer
- `artifacts/style-haven/src/lib/` — types, utils, data (products)
- `artifacts/api-server/src/routes/checkout.ts` — Stripe checkout session API
- `artifacts/style-haven/src/index.css` — Tailwind v4 theme (HSL CSS vars)

## Architecture decisions

- Next.js → Vite + React migration: replaced `next/navigation` with wouter, `next/image` with `<img>`, API routes moved to Express
- Stripe key initialized lazily per-request to avoid server crash when key is not set
- Cart state is persisted to localStorage and passed between pages via localStorage
- Products are stored as static data (no DB needed for this catalog)

## Product

Users can browse 4 clothing categories (T-Shirts, Jeans, Hoodies, Jackets), search by name, add items to cart with size/color selection, and checkout via Stripe.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Stripe checkout requires `STRIPE_SECRET_KEY` set as a secret. Without it, the /api/create-checkout-session route returns a 500 error but the rest of the app works fine.
- Cart is persisted in localStorage — shared between Home and Checkout pages.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
