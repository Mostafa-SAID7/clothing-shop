# System Architecture Guide

Complete overview of the Clothing Shop system design, patterns, and component interactions.

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Monorepo Structure](#monorepo-structure)
5. [Data Flow](#data-flow)
6. [Design Patterns](#design-patterns)
7. [Security Architecture](#security-architecture)
8. [Scalability Considerations](#scalability-considerations)

---

## System Overview

The Clothing Shop is a **full-stack e-commerce platform** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer                             │
│  React SPA (style-haven) - Vite, Tailwind, Radix UI        │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    API Layer                                │
│  Express.js REST API (api-server) - TypeScript, Pino       │
└────────────────────┬────────────────────────────────────────┘
                     │ SQL
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                               │
│  PostgreSQL Database - Drizzle ORM                          │
└─────────────────────────────────────────────────────────────┘

Shared Libraries (Monorepo):
├── API Specification (OpenAPI 3.1.0)
├── API Client (React Query hooks)
├── Validation Schemas (Zod)
└── Database Layer (Drizzle ORM)
```

---

## Architecture Diagram

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Pages: Home, Shop, Product, Checkout, Success, etc.       │  │
│  │ Components: Navbar, Footer, ProductCard, CartDrawer       │  │
│  │ State: Auth, Cart, Theme, Language (React Context)        │  │
│  │ Data: TanStack React Query (server state)                 │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────────┘
                       │ HTTP/REST (JSON)
                       │ CORS enabled
                       ↓
┌──────────────────────────────────────────────────────────────────┐
│                      Backend (Express)                           │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Routes:                                                    │  │
│  │  - GET  /api/healthz                                      │  │
│  │  - GET  /api/products                                     │  │
│  │  - GET  /api/products/:id                                 │  │
│  │  - POST /api/create-checkout-session (Stripe)            │  │
│  │  - POST /api/orders                                       │  │
│  │  - GET  /api/orders/:id                                   │  │
│  │                                                            │  │
│  │ Middleware:                                               │  │
│  │  - CORS, JSON parsing, Logging (Pino)                    │  │
│  │  - Error handling, Request validation                     │  │
│  │                                                            │  │
│  │ External Services:                                        │  │
│  │  - Stripe (Payment processing)                            │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────────┘
                       │ SQL (Drizzle ORM)
                       │ Connection pooling
                       ↓
┌──────────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                           │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Tables:                                                    │  │
│  │  - users (id, email, password, profile)                   │  │
│  │  - products (id, name, price, stock, images)              │  │
│  │  - orders (id, userId, status, total, items)              │  │
│  │  - order_items (id, orderId, productId, quantity)         │  │
│  │  - cart_items (id, userId, productId, quantity)           │  │
│  │                                                            │  │
│  │ Indexes: On frequently queried columns                    │  │
│  │ Constraints: Foreign keys, unique, not null               │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘

Shared Libraries (Monorepo):
┌──────────────────────────────────────────────────────────────────┐
│ lib/api-spec/          → OpenAPI 3.1.0 specification             │
│ lib/api-client-react/  → Generated React Query hooks             │
│ lib/api-zod/           → Generated Zod validation schemas        │
│ lib/db/                → Drizzle ORM + schema definitions        │
└──────────────────────────────────────────────────────────────────┘
```

### Request/Response Flow

```
User Action (Frontend)
    ↓
React Component
    ↓
React Hook (useGetProducts, useCreateCheckoutSession)
    ↓
Generated API Client (React Query)
    ↓
HTTP Request (GET/POST/PUT/DELETE)
    ↓
Express Middleware (CORS, JSON, Logging)
    ↓
Route Handler
    ↓
Validation (Zod schema)
    ↓
Database Query (Drizzle ORM)
    ↓
PostgreSQL
    ↓
Response (JSON)
    ↓
React Query Cache Update
    ↓
Component Re-render
    ↓
UI Update
```

---

## Technology Stack

### Frontend Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Build** | Vite | Fast build tool, HMR |
| **Framework** | React 18 | UI library |
| **Language** | TypeScript | Type safety |
| **Routing** | Wouter | Lightweight router |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **UI Components** | Radix UI | Accessible components |
| **State** | React Context | Global state |
| **Forms** | React Hook Form | Form state management |
| **Validation** | Zod | Schema validation |
| **Data Fetching** | TanStack React Query | Server state management |
| **Animations** | Framer Motion | Smooth animations |
| **Icons** | Lucide React | Icon library |
| **Notifications** | Sonner | Toast notifications |

### Backend Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js | JavaScript runtime |
| **Framework** | Express 5.2.1 | Web framework |
| **Language** | TypeScript | Type safety |
| **Build** | esbuild | Fast bundler |
| **Logging** | Pino | Structured logging |
| **Validation** | Zod | Schema validation |
| **ORM** | Drizzle | Type-safe query builder |
| **Database** | PostgreSQL | Relational database |
| **Payments** | Stripe | Payment processing |
| **CORS** | cors | Cross-origin support |

### Shared Libraries

| Library | Purpose |
|---------|---------|
| **OpenAPI 3.1.0** | API specification |
| **Orval** | Code generation from OpenAPI |
| **Zod** | Schema validation |
| **TypeScript** | Type safety |

---

## Monorepo Structure

### Workspace Organization

```
clothing-shop/
├── api-server/              # Backend application
│   ├── src/
│   │   ├── index.ts        # Entry point
│   │   ├── app.ts          # Express setup
│   │   ├── routes/         # API endpoints
│   │   └── lib/            # Utilities
│   ├── build.mjs           # esbuild config
│   └── package.json
│
├── style-haven/             # Frontend application
│   ├── src/
│   │   ├── main.tsx        # React entry
│   │   ├── App.tsx         # Router & providers
│   │   ├── pages/          # Route components
│   │   ├── components/     # UI components
│   │   ├── contexts/       # State management
│   │   └── hooks/          # Custom hooks
│   ├── vite.config.ts
│   └── package.json
│
└── lib/                     # Shared libraries
    ├── api-spec/           # OpenAPI definition
    ├── api-client-react/   # Generated React hooks
    ├── api-zod/            # Generated Zod schemas
    └── db/                 # Database layer
```

### Dependency Graph

```
style-haven (Frontend)
    ↓
@workspace/api-client-react
    ↓
@workspace/api-zod
    ↓
lib/api-spec (OpenAPI)

api-server (Backend)
    ↓
@workspace/api-zod
    ↓
@workspace/db
    ↓
PostgreSQL
```

### Package Relationships

```
┌─────────────────────────────────────────────────────────┐
│ lib/api-spec (OpenAPI 3.1.0)                           │
│ Single source of truth for API contract                │
└────────────┬──────────────────────────────┬────────────┘
             │                              │
             ↓                              ↓
    ┌────────────────────┐      ┌──────────────────────┐
    │ lib/api-client-react│      │ lib/api-zod         │
    │ React Query hooks   │      │ Zod schemas         │
    │ Generated code      │      │ Generated code      │
    └────────┬────────────┘      └──────────┬──────────┘
             │                              │
             ↓                              ↓
    ┌────────────────────┐      ┌──────────────────────┐
    │ style-haven        │      │ api-server           │
    │ Frontend app       │      │ Backend app          │
    │ Uses hooks         │      │ Uses schemas         │
    └────────────────────┘      └──────────┬──────────┘
                                           │
                                           ↓
                                ┌──────────────────────┐
                                │ lib/db               │
                                │ Drizzle ORM          │
                                │ Database schema      │
                                └──────────┬──────────┘
                                           │
                                           ↓
                                ┌──────────────────────┐
                                │ PostgreSQL           │
                                │ Database             │
                                └──────────────────────┘
```

---

## Data Flow

### Product Listing Flow

```
1. User navigates to /shop
   ↓
2. ShopPage component mounts
   ↓
3. useGetProducts() hook called
   ↓
4. React Query sends GET /api/products
   ↓
5. Backend route handler:
   - Validates request
   - Queries database: SELECT * FROM products
   - Returns JSON array
   ↓
6. React Query caches response
   ↓
7. Component re-renders with products
   ↓
8. ProductCard components display
```

### Checkout Flow

```
1. User clicks "Checkout" button
   ↓
2. Navigate to /checkout page
   ↓
3. CheckoutForm component renders
   ↓
4. User fills form (email, address, etc.)
   ↓
5. User clicks "Pay" button
   ↓
6. Form validation (Zod schema)
   ↓
7. useCreateCheckoutSession() mutation called
   ↓
8. POST /api/create-checkout-session
   ↓
9. Backend:
   - Validates request body
   - Creates Stripe checkout session
   - Returns session URL
   ↓
10. Frontend redirects to Stripe checkout
    ↓
11. User completes payment on Stripe
    ↓
12. Stripe redirects to /success page
    ↓
13. Success page displays order confirmation
```

### Order Creation Flow

```
1. Stripe webhook: payment.intent.succeeded
   ↓
2. Backend receives webhook
   ↓
3. Verify webhook signature
   ↓
4. Extract order data from Stripe session
   ↓
5. Database transaction:
   - INSERT INTO orders
   - INSERT INTO order_items
   - UPDATE products (stock)
   - COMMIT
   ↓
6. Send confirmation email
   ↓
7. Return 200 OK to Stripe
```

---

## Design Patterns

### 1. Monorepo Pattern

**Purpose**: Share code between frontend and backend

**Implementation**:
- Single repository with multiple packages
- Shared libraries for API spec, validation, database
- pnpm workspaces for dependency management

**Benefits**:
- Single source of truth for API contract
- Shared types and validation
- Easier refactoring across packages
- Consistent versioning

### 2. API-First Development

**Purpose**: Define API before implementation

**Implementation**:
1. Define OpenAPI spec
2. Generate client code
3. Implement backend
4. Implement frontend

**Benefits**:
- Frontend and backend can develop in parallel
- Type-safe API contracts
- Automatic client generation
- Documentation as code

### 3. Context API for State Management

**Purpose**: Manage global state without Redux

**Implementation**:
```typescript
// AuthContext.tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
```

**Benefits**:
- Lightweight, no external dependencies
- Easy to understand
- Good for small to medium apps
- Avoids prop drilling

### 4. React Query for Server State

**Purpose**: Manage server state separately from UI state

**Implementation**:
```typescript
const { data, isLoading, error } = useGetProducts();
```

**Benefits**:
- Automatic caching
- Background refetching
- Optimistic updates
- Deduplication

### 5. Zod for Validation

**Purpose**: Runtime validation with TypeScript inference

**Implementation**:
```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;
```

**Benefits**:
- Single source of truth for validation
- Type inference from schema
- Works in frontend and backend
- Better error messages

### 6. Drizzle ORM for Database

**Purpose**: Type-safe database queries

**Implementation**:
```typescript
const products = await db
  .select()
  .from(products)
  .where(eq(products.active, true));
```

**Benefits**:
- Type safety
- No SQL strings
- Automatic prepared statements
- Easy migrations

---

## Security Architecture

### Authentication & Authorization

```
┌─────────────────────────────────────────┐
│ Frontend                                │
│ - Store JWT in localStorage/cookie      │
│ - Include in Authorization header       │
└────────────────┬────────────────────────┘
                 │ Authorization: Bearer <token>
                 ↓
┌─────────────────────────────────────────┐
│ Backend                                 │
│ - Verify JWT signature                  │
│ - Check token expiration                │
│ - Extract user ID from token            │
│ - Verify user permissions               │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│ Database                                │
│ - Query user by ID                      │
│ - Check user role/permissions           │
└─────────────────────────────────────────┘
```

### Data Protection

1. **In Transit**: HTTPS/TLS encryption
2. **At Rest**: Database encryption
3. **Passwords**: Bcrypt hashing
4. **Secrets**: Environment variables

### Input Validation

```
Frontend Validation (UX)
    ↓
Backend Validation (Security)
    ↓
Database Constraints
```

### CORS Configuration

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

---

## Scalability Considerations

### Horizontal Scaling

```
Load Balancer
    ↓
┌───────────────────────────────────┐
│ Backend Instance 1                │
│ Backend Instance 2                │
│ Backend Instance 3                │
└───────────────────────────────────┘
    ↓
Database Connection Pool
    ↓
PostgreSQL (Primary)
PostgreSQL (Replica)
```

### Caching Strategy

```
Frontend Cache (React Query)
    ↓
CDN Cache (Static assets)
    ↓
Backend Cache (Redis)
    ↓
Database
```

### Database Optimization

1. **Indexing**: On frequently queried columns
2. **Connection Pooling**: Reuse connections
3. **Query Optimization**: Use EXPLAIN ANALYZE
4. **Replication**: Read replicas for scaling reads
5. **Partitioning**: Split large tables

### Performance Monitoring

```
Frontend
├── Lighthouse scores
├── Core Web Vitals
└── Error tracking

Backend
├── Response times
├── Error rates
├── Database query times
└── Memory usage

Database
├── Query performance
├── Connection pool usage
└── Disk I/O
```

---

## Deployment Architecture

### Development Environment

```
Local Machine
├── Frontend (Vite dev server)
├── Backend (Node dev server)
└── PostgreSQL (local)
```

### Production Environment

```
CDN (Static Assets)
    ↓
Load Balancer
    ↓
┌─────────────────────────────────┐
│ Backend Servers (Docker)        │
│ - Multiple instances            │
│ - Auto-scaling                  │
└─────────────────────────────────┘
    ↓
Database
├── Primary (Write)
└── Replicas (Read)
```

---

## Next Steps

- [Backend Setup](./BACKEND.md)
- [Frontend Setup](./FRONTEND.md)
- [Database Schema](./DATABASE.md)
- [Development Workflow](./DEVELOPMENT.md)
