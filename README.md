# Clothing Shop - Full Stack E-Commerce Application

A modern, full-stack e-commerce platform built with **React**, **Express**, **TypeScript**, and **PostgreSQL**. Features a responsive frontend with Tailwind CSS, a robust REST API with Stripe payment integration, and independent backend/frontend applications for scalable development.

## 🎯 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **pnpm** 8+ (package manager)
- **PostgreSQL** 14+ (database)
- **Stripe Account** (for payment processing)

### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp ../.env.example .env.local

# 4. Start backend
pnpm run dev
```

**Backend runs on**: http://localhost:3000

### Frontend Setup

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
pnpm install

# 3. Start frontend
pnpm run dev
```

**Frontend runs on**: http://localhost:5173

---

## 📁 Project Structure

```
clothing-shop/
├── backend/                         # Backend application (independent)
│   ├── src/
│   │   ├── api-server/             # Express REST API
│   │   │   ├── index.ts           # Server entry point
│   │   │   ├── app.ts             # Express configuration
│   │   │   ├── logger.ts          # Pino logger setup
│   │   │   ├── routes/            # API endpoints
│   │   │   │   ├── health.ts      # Health check endpoint
│   │   │   │   └── checkout.ts    # Stripe checkout endpoint
│   │   │   ├── build.mjs          # esbuild configuration
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   ├── api-zod/                # Zod validation schemas
│   │   │   ├── api.ts             # Generated API schemas
│   │   │   ├── types/             # Type definitions
│   │   │   ├── index.ts
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   └── db/                     # Database layer
│   │       ├── index.ts           # Drizzle ORM setup
│   │       ├── schema.ts          # Database schema
│   │       ├── package.json
│   │       └── tsconfig.json
│   │
│   ├── package.json               # Backend workspace config
│   └── tsconfig.base.json         # Shared TypeScript config
│
├── frontend/                        # Frontend application (independent)
│   ├── src/
│   │   ├── app/                   # React application
│   │   │   ├── App.tsx            # Main router & providers
│   │   │   ├── components/        # Reusable UI components
│   │   │   │   ├── ui/           # Radix UI components
│   │   │   │   ├── navbar.tsx
│   │   │   │   ├── footer.tsx
│   │   │   │   ├── product-card.tsx
│   │   │   │   └── ...
│   │   │   └── main.tsx           # React entry point
│   │   │
│   │   └── api-client/            # API client
│   │       ├── api.ts            # API client setup
│   │       ├── custom-fetch.ts   # Custom fetch wrapper
│   │       └── index.ts
│   │
│   ├── public/                    # Static assets
│   ├── index.html                # HTML entry point
│   ├── package.json              # Frontend dependencies
│   ├── tsconfig.json             # TypeScript config
│   ├── vite.config.ts            # Vite configuration
│   ├── tailwind.config.ts         # Tailwind CSS config
│   └── components.json           # Shadcn/ui config
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
├── README.md                       # Main project overview
└── .env.example                   # Environment variables template
```

---

## 🚀 Core Applications

### Backend (api-server)
- **Location**: `backend/src/api-server/`
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

### Frontend (React App)
- **Location**: `frontend/src/app/`
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

#### API Validation (`backend/src/api-zod`)
Zod schemas for API request/response validation with:
- Generated API schemas
- Type definitions
- Validation utilities

#### Database (`backend/src/db`)
PostgreSQL database layer using Drizzle ORM with:
- Schema definitions
- Migration management
- Type-safe queries

### Frontend Shared Libraries

#### API Client (`frontend/src/api-client`)
API client setup with:
- Custom fetch wrapper
- Request/response handling
- Error management

---

## 🔧 Environment Variables

Create `.env.local` in each application directory:

### Backend (backend/.env.local)
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/clothing_shop
STRIPE_SECRET_KEY=sk_test_...
LOG_LEVEL=info
```

### Frontend (frontend/.env.local)
```env
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

### Backend

```bash
cd backend

# Install dependencies
pnpm install

# Development (builds and starts server)
pnpm run dev

# Build only
pnpm run build

# Start built server
pnpm run start

# Type checking
pnpm run typecheck
```

### Frontend

```bash
cd frontend

# Install dependencies
pnpm install

# Development
pnpm run dev

# Build
pnpm run build

# Preview built app
pnpm run serve

# Type checking
pnpm run typecheck
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│  frontend/src/app - Vite, Tailwind, Radix UI, React Query  │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Express)                          │
│  backend/src/api-server - TypeScript, Pino, Stripe         │
└────────────────────┬────────────────────────────────────────┘
                     │ SQL
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              Database (PostgreSQL)                          │
│  backend/src/db - Drizzle ORM, Schema Management           │
└─────────────────────────────────────────────────────────────┘

Shared Libraries:
├── backend/src/api-zod/ - Zod validation schemas
└── frontend/src/api-client/ - API client setup
```

---

## 🔄 Development Workflow

1. **Start Backend** → `cd backend && pnpm run dev`
2. **Start Frontend** → `cd frontend && pnpm run dev` (in another terminal)
3. **Implement Features** → Add routes/components as needed
4. **Test** → Run type checking and manual testing
5. **Deploy** → Build both applications separately

---

## 🚢 Deployment

### Backend Deployment
```bash
cd backend
pnpm install
pnpm run build
# Deploy dist/ folder to your server
# Set environment variables on server
# Run: PORT=3000 node --enable-source-maps ./src/api-server/dist/index.mjs
```

### Frontend Deployment
```bash
cd frontend
pnpm install
pnpm run build
# Deploy dist/ folder to CDN or static hosting
```

---

## 📝 Contributing

1. Create a feature branch
2. Make changes following the project structure
3. Test locally before submitting PR
4. Ensure type checking passes: `pnpm run typecheck`

---

## 📄 License

[Add your license here]

---

## 🤝 Support

For issues, questions, or contributions, please open an issue or contact the development team.

---

**Last Updated**: May 2026  
**Maintainers**: [Add team info]
