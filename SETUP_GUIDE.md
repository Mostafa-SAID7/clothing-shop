# Setup & Run Guide

## Project Structure

```
clothing-shop/
├── backend/
│   └── src/
│       ├── api-server/          # Express API server
│       │   ├── package.json
│       │   ├── tsconfig.json
│       │   ├── build.mjs
│       │   ├── app.ts
│       │   ├── index.ts
│       │   ├── logger.ts
│       │   ├── routes/
│       │   └── middlewares/
│       ├── api-spec/            # OpenAPI specification
│       │   ├── package.json
│       │   ├── openapi.yaml
│       │   └── orval.config.ts
│       ├── api-zod/             # Zod validation schemas
│       │   ├── package.json
│       │   ├── tsconfig.json
│       │   ├── index.ts
│       │   └── generated/
│       └── db/                  # Database layer
│           ├── package.json
│           ├── tsconfig.json
│           ├── drizzle.config.ts
│           ├── index.ts
│           └── schema/
│
├── frontend/
│   ├── src/
│   │   ├── app/                 # React application
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── hooks/
│   │   │   └── lib/
│   │   └── api-client/          # Generated React Query hooks
│   │       ├── index.ts
│   │       ├── custom-fetch.ts
│   │       └── generated/
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── index.html
│
└── docs/
```

## Backend Setup

### Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL 14+

### Installation

```bash
cd backend/src/api-server
pnpm install
```

### Environment Variables

Create `.env.local` in `backend/src/api-server/`:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/clothing_shop
STRIPE_SECRET_KEY=sk_test_...
```

### Run Backend

```bash
cd backend/src/api-server
pnpm run dev
```

**Backend runs on**: http://localhost:3000

### Available Commands

```bash
# Development
pnpm run dev

# Build
pnpm run build

# Start production
pnpm run start

# Type checking
pnpm run typecheck
```

## Frontend Setup

### Prerequisites
- Node.js 18+
- pnpm 8+

### Installation

```bash
cd frontend
pnpm install
```

### Run Frontend

```bash
cd frontend
pnpm run dev
```

**Frontend runs on**: http://localhost:5173

### Available Commands

```bash
# Development
pnpm run dev

# Build
pnpm run build

# Preview production build
pnpm run serve

# Type checking
pnpm run typecheck
```

## Database Setup

### Apply Migrations

```bash
cd backend/src/db
pnpm install
pnpm run push
```

### Force Apply Migrations

```bash
cd backend/src/db
pnpm run push-force
```

## API Code Generation

### Generate API Client

```bash
cd backend/src/api-spec
pnpm install
pnpm run codegen
```

This generates:
- Zod schemas in `backend/src/api-zod/src/generated/`
- React Query hooks in `frontend/src/api-client/generated/`

## Running Both Apps

### Terminal 1 - Backend

```bash
cd backend/src/api-server
pnpm install
pnpm run dev
```

### Terminal 2 - Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

### Terminal 3 - Database (if needed)

```bash
cd backend/src/db
pnpm install
pnpm run push
```

## Troubleshooting

### Backend won't start

1. Check PORT is available
2. Verify DATABASE_URL is set
3. Ensure PostgreSQL is running
4. Check Node version: `node --version` (should be 18+)

### Frontend won't start

1. Check port 5173 is available
2. Clear node_modules: `rm -rf node_modules && pnpm install`
3. Check Node version: `node --version` (should be 18+)

### Database connection fails

1. Verify PostgreSQL is running
2. Check DATABASE_URL format
3. Ensure database exists
4. Test connection: `psql $DATABASE_URL`

## Project Status

✅ Backend - Ready to run from `backend/src/api-server/`
✅ Frontend - Ready to run from `frontend/`
✅ Database - Ready to configure
✅ API Spec - Ready to generate code

---

**Last Updated**: May 2026
