# Frontend Setup & Architecture Guide

Complete guide for the React frontend application (`style-haven`).

## 📋 Table of Contents

1. [Overview](#overview)
2. [Setup & Installation](#setup--installation)
3. [Project Structure](#project-structure)
4. [Running the Application](#running-the-application)
5. [Routing](#routing)
6. [State Management](#state-management)
7. [Components](#components)
8. [Styling](#styling)
9. [Forms & Validation](#forms--validation)
10. [API Integration](#api-integration)
11. [Building & Deployment](#building--deployment)

---

## Overview

The frontend is a **React 18** single-page application built with:
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component library
- **Wouter** - Lightweight client-side router
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **TanStack React Query** - Server state management
- **Framer Motion** - Animations

**Port**: 5173 (configurable in Vite config)

---

## Setup & Installation

### Prerequisites
- Node.js 18+
- pnpm 8+

### Installation Steps

```bash
# 1. Navigate to frontend directory
cd clothing-shop/style-haven

# 2. Install dependencies (from root, pnpm handles workspaces)
cd ../..
pnpm install

# 3. Environment setup (optional)
# Frontend uses default API URL: http://localhost:3000/api
# To customize, create .env.local in style-haven/
VITE_API_URL=http://localhost:3000/api
```

---

## Project Structure

```
style-haven/
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Main router & providers
│   ├── pages/                # Page components (routes)
│   │   ├── home.tsx
│   │   ├── shop.tsx
│   │   ├── product-detail.tsx
│   │   ├── checkout.tsx
│   │   ├── success.tsx
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   ├── privacy.tsx
│   │   ├── terms.tsx
│   │   └── not-found.tsx
│   ├── components/           # Reusable components
│   │   ├── ui/              # Radix UI components (55+)
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── auth-modal.tsx
│   │   ├── cart-drawer.tsx
│   │   └── ...
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── LangContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   └── ...
│   ├── lib/                 # Utilities & helpers
│   │   ├── api.ts           # API client setup
│   │   ├── utils.ts         # Helper functions
│   │   └── types.ts         # TypeScript types
│   └── styles/              # Global styles
│       └── globals.css
├── public/                  # Static assets
├── dist/                    # Build output (generated)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## Running the Application

### Development Mode

```bash
cd style-haven
pnpm run dev
```

**Output**:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Access at: http://localhost:5173

**Features**:
- Hot Module Replacement (HMR) - Changes reflect instantly
- Source maps - Easy debugging
- Fast refresh - Preserves component state

### Production Build

```bash
cd style-haven
pnpm run build
```

Generates optimized build in `dist/` directory:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

### Preview Production Build

```bash
cd style-haven
pnpm run serve
```

Serves the production build locally for testing.

### Type Checking

```bash
cd style-haven
pnpm run typecheck
```

Validates TypeScript without building.

---

## Routing

The application uses **Wouter** for lightweight client-side routing.

### Route Configuration

Located in `src/App.tsx`:

```typescript
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/product/:slug" component={ProductDetail} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/success" component={SuccessPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

### Available Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page |
| `/shop` | ShopPage | Product catalog |
| `/product/:slug` | ProductDetail | Individual product page |
| `/checkout` | CheckoutPage | Checkout form |
| `/success` | SuccessPage | Order confirmation |
| `/about` | AboutPage | About company |
| `/contact` | ContactPage | Contact form |
| `/privacy` | PrivacyPage | Privacy policy |
| `/terms` | TermsPage | Terms of service |
| `*` | NotFound | 404 page |

### Using Links

```typescript
import { Link } from "wouter";

export function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`}>
      <a className="hover:underline">{product.name}</a>
    </Link>
  );
}
```

### Programmatic Navigation

```typescript
import { useLocation } from "wouter";

export function CheckoutButton() {
  const [, setLocation] = useLocation();
  
  const handleCheckout = () => {
    setLocation("/checkout");
  };
  
  return <button onClick={handleCheckout}>Proceed to Checkout</button>;
}
```

---

## State Management

The application uses **React Context** for global state management.

### AuthContext

Manages user authentication state.

**Location**: `src/contexts/AuthContext.tsx`

**Usage**:
```typescript
import { useAuth } from "@/hooks/useAuth";

export function UserProfile() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <button onClick={login}>Login</button>;
  }
  
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### CartContext

Manages shopping cart state.

**Location**: `src/contexts/CartContext.tsx`

**Usage**:
```typescript
import { useCart } from "@/hooks/useCart";

export function CartSummary() {
  const { items, total, addItem, removeItem } = useCart();
  
  return (
    <div>
      <p>Items: {items.length}</p>
      <p>Total: ${total}</p>
    </div>
  );
}
```

### ThemeContext

Manages light/dark theme.

**Location**: `src/contexts/ThemeContext.tsx`

**Usage**:
```typescript
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current: {theme}
    </button>
  );
}
```

### LangContext

Manages language/localization.

**Location**: `src/contexts/LangContext.tsx`

**Usage**:
```typescript
import { useLang } from "@/hooks/useLang";

export function LanguageSelector() {
  const { lang, setLang } = useLang();
  
  return (
    <select value={lang} onChange={(e) => setLang(e.target.value)}>
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
}
```

---

## Components

### UI Components (Radix UI)

Located in `src/components/ui/`, includes 55+ pre-built components:

- **Buttons**: Button, IconButton
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Toggle
- **Dialogs**: Dialog, AlertDialog, Drawer
- **Menus**: DropdownMenu, ContextMenu, NavigationMenu
- **Data Display**: Table, Tabs, Accordion, Collapsible
- **Feedback**: Toast, Progress, Skeleton
- **Overlays**: Popover, Tooltip, HoverCard
- **Layout**: Separator, ScrollArea

**Example Usage**:
```typescript
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Sign In</Button>
      </DialogContent>
    </Dialog>
  );
}
```

### Custom Components

#### Navbar
```typescript
import { Navbar } from "@/components/navbar";

// Displays logo, navigation links, cart icon, user menu
```

#### Footer
```typescript
import { Footer } from "@/components/footer";

// Displays company info, links, social media
```

#### AuthModal
```typescript
import { AuthModal } from "@/components/auth-modal";

// Login/signup modal
```

#### CartDrawer
```typescript
import { CartDrawer } from "@/components/cart-drawer";

// Slide-out cart sidebar
```

### Creating New Components

**Best Practice**:
```typescript
import { FC } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
}) => {
  return (
    <div className={cn("rounded-lg shadow-md p-4")}>
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <h3 className="mt-2 font-semibold">{name}</h3>
      <p className="text-gray-600">${price}</p>
    </div>
  );
};
```

---

## Styling

The application uses **Tailwind CSS** for styling with a custom component library.

### Tailwind Configuration

Located in `tailwind.config.ts`:

```typescript
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom colors
      },
      spacing: {
        // Custom spacing
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/vite"),
  ],
};
```

### Utility Classes

```typescript
// Basic styling
<div className="bg-white p-4 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
  <p className="text-gray-600 mt-2">Description</p>
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>

// Dark mode
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

### CSS Modules (Optional)

For component-scoped styles:

```typescript
import styles from "./ProductCard.module.css";

export function ProductCard() {
  return <div className={styles.card}>...</div>;
}
```

---

## Forms & Validation

The application uses **React Hook Form** with **Zod** for validation.

### Basic Form Example

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be 8+ characters"),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register("email")}
          placeholder="Email"
          type="email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Input
          {...register("password")}
          placeholder="Password"
          type="password"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <Button type="submit">Login</Button>
    </form>
  );
}
```

### Checkout Form Example

```typescript
const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(5),
  city: z.string().min(1),
  zipCode: z.string().regex(/^\d{5}$/),
  cardNumber: z.string().regex(/^\d{16}$/),
});

type CheckoutData = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutData) => {
    // Submit to backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

---

## API Integration

The frontend uses **TanStack React Query** with generated hooks from the OpenAPI spec.

### Generated Hooks

Located in `lib/api-client-react/src/generated/`:

```typescript
import { useGetProducts, useCreateCheckoutSession } from "@workspace/api-client-react";

export function ProductList() {
  const { data: products, isLoading, error } = useGetProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {products?.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

### Mutations

```typescript
import { useCreateCheckoutSession } from "@workspace/api-client-react";

export function CheckoutButton() {
  const { mutate: createSession, isPending } = useCreateCheckoutSession();

  const handleCheckout = () => {
    createSession({
      items: [{ productId: "123", quantity: 1, price: 2999 }],
      successUrl: "http://localhost:5173/success",
      cancelUrl: "http://localhost:5173/checkout",
    });
  };

  return (
    <button onClick={handleCheckout} disabled={isPending}>
      {isPending ? "Processing..." : "Checkout"}
    </button>
  );
}
```

### Error Handling

```typescript
import { useGetProducts } from "@workspace/api-client-react";

export function ProductList() {
  const { data, isLoading, error, isError } = useGetProducts();

  if (isLoading) return <Skeleton />;
  
  if (isError) {
    return (
      <div className="bg-red-50 p-4 rounded">
        <p className="text-red-800">Failed to load products</p>
        <p className="text-sm text-red-600">{error?.message}</p>
      </div>
    );
  }

  return <ProductGrid products={data} />;
}
```

---

## Building & Deployment

### Production Build

```bash
cd style-haven
pnpm run build
```

**Output**: `dist/` directory with optimized files

### Build Analysis

```bash
# Install rollup-plugin-visualizer
pnpm add -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from "rollup-plugin-visualizer";

export default {
  plugins: [visualizer()],
};

# Build and view analysis
pnpm run build
# Open dist/stats.html
```

### Deployment Options

#### Static Hosting (Vercel, Netlify, GitHub Pages)

```bash
# Build
pnpm run build

# Deploy dist/ folder
# Vercel: vercel deploy
# Netlify: netlify deploy --prod --dir=dist
```

#### Docker

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
WORKDIR /app/style-haven
RUN pnpm run build

FROM nginx:alpine
COPY --from=builder /app/style-haven/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Environment Variables for Production

Create `.env.production`:

```env
VITE_API_URL=https://api.example.com/api
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

---

## Performance Optimization

### Code Splitting

Vite automatically code-splits at route boundaries:

```typescript
import { lazy, Suspense } from "react";

const ProductDetail = lazy(() => import("./pages/product-detail"));

export function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductDetail />
    </Suspense>
  );
}
```

### Image Optimization

```typescript
// Use responsive images
<img
  src={image}
  alt="Product"
  className="w-full h-auto"
  loading="lazy"
/>

// Or use picture element for multiple formats
<picture>
  <source srcSet={webp} type="image/webp" />
  <img src={fallback} alt="Product" />
</picture>
```

### Bundle Analysis

```bash
pnpm run build
# Check dist/ size
du -sh dist/
```

---

## Troubleshooting

### Port already in use

```bash
# Use different port
pnpm run dev -- --port 5174
```

### API connection errors

**Error**: `Failed to fetch from http://localhost:3000/api`

**Solution**:
1. Ensure backend is running on port 3000
2. Check VITE_API_URL in .env.local
3. Verify CORS is enabled on backend

### Build errors

```bash
# Clear cache and rebuild
rm -rf node_modules dist
pnpm install
pnpm run build
```

---

## Next Steps

- [Backend Setup](./BACKEND.md)
- [Database Schema](./DATABASE.md)
- [API Reference](./API.md)
- [Development Workflow](./DEVELOPMENT.md)
