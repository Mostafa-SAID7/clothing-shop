# 🛍️ Clothing Shop - Full Stack E-Commerce Platform

[![Deployment Status](https://img.shields.io/badge/Vercel-Deployed-success?style=for-the-badge&logo=vercel)](https://clothing-shop-phi-eight.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.0-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Drizzle_ORM-4169E1?style=for-the-badge&logo=postgresql)](https://orm.drizzle.team/)
[![Stripe](https://img.shields.io/badge/Stripe-Integration-6772E5?style=for-the-badge&logo=stripe)](https://stripe.com/)

A production-ready, full-stack e-commerce web application engineered with modern clean architecture principles. It features a responsive React UI, a robust Express serverless REST API, PostgreSQL database management with Drizzle ORM, and integrated Stripe Checkout.

---

## 🌟 Live Demo & Architecture Overview

- **Live Web Application**: [https://clothing-shop-phi-eight.vercel.app/](https://clothing-shop-phi-eight.vercel.app/)
- **Health Endpoint**: [https://clothing-shop-phi-eight.vercel.app/api/healthz](https://clothing-shop-phi-eight.vercel.app/api/healthz)

```
                       ┌──────────────────────────────────────┐
                       │          Client Browser              │
                       └──────────────────┬───────────────────┘
                                          │
                                    Vercel Edge
                                          │
                      ┌───────────────────┴───────────────────┐
                      ▼                                       ▼
        ┌───────────────────────────┐           ┌───────────────────────────┐
        │     Frontend (React 18)   │           │      Backend (Express API)│
        │ Vite + Tailwind + Radix   │           │ Serverless Clean Arch     │
        └───────────────────────────┘           └─────────────┬─────────────┘
                                                              │
                                                        Drizzle ORM + SSL
                                                              │
                                                              ▼
                                                ┌───────────────────────────┐
                                                │   PostgreSQL Database     │
                                                │   (Prisma Postgres / SSL) │
                                                └───────────────────────────┘
```

---

## ⚡ Key Features

- **🛍️ Dynamic Product Catalog**: Filterable products, detailed view, category management, and inventory tracking.
- **🛒 Persistent Shopping Cart & Local Storage**: Fluid cart management with React Context.
- **💳 Stripe Checkout Integration**: Secure checkout sessions powered by Stripe API.
- **🔐 JWT Authentication & Authorization**: Access tokens, refresh tokens, role-based middleware.
- **🗄️ Drizzle ORM & PostgreSQL**: Type-safe queries, migration scripts, and serverless-optimized connection pooling.
- **🎨 Glassmorphism & UI Excellence**: Styled with Tailwind CSS, Radix UI primitives, dynamic animations, and dark mode support.
- **🚀 Unified Monorepo Vercel Deployment**: Deployed effortlessly via root `vercel.json` without routing conflicts or MIME type issues.

---

## 📁 Repository Structure

```
clothing-shop/
├── backend/                               # Express REST API (Clean Architecture)
│   ├── api/
│   │   └── index.ts                       # Vercel serverless function entrypoint
│   ├── src/
│   │   ├── application/                   # Use cases & application logic
│   │   ├── domain/                        # Entities & domain business rules
│   │   ├── infrastructure/                # Database pool, Drizzle ORM schema, logger, Stripe
│   │   └── presentation/                  # Express app, controllers, middlewares, routes
│   ├── drizzle.config.ts                  # Drizzle Kit migration configuration
│   ├── package.json                       # Backend dependencies
│   └── tsconfig.json                      # TypeScript build settings
│
├── frontend/                              # Client-side React Application
│   ├── src/
│   │   ├── app/                           # Main React router, components, contexts, pages
│   │   └── api-client/                    # Type-safe API client wrappers
│   ├── public/                            # Web assets & manifests
│   ├── package.json                       # Frontend dependencies
│   ├── vite.config.ts                     # Vite bundler configuration
│   └── tsconfig.json                      # Frontend TypeScript config
│
├── docs/                                  # Comprehensive Technical Documentation
│   ├── API.md                             # API Endpoints & Request/Response schemas
│   ├── ARCHITECTURE.md                    # Clean Architecture layers breakdown
│   ├── BACKEND.md                         # Backend setup & deployment guide
│   ├── DATABASE.md                        # Schema tables, ERD, and migration guide
│   ├── DEVELOPMENT.md                     # Local development guidelines
│   ├── FRONTEND.md                        # React UI component guide
│   └── GETTING_STARTED.md                 # Quick start guide
│
├── package.json                           # Workspace Root Package Configuration
├── pnpm-workspace.yaml                    # PNPM Monorepo Workspace Configuration
├── MIGRATION.sql                          # Raw SQL initialization & database seed
├── vercel.json                            # Vercel single-deployment routing & build setup
└── README.md                              # Main documentation hub
```

---

## ⚙️ Environment Variables

### Backend Configuration (`backend/.env` or Vercel Environment Variables)

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Database Connection (PostgreSQL)
DATABASE_URL=postgres://user:password@host:5432/postgres?sslmode=require

# Authentication Secrets
JWT_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key

# Payment Processing (Stripe)
STRIPE_SECRET_KEY=sk_test_51...
```

### Frontend Configuration (`frontend/.env`)

```env
# API Endpoint URL
VITE_API_URL=/api

# Stripe Public Key
VITE_STRIPE_PUBLIC_KEY=pk_test_51...
```

---

## 🛠️ Local Development & Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Mostafa-SAID7/clothing-shop.git
cd clothing-shop
```

### 2. Install Workspace Dependencies
```bash
pnpm install
```

### 3. Apply Database Migrations
```bash
cd backend
npx cross-env DATABASE_URL="<YOUR_POSTGRES_URL>" npx drizzle-kit push
```

### 4. Run Development Servers
- **Backend API**:
  ```bash
  cd backend
  pnpm run dev
  ```
- **Frontend App**:
  ```bash
  cd frontend
  pnpm run dev
  ```

Access the frontend app locally at `http://localhost:5173`.

---

## 🚢 Deployment on Vercel

This repository is optimized for single-project monorepo deployment on **Vercel**:

1. Connect your GitHub repository `Mostafa-SAID7/clothing-shop` to [Vercel](https://vercel.com).
2. Set the Environment Variables (`DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `VITE_API_URL`).
3. Deploy! Vercel will process `vercel.json`, automatically build the Vite React bundle and compile the Express serverless functions.

---

## 🌿 GitFlow & Conventional Commits Workflow

We strictly adhere to the **GitFlow** branching strategy and **Conventional Commits** standard to maintain clean repository history and reliable automated deployments.

### 🔀 Branching Strategy

```
    main      ─────────────────● (Production Releases)
                               ▲
                               │  (Hotfixes / Release PRs)
    develop   ──────●──────────●──────────● (Integration)
                    │                     ▲
                    └───────┐             │
                            ▼             │
    feature/*               ●─────────────┘ (Feature Branches)
```

| Branch | Purpose | Merge Target |
| :--- | :--- | :--- |
| `main` | Production-ready stable codebase. Auto-deploys to Vercel production environment. | `-` |
| `develop` | Integration branch for current sprint features. Auto-deploys to Staging. | `main` |
| `feature/<name>` | Isolated development of new functionality (e.g., `feature/stripe-webhooks`). | `develop` |
| `bugfix/<name>` | Resolving non-critical bugs found during QA. | `develop` |
| `hotfix/<name>` | Urgent patch applied directly for production issues. | `main` & `develop` |

---

### 📝 Conventional Commits Format

Every commit message follow the structure: `<type>(<scope>): <short summary>`

#### Standard Commit Types:
- `feat`: A new feature for the user (e.g., `feat(auth): implement refresh token rotation`)
- `fix`: A bug fix (e.g., `fix(db): enable SSL mode for serverless postgres pool`)
- `docs`: Documentation changes only (e.g., `docs(readme): add GitFlow guidelines`)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `style`: Formatting, missing semi-colons, white-space
- `chore`: Updating build tasks, package manager configs (e.g., `chore(deps): update drizzle-orm`)

#### Git Workflow Steps for Feature Development:

```bash
# 1. Checkout latest integration branch
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/cart-persistency

# 3. Work & Commit with Conventional Commits
git add .
git commit -m "feat(cart): implement localStorage synchronization hook"

# 4. Push & Open Pull Request
git push origin feature/cart-persistency
```

---

## 📄 License & Maintainers

- **License**: MIT
- **Author**: [Mostafa SAID](https://github.com/Mostafa-SAID7)
