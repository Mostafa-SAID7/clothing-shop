# Folder Structure Guide

## Overview

This document explains the organization of the codebase and where to find specific types of files.

## Root Level

```
clothing-shop/
├── .devops/          # DevOps configurations (Docker, K8s, Terraform)
├── .github/          # GitHub workflows, issue templates, community files
├── .vscode/          # VS Code workspace settings
├── app/              # Next.js App Router (routes, layouts, API)
├── src/              # Source code (components, lib, styles)
├── public/           # Static assets
├── docs/             # Documentation
├── config/           # Configuration files
└── tests/            # Test files
```

## Source Code (`src/`)

### Components (`src/components/`)

Organized by type and feature:

```
src/components/
├── ui/               # Base UI components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── features/         # Feature-specific components
│   ├── cart/
│   ├── checkout/
│   └── products/
│       └── product-card.tsx
└── shared/           # Shared components
    └── layout/
```

**When to use:**

- `ui/` - Reusable, generic UI components
- `features/` - Components specific to a feature
- `shared/` - Components used across multiple features

### Library (`src/lib/`)

Core utilities and business logic:

```
src/lib/
├── api/              # API clients and services
├── config/           # App configuration
├── features/         # Feature flags (Statsig)
│   ├── flags.ts
│   └── statsig-client.tsx
├── hooks/            # Custom React hooks
│   └── use-toast.ts
├── types/            # TypeScript type definitions
│   └── types.ts
└── utils/            # Utility functions
    └── utils.ts
```

**When to use:**

- `api/` - External API integrations
- `config/` - Environment and app configuration
- `features/` - Feature flag logic
- `hooks/` - Reusable React hooks
- `types/` - Shared TypeScript types
- `utils/` - Pure utility functions

### Styles (`src/styles/`)

Global styles and theme configuration:

```
src/styles/
└── globals.css       # Global CSS styles
```

### Data (`src/data/`)

Static data and mock data:

```
src/data/
└── data.ts           # Product data, categories, etc.
```

## App Router (`app/`)

Next.js 13+ App Router structure:

```
app/
├── api/              # API routes
├── checkout/         # Checkout pages
├── success/          # Success pages
├── _examples/        # Example implementations
├── layout.tsx        # Root layout
└── page.tsx          # Home page
```

## Documentation (`docs/`)

Project documentation:

```
docs/
├── api/              # API documentation
├── guides/           # User guides
│   ├── feature-flags.md
│   ├── GETTING_STARTED.md
│   └── DEPLOYMENT.md
└── architecture/     # Architecture documentation
    ├── ARCHITECTURE.md
    ├── folder-structure.md
    └── overview.md
```

## DevOps (`.devops/`)

Infrastructure and deployment:

```
.devops/
├── docker/           # Docker configurations
├── kubernetes/       # Kubernetes manifests
├── terraform/        # Infrastructure as Code
├── scripts/          # Automation scripts
└── monitoring/       # Monitoring configs
```

## Path Aliases

Use these aliases in imports:

```typescript
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/features/products";
import { cn } from "@/lib/utils";
import { useToast } from "@/lib/hooks";
import type { Product } from "@/lib/types";
import { products } from "@/data";
```

## Best Practices

1. **Keep related files together** - Co-locate components with their styles and tests
2. **Use index files** - Export from index.ts for cleaner imports
3. **Follow naming conventions** - kebab-case for files, PascalCase for components
4. **Organize by feature** - Group by feature, not by file type
5. **Document as you go** - Update docs when adding new patterns

## Adding New Files

### New Component

```
src/components/features/[feature-name]/
├── [component-name].tsx
├── [component-name].test.tsx
└── index.ts
```

### New Hook

```
src/lib/hooks/
├── use-[hook-name].ts
├── use-[hook-name].test.ts
└── index.ts (update exports)
```

### New Utility

```
src/lib/utils/
├── [utility-name].ts
├── [utility-name].test.ts
└── index.ts (update exports)
```

## Migration Notes

- Old `lib/` files are being migrated to `src/lib/`
- Old `components/` files are being migrated to `src/components/`
- Old `hooks/` files are being migrated to `src/lib/hooks/`
- Update imports when moving files
- Use path aliases for new imports
