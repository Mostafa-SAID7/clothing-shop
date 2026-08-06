# Development Guidelines

Best practices and guidelines for developing the Clothing Shop application.

## Code Style

### TypeScript Best Practices

1. **Always use explicit types** for function parameters and return values:

```typescript
// ✓ Good
function getUserById(id: string): Promise<User> {
  return fetchUser(id);
}

// ✗ Bad
function getUserById(id) {
  return fetchUser(id);
}
```

2. **Use interfaces for objects**:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
```

3. **Avoid `any` type**:

```typescript
// ✓ Good
const data: Record<string, string> = {};

// ✗ Bad
const data: any = {};
```

### React Best Practices

1. **Use functional components**:

```typescript
// ✓ Good
const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return <div>{user.name}</div>;
};

// ✗ Bad - Class components
class UserCard extends React.Component {
  // ...
}
```

2. **Use hooks for state management**:

```typescript
// ✓ Good
const [count, setCount] = useState(0);

// ✗ Bad
this.state = { count: 0 };
```

3. **Extract props as interface**:

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  return <button className={`btn btn-${variant}`} {...props} />;
};
```

### Component Structure

Organize components in this order:

```typescript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Types/Interfaces
interface Props {
  id: string;
  onClose: () => void;
}

// 3. Constants
const DEFAULT_TIMEOUT = 5000;

// 4. Component
const MyComponent: React.FC<Props> = ({ id, onClose }) => {
  // State
  const [isOpen, setIsOpen] = useState(true);

  // Queries
  const { data } = useQuery(['item', id], () => fetchItem(id));

  // Effects
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, []);

  // Handlers
  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  // Render
  return <div>...</div>;
};

// 5. Exports
export default MyComponent;
```

## Naming Conventions

### Components

- PascalCase for component names
- Descriptive, noun-based names

```typescript
// ✓ Good
UserProfile, ProductCard, CheckoutForm

// ✗ Bad
userProfile, product_card, FormCheckout
```

### Functions and Variables

- camelCase
- Descriptive names

```typescript
// ✓ Good
const getUserData = async () => {};
const isValidEmail = (email: string) => {};

// ✗ Bad
const get_user_data = async () => {};
const valid = (email: string) => {};
```

### Constants

- UPPER_SNAKE_CASE for constants

```typescript
const MAX_RETRY_ATTEMPTS = 3;
const API_TIMEOUT = 5000;
```

## File Organization

### Component File

```
components/
└── UserProfile/
    ├── UserProfile.tsx      # Main component
    ├── UserProfile.module.css # Styles (if needed)
    ├── UserProfile.test.tsx # Tests (if applicable)
    ├── types.ts             # Type definitions
    ├── hooks.ts             # Custom hooks
    └── index.ts             # Exports
```

### Index File

```typescript
// components/UserProfile/index.ts
export { default as UserProfile } from './UserProfile';
export type * from './types';
export * from './hooks';
```

## CSS and Styling

### Tailwind CSS

1. **Use Tailwind utility classes** first:

```typescript
// ✓ Good
<div className="flex gap-4 p-4 bg-white rounded-lg shadow">

// ✗ Bad - Custom CSS
<div className="container">
  <style>{`
    .container {
      display: flex;
      gap: 1rem;
      ...
    }
  `}</style>
</div>
```

2. **Use `clsx` for conditional classes**:

```typescript
import clsx from 'clsx';

const className = clsx(
  'base-class',
  isActive && 'active-class',
  disabled && 'disabled-class'
);
```

3. **Extract complex utility combinations**:

```typescript
// ✓ Good - Use @apply in CSS
// styles.css
.card {
  @apply rounded-lg border border-gray-200 bg-white p-4 shadow;
}

// Or in component
const cardClasses = 'rounded-lg border border-gray-200 bg-white p-4 shadow';
<div className={cardClasses}>

// ✗ Bad - Repetitive classes
<div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
```

## State Management

### Local State

Use `useState` for local component state:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState<FormData>({ /* ... */ });
```

### Derived State

Don't duplicate state:

```typescript
// ✓ Good
const isDarkMode = theme === 'dark';

// ✗ Bad
const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
```

### Custom Hooks

Extract reusable logic into custom hooks:

```typescript
// hooks/useForm.ts
export function useForm<T>(initialData: T) {
  const [data, setData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return { data, handleChange };
}
```

## API Integration

### Using React Query

```typescript
import { useQuery } from '@tanstack/react-query';

function UserList() {
  const { data: users, isLoading, error } = useQuery(
    ['users'],
    () => fetchUsers(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Testing

### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render button text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Performance

### Memoization

Use `React.memo` for expensive components:

```typescript
const ProductCard = React.memo(
  ({ product }: { product: Product }) => {
    return <div>{product.name}</div>;
  },
  (prevProps, nextProps) => prevProps.product.id === nextProps.product.id
);
```

### Code Splitting

Use dynamic imports for large components:

```typescript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Avoid Unnecessary Re-renders

```typescript
// ✓ Good - useCallback memoizes function
const handleClick = useCallback(() => {
  doSomething();
}, []);

// ✗ Bad - New function on every render
const handleClick = () => {
  doSomething();
};
```

## Error Handling

### Try-Catch Pattern

```typescript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
```

### Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

## Git Workflow

### Branch Naming

- Feature: `feature/feature-name`
- Bug fix: `fix/bug-name`
- Hotfix: `hotfix/issue-name`
- Documentation: `docs/doc-name`

### Commit Messages

Use descriptive commit messages:

```
# ✓ Good
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login button styling issue"
git commit -m "docs: update setup guide"

# ✗ Bad
git commit -m "fix stuff"
git commit -m "update"
```

## Code Review Checklist

Before submitting a PR:

- [ ] Code follows style guidelines
- [ ] No console.log statements left
- [ ] All types are properly defined
- [ ] Components are properly exported
- [ ] No unused imports
- [ ] Comments explain complex logic
- [ ] Changes are tested
- [ ] Breaking changes documented

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Radix UI Documentation](https://www.radix-ui.com/)
