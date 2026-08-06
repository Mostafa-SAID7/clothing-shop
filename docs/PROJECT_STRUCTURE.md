# Project Structure

This document describes the organization and purpose of each directory and file in the Clothing Shop project.

## Root Directory

```
clothing-shop/
├── frontend/                 # React frontend application
├── docs/                     # Project documentation
├── .github/                  # GitHub configuration and workflows
│   ├── workflows/            # CI/CD workflow files
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/       # Issue templates
├── .gitignore                # Git ignore patterns
├── README.md                 # Project overview
├── LICENSE                   # MIT License
├── CONTRIBUTING.md           # Contribution guidelines
└── package.json              # Root package configuration (optional)
```

## Frontend Directory

```
frontend/
├── src/                      # Source code
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── layout/          # Layout components
│   │   ├── pages/           # Page components
│   │   └── [feature]/       # Feature-specific components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and helpers
│   │   ├── api.ts           # API client functions
│   │   └── utils.ts         # General utilities
│   ├── styles/              # Global styles
│   │   └── globals.css      # Global CSS
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Exported types
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Application entry point
│   └── env.d.ts             # Environment variable types
├── public/                   # Static assets
│   ├── images/              # Image files
│   ├── icons/               # Icon files
│   └── [other-assets]/      # Other static files
├── .replit-artifact/        # Replit artifact configuration
├── index.html               # HTML entry point
├── package.json             # Project dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── components.json          # shadcn/ui components configuration
```

## Documentation Directory

```
docs/
├── SETUP.md                  # Setup and installation guide
├── PROJECT_STRUCTURE.md      # This file
├── DEVELOPMENT.md            # Development guidelines and best practices
├── COMPONENTS.md             # Component documentation
├── API.md                    # API integration documentation
└── FAQ.md                    # Frequently asked questions
```

## GitHub Directory

```
.github/
├── workflows/
│   ├── build.yml             # Build and test workflow
│   └── [other-workflows]/    # Additional workflows
├── PULL_REQUEST_TEMPLATE.md  # PR template
└── ISSUE_TEMPLATE/
    ├── bug_report.md         # Bug report template
    ├── feature_request.md    # Feature request template
    └── [other-templates]/    # Additional templates
```

## Key Files Explanation

### Root Level Files

- **README.md** - Project overview, setup instructions, and links to documentation
- **LICENSE** - MIT License for the project
- **CONTRIBUTING.md** - Guidelines for contributing to the project
- **.gitignore** - Files and directories to ignore in git

### Frontend Files

- **package.json** - Project dependencies, scripts, and metadata
- **vite.config.ts** - Vite build tool configuration
- **tsconfig.json** - TypeScript compiler options
- **components.json** - shadcn/ui component configuration
- **index.html** - HTML entry point for the application
- **src/main.tsx** - JavaScript entry point
- **src/App.tsx** - Root React component

### Documentation Files

- **SETUP.md** - Complete setup and installation instructions
- **PROJECT_STRUCTURE.md** - This file, describing the project layout
- **DEVELOPMENT.md** - Development guidelines and best practices
- **COMPONENTS.md** - Component library documentation
- **API.md** - API integration and communication
- **FAQ.md** - Common questions and answers

## Component Organization

### Components Structure

```
src/components/
├── ui/                       # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── MainLayout.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ProductPage.tsx
│   ├── CheckoutPage.tsx
│   └── ...
└── [feature-name]/
    ├── FeatureComponent.tsx
    ├── FeatureList.tsx
    └── FeatureItem.tsx
```

## Naming Conventions

### Files and Directories

- **Components**: PascalCase (e.g., `UserProfile.tsx`, `ProductCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`, `useFetch.ts`)
- **Utils**: camelCase (e.g., `formatPrice.ts`, `validateEmail.ts`)
- **Types**: PascalCase (e.g., `User.ts`, `Product.ts`)
- **Directories**: kebab-case (e.g., `product-card/`, `user-profile/`)

### TypeScript Types

- **Types/Interfaces**: PascalCase with `I` prefix for interfaces (optional)
  ```typescript
  interface IUser {
    id: string;
    name: string;
  }
  ```

## File Size Guidelines

- Keep components under 300 lines
- Extract large components into smaller ones
- Use custom hooks to separate logic

## Import Organization

Organize imports in this order:

```typescript
// 1. External libraries
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal components
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';

// 3. Internal hooks
import { useAuth } from '@/hooks/useAuth';

// 4. Types
import type { User } from '@/types';

// 5. Utils
import { formatPrice } from '@/lib/utils';

// 6. Styles
import styles from './Component.module.css';
```

## Asset Organization

- **Images**: `/public/images/` - organized by feature/page
- **Icons**: `/public/icons/` - SVG icons
- **Fonts**: `/public/fonts/` - custom fonts
- **Other**: `/public/` - other static assets

## Environment Variables

Store environment-specific variables in `.env.local`:

```env
VITE_API_URL=http://localhost:3000
VITE_API_KEY=your-api-key
```

Access them in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Build Output

After building, the distribution files are in:

```
frontend/dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── ...
```

## For More Information

- [Setup Guide](./SETUP.md)
- [Development Guidelines](./DEVELOPMENT.md)
- [Component Documentation](./COMPONENTS.md)
