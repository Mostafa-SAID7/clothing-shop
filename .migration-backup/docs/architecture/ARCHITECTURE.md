# Project Architecture

## 📁 Directory Structure

```
clothing-shop/
├── .devops/                    # DevOps & Infrastructure
│   ├── docker/                # Docker configurations
│   ├── kubernetes/            # K8s manifests
│   ├── terraform/             # Infrastructure as Code
│   ├── scripts/               # Automation scripts
│   └── monitoring/            # Monitoring configs
│
├── .github/                    # GitHub configurations
│   ├── workflows/             # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   └── *.md                   # Community files
│
├── app/                        # Next.js App Router
│   ├── (routes)/              # Route groups
│   ├── api/                   # API routes
│   └── _examples/             # Example implementations
│
├── src/                        # Source code
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── features/         # Feature-specific components
│   │   └── shared/           # Shared components
│   ├── lib/                   # Core utilities
│   │   ├── api/              # API clients
│   │   ├── config/           # Configuration
│   │   ├── features/         # Feature flags
│   │   ├── hooks/            # Custom React hooks
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   ├── styles/                # Global styles
│   └── data/                  # Static data
│
├── public/                     # Static assets
│   ├── images/
│   └── fonts/
│
├── docs/                       # Documentation
│   ├── api/                   # API documentation
│   ├── guides/                # User guides
│   └── architecture/          # Architecture docs
│
├── tests/                      # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── config/                     # Configuration files
    ├── eslint/
    ├── typescript/
    └── tailwind/
```

## 🏗️ Architecture Principles

### 1. **Feature-Based Organization**

- Group related files by feature, not by type
- Each feature is self-contained and reusable

### 2. **Clear Separation of Concerns**

- UI components in `src/components`
- Business logic in `src/lib`
- API routes in `app/api`
- DevOps in `.devops`

### 3. **Type Safety**

- All types centralized in `src/lib/types`
- Shared types exported from index files

### 4. **Configuration Management**

- Environment-specific configs
- Feature flags for gradual rollouts
- Centralized configuration files

### 5. **Documentation**

- Code documentation inline
- Architecture docs in `/docs`
- API docs auto-generated

## 📦 Module Organization

### Components

```
src/components/
├── ui/              # Base UI components (shadcn/ui)
├── features/        # Feature-specific components
│   ├── cart/
│   ├── checkout/
│   └── products/
└── shared/          # Shared across features
    ├── layout/
    ├── navigation/
    └── forms/
```

### Library

```
src/lib/
├── api/             # API clients & services
├── config/          # App configuration
├── features/        # Feature flags (Statsig)
├── hooks/           # Custom React hooks
├── types/           # TypeScript definitions
└── utils/           # Utility functions
```

## 🔄 Data Flow

1. **User Interaction** → Component
2. **Component** → Hook/Service
3. **Hook/Service** → API Client
4. **API Client** → External API
5. **Response** → State Management
6. **State** → Component Re-render

## 🎯 Best Practices

1. **Naming Conventions**
   - Components: PascalCase
   - Files: kebab-case
   - Functions: camelCase
   - Constants: UPPER_SNAKE_CASE

2. **Import Order**
   - React/Next.js imports
   - Third-party libraries
   - Internal modules
   - Types
   - Styles

3. **File Structure**
   - One component per file
   - Co-locate tests with source
   - Index files for clean exports

4. **Code Organization**
   - Keep files under 300 lines
   - Extract complex logic to hooks
   - Use composition over inheritance
