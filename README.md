# Clothing Shop - Full Stack E-Commerce Application

A modern, full-stack e-commerce platform built with **React**, **Express**, **TypeScript**, and **PostgreSQL**. Features a responsive frontend with Tailwind CSS, a robust REST API with Stripe payment integration, and a monorepo architecture for scalable development.

## 🎯 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **pnpm** 8+ (package manager)
- **PostgreSQL** 14+ (database)
- **Stripe Account** (for payment processing)

### Installation & Setup

```bash
# 1. Clone and navigate to project
cd clothing-shop

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Initialize database
cd lib/db
pnpm run push
cd ../..

# 5. Generate API client code
cd lib/api-spec
pnpm run codegen
cd ../..

# 6. Start backend (Terminal 1)
cd api-server
pnpm run dev

# 7. Start frontend (Terminal 2)
cd style-haven
pnpm run dev
```

**Frontend**: http://localhost:5173  
**Backend**: http://localhost:3000

---

## 📁 Project Structure

```
clothing-shop/
├── backend/                         # Backend workspace (self-contained)
│   ├── api-server/                 # Express REST API
│   │   ├── src/
│   │   │   ├── index.ts           # Server entry point
│   │   │   ├── app.ts             # Express configuration
│   │   │   ├── routes/            # API endpoints
│   │   │   └── lib/               # Utilities (logger, etc.)
│   │   ├── build.mjs              # esbuild configuration
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── api-spec/                   # OpenAPI 3.1.0 specification
│   ├── api-zod/                    # Generated Zod validation schemas
│   ├── db/                         # Drizzle ORM & database schema
│   └── package.json               # Backend workspace config
│
├── frontend/                        # Frontend workspace (self-contained)
│   ├── style-haven/               # React frontend application
│   │   ├── src/
│   │   │   ├── App.tsx            # Main router & providers
│   │   │   ├── pages/             # Page components
│   │   │   ├── components/        # Reusable UI components
│   │   │   ├── contexts/          # React Context (Auth, Cart, Theme, Lang)
│   │   │   ├── hooks/             # Custom React hooks
│   │   │   ├── lib/               # Utilities & helpers
│   │   │   └── main.tsx           # React entry point
│   │   ├── public/                # Static assets
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   ├── api-client-react/          # Generated React Query hooks
│   └── package.json               # Frontend workspace config
│
├── docs/                           # Documentation
│   ├── INDEX.md                   # Documentation index
│   ├── GETTING_STARTED.md         # Quick start guide
│   ├── BACKEND.md                 # Backend setup & API guide
│   ├── FRONTEND.md                # Frontend setup & architecture
│   ├── DATABASE.md                # Database schema & migrations
│   ├── API.md                     # API endpoints reference
│   ├── DEVELOPMENT.md             # Development workflow
│   └── ARCHITECTURE.md            # System design overview
│
├── pnpm-workspace.yaml            # Root monorepo workspace config
├── tsconfig.base.json             # Shared TypeScript config
├── README.md                       # Main project overview
└── .env.example                   # Environment variables template
```

---

## 🚀 Core Applications

### Backend (api-server)
- **Location**: `backend/api-server/`
- **Framework**: Express 5.2.1
- **Language**: TypeScript (compiled to ESM)
- **Logging**: Pino with HTTP middleware
- **Payments**: Stripe integration
- **Database**: PostgreSQL with Drizzle ORM
- **Port**: 3000 (configurable via PORT env var)

**Key Endpoints**:
- `GET /api/healthz` - Health check
- `POST /api/create-checkout-session` - Stripe checkout

[→ Backend Documentation](./docs/BACKEND.md)

### Frontend (style-haven)
- **Location**: `frontend/style-haven/`
- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS + Radix UI
- **Routing**: Wouter (lightweight client-side router)
- **State**: React Context (Auth, Cart, Theme, Language)
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: TanStack React Query
- **Port**: 5173 (configurable via Vite)

**Key Pages**:
- `/` - Home
- `/shop` - Product catalog
- `/product/:slug` - Product details
- `/checkout` - Checkout form
- `/success` - Order confirmation

[→ Frontend Documentation](./docs/FRONTEND.md)

---

## 📚 Shared Libraries

### Backend Shared Libraries

#### API Specification (`backend/api-spec`)
Single source of truth for API contract using OpenAPI 3.1.0. Automatically generates:
- Zod validation schemas (`backend/api-zod`)
- React Query hooks (`frontend/api-client-react`)

#### Database (`backend/db`)
PostgreSQL database layer using Drizzle ORM with:
- Schema definitions
- Migration management
- Type-safe queries

#### API Validation (`backend/api-zod`)
Zod schemas for API request/response validation (auto-generated from OpenAPI spec)

### Frontend Shared Libraries

#### React API Client (`frontend/api-client-react`)
Generated React Query hooks for API calls (auto-generated from OpenAPI spec)

---

## 🔧 Environment Variables

Create `.env.local` in the root directory:

```env
# Backend
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/clothing_shop
STRIPE_SECRET_KEY=sk_test_...

# Frontend (optional)
VITE_API_URL=http://localhost:3000/api
```

See `.env.example` for all available options.

---

## 📖 Documentation

- **[Backend Setup & API](./docs/BACKEND.md)** - Server configuration, endpoints, and deployment
- **[Frontend Setup & Architecture](./docs/FRONTEND.md)** - UI components, state management, and styling
- **[Database Schema](./docs/DATABASE.md)** - Tables, relationships, and migrations
- **[API Reference](./docs/API.md)** - Complete endpoint documentation
- **[Development Workflow](./docs/DEVELOPMENT.md)** - Local development, testing, and debugging
- **[System Architecture](./docs/ARCHITECTURE.md)** - Design patterns and system overview

---

## 🛠️ Common Commands

### Development
```bash
# Start backend
cd backend/api-server && pnpm run dev

# Start frontend
cd frontend/style-haven && pnpm run dev

# Type checking
pnpm run typecheck:all

# Generate API client code
cd backend/api-spec && pnpm run codegen
```

### Database
```bash
# Apply migrations
cd backend/db && pnpm run push

# Force apply migrations
cd backend/db && pnpm run push-force
```

### Production
```bash
# Build backend
cd backend/api-server && pnpm run build

# Build frontend
cd frontend/style-haven && pnpm run build

# Start production backend
cd backend/api-server && pnpm run start
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│  style-haven/ - Vite, Tailwind, Radix UI, React Query     │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Express)                          │
│  api-server/ - TypeScript, Pino, Stripe, Drizzle ORM      │
└────────────────────┬────────────────────────────────────────┘
                     │ SQL
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              Database (PostgreSQL)                          │
│  lib/db/ - Drizzle ORM, Schema Management                  │
└─────────────────────────────────────────────────────────────┘

Shared Libraries (Monorepo):
├── lib/api-spec/ - OpenAPI 3.1.0 specification
├── lib/api-client-react/ - Generated React Query hooks
├── lib/api-zod/ - Generated Zod schemas
└── lib/db/ - Database layer
```

---

## 🔄 Development Workflow

1. **Update API Spec** → Edit `lib/api-spec/openapi.yaml`
2. **Generate Code** → Run `pnpm run codegen` in `lib/api-spec`
3. **Implement Backend** → Add routes in `api-server/src/routes`
4. **Implement Frontend** → Use generated hooks in `style-haven/src`
5. **Test** → Run type checking and manual testing
6. **Deploy** → Build and deploy both applications

---

## 🚢 Deployment

### Backend Deployment
```bash
cd api-server
pnpm run build
# Deploy dist/ folder to your server
# Set environment variables on server
# Run: node --enable-source-maps ./dist/index.mjs
```

### Frontend Deployment
```bash
cd style-haven
pnpm run build
# Deploy dist/ folder to CDN or static hosting
```

---

## 📝 Contributing

1. Create a feature branch
2. Make changes following the project structure
3. Update API spec if adding new endpoints
4. Run `pnpm run codegen` to update generated code
5. Test locally before submitting PR

---

## 📄 License

[Add your license here]

---

## 🤝 Support

For issues, questions, or contributions, please open an issue or contact the development team.

---

**Last Updated**: May 2026  
**Maintainers**: [Add team info]
