# Setup Guide

This guide will help you set up the Clothing Shop project for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (comes with Node.js) or **pnpm**
  - npm verification: `npm --version`
  - pnpm installation: `npm install -g pnpm`
  - pnpm verification: `pnpm --version`

- **Git** (for version control)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/clothing-shop.git
cd clothing-shop
```

### 2. Navigate to Frontend Directory

```bash
cd frontend
```

### 3. Install Dependencies

Using npm:
```bash
npm install
```

Or using pnpm:
```bash
pnpm install
```

### 4. Verify Installation

Run the type checker to ensure everything is set up correctly:
```bash
npm run typecheck
# or
pnpm typecheck
```

## Configuration

### Environment Variables

If your application requires environment variables, create a `.env.local` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000
# Add other variables as needed
```

### IDE Setup

#### Visual Studio Code (Recommended)

Install these extensions for better development experience:

- **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
- **Prettier - Code formatter** (esbenp.prettier-vscode)
- **TypeScript Vue Plugin (Volar)** (Vue.volar)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)

Create a `.vscode/settings.json` in the project root:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Running the Application

### Development Server

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

The application will be available at:
- Local: `http://localhost:5173`
- Network: `http://[your-ip]:5173`

### Building for Production

Create an optimized production build:

```bash
npm run build
# or
pnpm build
```

The build output will be in the `dist` directory.

### Preview Production Build

Test the production build locally:

```bash
npm run serve
# or
pnpm serve
```

### Type Checking

Run TypeScript type checker:

```bash
npm run typecheck
# or
pnpm typecheck
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a port:

```bash
npm run dev -- --port 3000
```

### Dependencies Installation Issues

If you encounter dependency installation issues:

1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` and lock files:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Try using a different package manager (pnpm):
   ```bash
   pnpm install
   ```

### TypeScript Errors

If you see TypeScript errors:

1. Ensure TypeScript is installed: `npm install -g typescript`
2. Verify the TypeScript version: `tsc --version`
3. Clear TypeScript cache and rebuild

### Module Not Found Errors

If you see "module not found" errors:

1. Check the import path is correct
2. Ensure the file exists
3. Verify the `@` alias in `vite.config.ts` points to `src`
4. Reinstall dependencies: `npm install`

## Next Steps

- Read the [Project Structure](./PROJECT_STRUCTURE.md) guide
- Check out [Development Guidelines](./DEVELOPMENT.md)
- Review [Component Documentation](./COMPONENTS.md)

## Getting Help

If you need help:

1. Check the [FAQ](./FAQ.md)
2. Review existing [GitHub Issues](https://github.com/yourusername/clothing-shop/issues)
3. Create a new issue with the bug report template

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
