# 🛍️ Haven — Modern E-Commerce Platform

[![CI Pipeline](https://github.com/Mostafa-SAID7/clothing-shop/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Mostafa-SAID7/clothing-shop/actions/workflows/ci.yml)
[![GitFlow Enforced](https://img.shields.io/badge/GitFlow-Enforced-blue.svg)](docs/GITFLOW.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen.svg)](package.json)
[![pnpm Workspace](https://img.shields.io/badge/pnpm-workspace-orange.svg)](pnpm-workspace.yaml)

A state-of-the-art, full-stack clothing e-commerce web application featuring high-performance React 19 UI, express backend micro-services, Stripe payments, and PostgreSQL persistence with Drizzle ORM.

---

## ✨ Features & Visual Aesthetics

- 🎨 **Modern Design System**: Responsive layout, custom glassmorphism effects, smooth animations powered by Framer Motion & Tailwind CSS v4.
- ⚡ **Lightning Fast Frontend**: Built with Vite 7, React 19, Radix UI primitives, and React Query v5.
- 🛒 **Full Shopping Experience**: Dynamic catalog filtering, cart management, checkout with Stripe integration, and Order tracking.
- 🔐 **Secure Backend**: Express server architecture, JWT-based authentication, and pure JS bcrypt security.
- 🌊 **Strict GitFlow Workflow**: Automated branch enforcement and Conventional Commits CI checks.

---

## 🏗️ Monorepo Architecture

```
clothing-shop/
├── 📁 backend/                # Node.js & Express REST API (Drizzle ORM, Stripe, JWT)
│   ├── api/                   # Vercel serverless function entrypoints
│   └── src/                   # Backend application source code
├── 📁 frontend/               # React 19 + Vite frontend application
│   ├── public/                # Static assets, branding icons, and favicon
│   └── src/                   # React components, pages, and hooks
├── 📁 docs/                   # Comprehensive project documentation & guides
│   ├── BRANDING.md            # Branding and color tokens guide
│   ├── DESIGN_SYSTEM.md       # Complete design system & component guidelines
│   ├── DEVELOPMENT.md         # Developer onboarding & guidelines
│   ├── GITFLOW.md             # GitFlow branching strategy reference
│   └── PROJECT_STRUCTURE.md   # Architectural breakdown
└── 📁 .github/                # CI/CD workflows, ISSUE templates, security rules
```

---

## ⚡ Quick Start & Development

### 1. Prerequisites
- **Node.js**: `v24.x` recommended (minimum `>=18.x`)
- **pnpm**: `>=9.x` (or `npm`)

### 2. Installation
Clone the repository and install workspace dependencies:

```bash
git clone https://github.com/Mostafa-SAID7/clothing-shop.git
cd clothing-shop

# Install all workspace dependencies
pnpm install
```

### 3. Running Locally

Start the development server:

```bash
# Start frontend dev server (runs at http://localhost:5173)
cd frontend
pnpm dev

# Start backend dev server (runs at http://localhost:3001)
cd ../backend
pnpm dev
```

---

## 🌊 GitFlow Branching Model

This repository strictly enforces the **GitFlow** branching strategy:

```
main (production releases) ────────────────────────── [v1.0.0] ─── [v2.0.0]
    ▲                                                      ▲
    │                                                      │
develop (integration) ─────────────────────────────────────┴───────
    ▲                   ▲
    │                   │
feature/auth        bugfix/cart-item
```

- **`main`**: Production-ready code only. Changes enter via PRs from `release/*` or `hotfix/*`.
- **`develop`**: Integration branch for new features. Pull Requests for `feature/*` target `develop`.
- **Commit Convention**: We enforce [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`).

Detailed instructions are available in [docs/GITFLOW.md](docs/GITFLOW.md) and [CONTRIBUTING.md](.github/CONTRIBUTING.md).

---

## 📚 Documentation Index

Explore our in-depth guides in the [`docs/`](docs/) directory:

- 🎨 **[Design System](docs/DESIGN_SYSTEM.md)**: Visual aesthetics, typography, color palettes, and component rules.
- 🏷️ **[Branding Guide](docs/BRANDING.md)**: Logo specifications, favicon system, and brand guidelines.
- 🌊 **[GitFlow Model](docs/GITFLOW.md)**: Detailed release, hotfix, and feature branch workflows.
- 🏗️ **[Project Architecture](docs/PROJECT_STRUCTURE.md)**: Monorepo layout and state management logic.
- 🛠️ **[Setup & Development Guide](docs/SETUP.md)**: Step-by-step local environment configuration.

---

## 🛠️ Technology Stack

| Domain | Technologies |
|---|---|
| **Frontend** | React 19, Vite 7, TypeScript, Tailwind CSS v4, Radix UI, Framer Motion, Wouter, React Query v5 |
| **Backend** | Node.js 24, Express, Drizzle ORM, PostgreSQL, Stripe SDK, bcryptjs |
| **DevOps / CI** | GitHub Actions, Vercel Serverless, pnpm Workspaces, Semantic Release |

---

## 🤝 Contributing

We welcome contributions! Please review our [Contributing Guidelines](.github/CONTRIBUTING.md) and ensure all pull requests follow our GitFlow branch naming and Conventional Commit standards.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

