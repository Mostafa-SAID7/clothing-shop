# Development Workflow Guide

Complete guide for local development, testing, and debugging.

## 📋 Table of Contents

1. [Initial Setup](#initial-setup)
2. [Running the Full Stack](#running-the-full-stack)
3. [Development Workflow](#development-workflow)
4. [Debugging](#debugging)
5. [Testing](#testing)
6. [Code Quality](#code-quality)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## Initial Setup

### One-Time Setup

```bash
# 1. Clone repository
git clone https://github.com/Mostafa-SAID7/clothing-shop
cd clothing-shop

# 2. Install dependencies
pnpm install

# 3. Create environment file
cp .env.example .env.local

# 4. Edit .env.local with your settings
# Set DATABASE_URL, STRIPE_SECRET_KEY, etc.

# 5. Initialize database
cd lib/db
pnpm run push
cd ../..

# 6. Generate API client code
cd lib/api-spec
pnpm run codegen
cd ../..
```

### Verify Setup

```bash
# Check Node version
node --version  # Should be 18+

# Check pnpm version
pnpm --version  # Should be 8+

# Check PostgreSQL
psql --version  # Should be 14+

# Test database connection
psql $DATABASE_URL -c "SELECT 1"
```

---

## Running the Full Stack

### Terminal 1: Backend

```bash
cd api-server
pnpm run dev
```

**Expected Output**:
```
[timestamp] INFO: Server listening on port 3000
```

**Endpoints**:
- Health: http://localhost:3000/api/healthz
- API Base: http://localhost:3000/api

### Terminal 2: Frontend

```bash
cd style-haven
pnpm run dev
```

**Expected Output**:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

**Access**: http://localhost:5173

### Terminal 3: Database (Optional)

```bash
# Monitor database changes
cd lib/db
pnpm run push --watch  # If supported
```

### All Together (One Terminal)

```bash
# From root directory
pnpm run dev:all  # If script exists in root package.json
```

---

## Development Workflow

### Adding a New Feature

#### 1. Update API Specification

Edit `lib/api-spec/openapi.yaml`:

```yaml
paths:
  /products:
    get:
      operationId: getProducts
      tags: [products]
      summary: Get all products
      responses:
        "200":
          description: List of products
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Product"

components:
  schemas:
    Product:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        price:
          type: number
      required:
        - id
        - name
        - price
```

#### 2. Generate API Client Code

```bash
cd lib/api-spec
pnpm run codegen
```

This generates:
- React Query hooks in `lib/api-client-react/src/generated/`
- Zod schemas in `lib/api-zod/src/generated/`

#### 3. Update Database Schema (if needed)

Edit `lib/db/src/schema/index.ts`:

```typescript
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  // ... other fields
});
```

Apply migration:

```bash
cd lib/db
pnpm run push
```

#### 4. Implement Backend Route

Create `api-server/src/routes/products.ts`:

```typescript
import { Router } from "express";
import { db } from "@workspace/db";
import { products } from "@workspace/db/schema";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allProducts = await db.select().from(products);
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
```

Register in `api-server/src/routes/index.ts`:

```typescript
import productsRouter from "./products";

router.use("/products", productsRouter);
```

#### 5. Implement Frontend Component

Create `style-haven/src/pages/shop.tsx`:

```typescript
import { useGetProducts } from "@workspace/api-client-react";

export default function ShopPage() {
  const { data: products, isLoading, error } = useGetProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products?.map(product => (
        <div key={product.id} className="border rounded p-4">
          <h3>{product.name}</h3>
          <p>${product.price / 100}</p>
        </div>
      ))}
    </div>
  );
}
```

#### 6. Test

- Backend: `curl http://localhost:3000/api/products`
- Frontend: Navigate to `/shop` and verify products display

---

## Debugging

### Backend Debugging

#### Using Console Logs

```typescript
import { logger } from "./lib/logger";

logger.info({ data }, "Processing request");
logger.error({ err }, "Error occurred");
```

#### Using VS Code Debugger

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Backend Debug",
      "program": "${workspaceFolder}/api-server/src/index.ts",
      "preLaunchTask": "build",
      "outFiles": ["${workspaceFolder}/api-server/dist/**/*.js"],
      "sourceMaps": true
    }
  ]
}
```

#### Using Postman/Insomnia

Test API endpoints:

```bash
# Health check
curl http://localhost:3000/api/healthz

# Get products
curl http://localhost:3000/api/products

# Create checkout
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"items": [{"productId": "1", "quantity": 1, "price": 2999}]}'
```

### Frontend Debugging

#### React DevTools

1. Install [React DevTools](https://react-devtools-tutorial.vercel.app/) browser extension
2. Open DevTools (F12)
3. Go to "Components" tab
4. Inspect component tree and props

#### Using Console

```typescript
// Log component renders
useEffect(() => {
  console.log("Component mounted");
  return () => console.log("Component unmounted");
}, []);

// Log state changes
const [count, setCount] = useState(0);
useEffect(() => {
  console.log("Count changed:", count);
}, [count]);
```

#### Using Debugger

```typescript
// Add breakpoint
debugger;

// Or use VS Code debugger
// Create .vscode/launch.json for Chrome debugging
```

#### Network Tab

1. Open DevTools (F12)
2. Go to "Network" tab
3. Make API calls
4. Inspect requests/responses

### Database Debugging

#### Query Logs

```bash
# Connect to database
psql $DATABASE_URL

# View recent queries
SELECT query, calls, mean_time FROM pg_stat_statements 
ORDER BY mean_time DESC LIMIT 10;

# View table structure
\d products

# View table data
SELECT * FROM products LIMIT 10;
```

#### Using Drizzle Studio

```bash
cd lib/db
pnpm run studio
```

Opens web UI to browse database.

---

## Testing

### Unit Tests (Backend)

Create `api-server/src/routes/__tests__/products.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app";

describe("Products API", () => {
  it("should return list of products", async () => {
    const response = await request(app)
      .get("/api/products")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return 404 for invalid product", async () => {
    await request(app)
      .get("/api/products/999")
      .expect(404);
  });
});
```

Run tests:

```bash
cd api-server
pnpm run test
```

### Component Tests (Frontend)

Create `style-haven/src/components/__tests__/ProductCard.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { ProductCard } from "../ProductCard";

describe("ProductCard", () => {
  it("renders product name", () => {
    render(
      <ProductCard
        id="1"
        name="T-Shirt"
        price={2999}
        image="/image.jpg"
      />
    );

    expect(screen.getByText("T-Shirt")).toBeInTheDocument();
  });

  it("displays price correctly", () => {
    render(
      <ProductCard
        id="1"
        name="T-Shirt"
        price={2999}
        image="/image.jpg"
      />
    );

    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });
});
```

Run tests:

```bash
cd style-haven
pnpm run test
```

### Integration Tests

Test full flow from frontend to backend:

```typescript
describe("Checkout Flow", () => {
  it("should complete checkout", async () => {
    // 1. Add product to cart
    // 2. Navigate to checkout
    // 3. Fill form
    // 4. Submit
    // 5. Verify success page
  });
});
```

---

## Code Quality

### Type Checking

```bash
# Check all packages
pnpm run typecheck:all

# Or individually
cd api-server && pnpm run typecheck
cd ../style-haven && pnpm run typecheck
```

### Linting

```bash
# If ESLint is configured
pnpm run lint

# Fix issues
pnpm run lint:fix
```

### Code Formatting

```bash
# If Prettier is configured
pnpm run format

# Check formatting
pnpm run format:check
```

### Pre-commit Hooks

Set up Husky for automatic checks:

```bash
# Install Husky
pnpm add -D husky

# Initialize
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "pnpm run typecheck:all && pnpm run lint"
```

---

## Common Tasks

### Adding a New Page

1. Create component in `style-haven/src/pages/new-page.tsx`
2. Add route in `style-haven/src/App.tsx`
3. Add navigation link in navbar

### Adding a New API Endpoint

1. Update `lib/api-spec/openapi.yaml`
2. Run `pnpm run codegen` in `lib/api-spec`
3. Implement route in `api-server/src/routes/`
4. Use generated hook in frontend

### Updating Database Schema

1. Edit `lib/db/src/schema/index.ts`
2. Run `pnpm run push` in `lib/db`
3. Update backend queries
4. Update API spec if needed

### Resetting Database

```bash
# Drop all tables and recreate
cd lib/db
pnpm run push-force
```

### Clearing Cache

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear build artifacts
rm -rf api-server/dist style-haven/dist
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000  # Backend
lsof -i :5173  # Frontend

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 pnpm run dev  # Backend
pnpm run dev -- --port 5174  # Frontend
```

### Database Connection Issues

```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check credentials
echo $DATABASE_URL

# Verify PostgreSQL is running
pg_isready -h localhost -p 5432
```

### API Not Responding

```bash
# Check if backend is running
curl http://localhost:3000/api/healthz

# Check logs in backend terminal
# Look for error messages

# Restart backend
# Ctrl+C in backend terminal, then pnpm run dev
```

### Frontend Not Loading

```bash
# Check if frontend is running
curl http://localhost:5173

# Check browser console for errors
# F12 → Console tab

# Clear browser cache
# Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)

# Restart frontend
# Ctrl+C in frontend terminal, then pnpm run dev
```

### Type Errors After Changes

```bash
# Regenerate API client code
cd lib/api-spec
pnpm run codegen

# Run type checking
pnpm run typecheck:all
```

### Build Failures

```bash
# Clean and rebuild
rm -rf dist node_modules
pnpm install
pnpm run build

# Check for TypeScript errors
pnpm run typecheck
```

---

## Performance Monitoring

### Backend Performance

```typescript
import { logger } from "./lib/logger";

// Measure query time
const start = Date.now();
const products = await db.select().from(products);
const duration = Date.now() - start;

logger.info({ duration }, "Query completed");
```

### Frontend Performance

```typescript
// Use React Profiler
import { Profiler } from "react";

<Profiler id="ProductList" onRender={onRenderCallback}>
  <ProductList />
</Profiler>
```

### Database Performance

```bash
# Connect to database
psql $DATABASE_URL

# View slow queries
SELECT query, calls, mean_time FROM pg_stat_statements 
WHERE mean_time > 100
ORDER BY mean_time DESC;
```

---

## Next Steps

- [Backend Setup](./BACKEND.md)
- [Frontend Setup](./FRONTEND.md)
- [Database Schema](./DATABASE.md)
- [API Reference](./API.md)
