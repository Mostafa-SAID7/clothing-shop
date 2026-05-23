# Backend Setup & API Guide

Complete guide for the Express.js backend server (`api-server`).

## 📋 Table of Contents

1. [Overview](#overview)
2. [Setup & Installation](#setup--installation)
3. [Project Structure](#project-structure)
4. [Running the Server](#running-the-server)
5. [API Endpoints](#api-endpoints)
6. [Environment Variables](#environment-variables)
7. [Adding New Endpoints](#adding-new-endpoints)
8. [Logging](#logging)
9. [Error Handling](#error-handling)
10. [Deployment](#deployment)

---

## Overview

The backend is a **Node.js/Express** REST API server built with:
- **Express 5.2.1** - Web framework
- **TypeScript** - Type safety
- **Pino** - Structured logging
- **Stripe** - Payment processing
- **Drizzle ORM** - Database access
- **Zod** - Request validation

**Port**: 3000 (configurable via `PORT` environment variable)

---

## Setup & Installation

### Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL 14+

### Installation Steps

```bash
# 1. Navigate to backend directory
cd clothing-shop/api-server

# 2. Install dependencies (from root, pnpm handles workspaces)
cd ../..
pnpm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Configure database
# Edit .env.local with your PostgreSQL connection string
DATABASE_URL=postgresql://user:password@localhost:5432/clothing_shop

# 5. Run database migrations
cd lib/db
pnpm run push
cd ../..
```

---

## Project Structure

```
api-server/
├── src/
│   ├── index.ts              # Server entry point
│   ├── app.ts                # Express app configuration
│   ├── routes/               # API endpoint handlers
│   │   ├── health.ts         # Health check endpoint
│   │   ├── checkout.ts       # Stripe checkout endpoint
│   │   └── index.ts          # Route aggregator
│   ├── lib/
│   │   ├── logger.ts         # Pino logger setup
│   │   └── utils.ts          # Utility functions
│   └── middlewares/          # Custom middleware
│       └── (empty - add as needed)
├── dist/                     # Compiled output (generated)
├── build.mjs                 # esbuild configuration
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── README.md                 # Backend-specific docs
```

---

## Running the Server

### Development Mode

```bash
cd api-server
pnpm run dev
```

This command:
1. Sets `NODE_ENV=development`
2. Builds the project with esbuild
3. Starts the server with source maps enabled
4. Watches for changes (manual restart required)

**Output**:
```
[timestamp] INFO: Server listening on port 3000
```

### Production Build

```bash
cd api-server
pnpm run build
```

Compiles TypeScript to ESM JavaScript in `dist/` directory.

### Production Start

```bash
cd api-server
pnpm run start
```

Runs the compiled server with source maps for better error tracking.

### Type Checking

```bash
cd api-server
pnpm run typecheck
```

Validates TypeScript without emitting code.

---

## API Endpoints

### Health Check

**Endpoint**: `GET /api/healthz`

**Description**: Returns server health status

**Response** (200 OK):
```json
{
  "status": "ok"
}
```

**Example**:
```bash
curl http://localhost:3000/api/healthz
```

---

### Create Checkout Session

**Endpoint**: `POST /api/create-checkout-session`

**Description**: Creates a Stripe checkout session for payment

**Request Body**:
```json
{
  "items": [
    {
      "productId": "prod_123",
      "quantity": 2,
      "price": 2999
    }
  ],
  "successUrl": "http://localhost:5173/success",
  "cancelUrl": "http://localhost:5173/checkout"
}
```

**Response** (200 OK):
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": "Invalid request body"
}
```

**Example**:
```bash
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"productId": "prod_123", "quantity": 1, "price": 2999}],
    "successUrl": "http://localhost:5173/success",
    "cancelUrl": "http://localhost:5173/checkout"
  }'
```

---

## Environment Variables

Create `.env.local` in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/clothing_shop

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key_here

# Logging (optional)
LOG_LEVEL=info
```

### Variable Descriptions

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | Yes | - | Server port |
| `NODE_ENV` | No | development | Environment (development/production) |
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `STRIPE_SECRET_KEY` | Yes | - | Stripe API secret key |
| `LOG_LEVEL` | No | info | Pino log level (trace/debug/info/warn/error) |

---

## Adding New Endpoints

### Step 1: Update OpenAPI Spec

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

### Step 2: Generate Code

```bash
cd lib/api-spec
pnpm run codegen
```

This generates:
- React Query hooks in `lib/api-client-react/src/generated/`
- Zod schemas in `lib/api-zod/src/generated/`

### Step 3: Implement Backend Route

Create `api-server/src/routes/products.ts`:

```typescript
import { Router } from "express";
import { db } from "@workspace/db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await db.query.products.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
```

### Step 4: Register Route

Update `api-server/src/routes/index.ts`:

```typescript
import express from "express";
import healthRouter from "./health";
import checkoutRouter from "./checkout";
import productsRouter from "./products";

const router = express.Router();

router.use("/healthz", healthRouter);
router.use("/create-checkout-session", checkoutRouter);
router.use("/products", productsRouter);

export default router;
```

### Step 5: Use in Frontend

The generated React Query hook is automatically available:

```typescript
import { useGetProducts } from "@workspace/api-client-react";

function ProductList() {
  const { data: products, isLoading } = useGetProducts();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <ul>
      {products?.map(p => (
        <li key={p.id}>{p.name} - ${p.price}</li>
      ))}
    </ul>
  );
}
```

---

## Logging

The backend uses **Pino** for structured logging with HTTP middleware integration.

### Logger Setup

Located in `src/lib/logger.ts`:

```typescript
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});
```

### Using the Logger

```typescript
import { logger } from "./lib/logger";

logger.info({ userId: 123 }, "User logged in");
logger.error({ err }, "Database error");
logger.warn("Low disk space");
logger.debug({ data }, "Processing request");
```

### Log Levels

- `trace` - Very detailed debugging
- `debug` - Debugging information
- `info` - General information (default)
- `warn` - Warning messages
- `error` - Error messages
- `fatal` - Fatal errors

### HTTP Logging

Pino HTTP middleware automatically logs:
- Request ID
- HTTP method
- URL path
- Response status code
- Request/response time

---

## Error Handling

### Standard Error Response

```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful request |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing auth token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected error |

### Error Handling Pattern

```typescript
router.post("/endpoint", async (req, res) => {
  try {
    // Validate input
    const data = await schema.parseAsync(req.body);
    
    // Process request
    const result = await processData(data);
    
    // Return success
    res.json(result);
  } catch (error) {
    logger.error({ err: error }, "Request failed");
    
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: "Internal server error" });
  }
});
```

---

## Deployment

### Build for Production

```bash
cd api-server
pnpm run build
```

Output: `dist/index.mjs` (ESM module with source maps)

### Environment Setup

On your production server, set:

```env
PORT=3000
NODE_ENV=production
DATABASE_URL=postgresql://prod_user:prod_pass@prod_host:5432/clothing_shop
STRIPE_SECRET_KEY=sk_live_your_production_key
LOG_LEVEL=warn
```

### Start Server

```bash
node --enable-source-maps ./dist/index.mjs
```

### Using Process Manager

Recommended: Use **PM2** or **systemd** for process management

**PM2 Example**:
```bash
pm2 start dist/index.mjs --name "clothing-shop-api" --env production
pm2 save
pm2 startup
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

WORKDIR /app/api-server
RUN pnpm run build

EXPOSE 3000

CMD ["node", "--enable-source-maps", "./dist/index.mjs"]
```

Build and run:
```bash
docker build -t clothing-shop-api .
docker run -p 3000:3000 -e PORT=3000 -e DATABASE_URL=... clothing-shop-api
```

---

## Troubleshooting

### Server won't start

**Error**: `PORT environment variable is required`

**Solution**: Set PORT in `.env.local` or pass as environment variable:
```bash
PORT=3000 pnpm run dev
```

### Database connection fails

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**: 
1. Ensure PostgreSQL is running
2. Check DATABASE_URL in `.env.local`
3. Verify database exists and credentials are correct

### Stripe errors

**Error**: `Invalid API Key provided`

**Solution**: 
1. Get your Stripe secret key from dashboard
2. Set STRIPE_SECRET_KEY in `.env.local`
3. Use test key for development (sk_test_...)

### TypeScript errors

**Error**: `Type 'X' is not assignable to type 'Y'`

**Solution**: Run type checking to see all errors:
```bash
pnpm run typecheck
```

---

## Performance Tips

1. **Enable compression** - Add `compression` middleware
2. **Use connection pooling** - Configure in DATABASE_URL
3. **Cache responses** - Add Redis for frequently accessed data
4. **Monitor logs** - Use log aggregation service
5. **Rate limiting** - Add `express-rate-limit` middleware

---

## Security Best Practices

1. ✅ Use HTTPS in production
2. ✅ Validate all inputs with Zod
3. ✅ Use environment variables for secrets
4. ✅ Enable CORS only for trusted origins
5. ✅ Add authentication/authorization
6. ✅ Use prepared statements (Drizzle handles this)
7. ✅ Keep dependencies updated
8. ✅ Monitor error logs for suspicious activity

---

## Next Steps

- [Frontend Setup](./FRONTEND.md)
- [Database Schema](./DATABASE.md)
- [API Reference](./API.md)
- [Development Workflow](./DEVELOPMENT.md)
