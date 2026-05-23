# Contributing to STYLE HAVEN

Thank you for your interest in contributing to STYLE HAVEN! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a `.env` file with required environment variables
5. Start the development server: `npm run dev`

## Code Style

This project uses:

- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** (recommended) for code formatting

Run linting before committing:

```bash
npm run lint
```

## Project Structure Guidelines

- Place reusable UI components in `components/ui/`
- Place feature-specific components in `components/`
- Keep business logic in `lib/`
- API routes go in `app/api/`
- Pages go in `app/` following Next.js App Router conventions

## Making Changes

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes thoroughly
4. Run linting: `npm run lint`
5. Commit with clear messages: `git commit -m "Add: feature description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

## Commit Message Guidelines

Use clear, descriptive commit messages:

- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for updates to existing features
- `Refactor:` for code refactoring
- `Docs:` for documentation changes
- `Style:` for formatting changes

Example: `Add: product filtering by price range`

## Adding New Features

### Adding Products

Edit `lib/data.ts` and follow the existing product structure:

```typescript
{
  id: number,
  name: string,
  price: number,
  image: string,
  category: string,
  isNew: boolean,
  description: string,
  sizes: string[],
  colors: { name: string, hex: string }[],
  stock: number
}
```

### Adding Categories

Update the `categories` array in `lib/data.ts` and ensure products use the new category.

### Adding UI Components

Use shadcn/ui components when possible. To add a new component:

```bash
npx shadcn-ui@latest add [component-name]
```

## Testing

Before submitting a PR:

- Test all user flows (browse, add to cart, checkout)
- Verify responsive design on mobile and desktop
- Check for TypeScript errors: `npm run build`
- Test with Stripe test cards

## Pull Request Process

1. Ensure your code follows the project's code style
2. Update documentation if needed
3. Describe your changes clearly in the PR description
4. Link any related issues
5. Wait for review and address feedback

## Questions?

If you have questions, feel free to open an issue for discussion.

Thank you for contributing!
