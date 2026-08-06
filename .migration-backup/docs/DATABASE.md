# Database Schema & Migrations Guide

Complete guide for the PostgreSQL database layer using Drizzle ORM.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Setup & Configuration](#setup--configuration)
3. [Schema Definition](#schema-definition)
4. [Migrations](#migrations)
5. [Common Tables](#common-tables)
6. [Relationships](#relationships)
7. [Querying Data](#querying-data)
8. [Best Practices](#best-practices)

---

## Overview

The database layer uses:
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe query builder
- **Drizzle Kit** - Migration management

**Location**: `lib/db/`

**Key Files**:
- `src/schema/index.ts` - Schema definitions
- `drizzle.config.ts` - Database configuration
- `src/index.ts` - Database client export

---

## Setup & Configuration

### Prerequisites

- PostgreSQL 14+ installed and running
- Database created

### Installation

```bash
# From root directory
pnpm install

# Navigate to db directory
cd lib/db
```

### Configuration

Edit `drizzle.config.ts`:

```typescript
import { defineConfig } from "drizzle-kit";
import path from "path";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
```

### Environment Variables

Set in `.env.local` at project root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/clothing_shop
```

**Connection String Format**:
```
postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
```

**Examples**:
```env
# Local development
DATABASE_URL=postgresql://postgres:password@localhost:5432/clothing_shop

# With SSL (production)
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require

# Managed service (e.g., Supabase)
DATABASE_URL=postgresql://user:pass@db.supabase.co:5432/postgres
```

---

## Schema Definition

### Basic Table Definition

Located in `src/schema/index.ts`:

```typescript
import { pgTable, serial, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }),
  price: integer("price").notNull(), // Store as cents
  stock: integer("stock").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

### Column Types

| Type | Drizzle | SQL | Example |
|------|---------|-----|---------|
| Integer | `integer()` | INT | `integer("age")` |
| String | `varchar()` | VARCHAR | `varchar("name", { length: 255 })` |
| Text | `text()` | TEXT | `text("description")` |
| Boolean | `boolean()` | BOOLEAN | `boolean("active")` |
| Timestamp | `timestamp()` | TIMESTAMP | `timestamp("created_at")` |
| Date | `date()` | DATE | `date("birth_date")` |
| Decimal | `decimal()` | DECIMAL | `decimal("price", { precision: 10, scale: 2 })` |
| UUID | `uuid()` | UUID | `uuid("id").defaultRandom()` |
| JSON | `json()` | JSON | `json("metadata")` |

### Column Constraints

```typescript
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

**Constraints**:
- `.primaryKey()` - Primary key
- `.unique()` - Unique constraint
- `.notNull()` - Not null constraint
- `.default()` - Default value
- `.defaultNow()` - Current timestamp

---

## Common Tables

### Users Table

```typescript
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 100 }),
  zipCode: varchar("zip_code", { length: 20 }),
  country: varchar("country", { length: 100 }),
  role: varchar("role", { length: 50 }).default("customer"), // customer, admin
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

### Products Table

```typescript
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  price: integer("price").notNull(), // Price in cents
  cost: integer("cost"), // Cost in cents
  stock: integer("stock").notNull().default(0),
  category: varchar("category", { length: 100 }),
  image: varchar("image", { length: 500 }),
  images: json("images"), // Array of image URLs
  active: boolean("active").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

### Orders Table

```typescript
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  orderNumber: varchar("order_number", { length: 50 }).notNull().unique(),
  status: varchar("status", { length: 50 }).notNull().default("pending"), // pending, processing, shipped, delivered, cancelled
  total: integer("total").notNull(), // Total in cents
  tax: integer("tax").notNull().default(0),
  shipping: integer("shipping").notNull().default(0),
  shippingAddress: json("shipping_address").notNull(),
  billingAddress: json("billing_address"),
  paymentMethod: varchar("payment_method", { length: 50 }), // stripe, paypal, etc.
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"), // pending, completed, failed
  stripeSessionId: varchar("stripe_session_id", { length: 255 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

### Order Items Table

```typescript
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(), // Price at time of order
  total: integer("total").notNull(), // quantity * price
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```

### Cart Items Table

```typescript
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

---

## Relationships

### Foreign Keys

```typescript
import { relations } from "drizzle-orm";

// One-to-Many: User has many Orders
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  cartItems: many(cartItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

// One-to-Many: Product has many OrderItems
export const productsRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems),
  cartItems: many(cartItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
```

---

## Migrations

### Creating Migrations

```bash
cd lib/db

# Generate migration from schema changes
pnpm run push
```

This command:
1. Compares current schema with database
2. Generates migration SQL
3. Applies migration to database

### Viewing Migrations

Migrations are stored in `drizzle/` directory (auto-generated).

### Applying Migrations

```bash
# Apply pending migrations
pnpm run push

# Force apply (use with caution)
pnpm run push-force
```

### Reverting Migrations

Drizzle doesn't support automatic rollbacks. To revert:

1. Manually edit the schema
2. Run `pnpm run push` again

Or use raw SQL:

```bash
# Connect to database
psql postgresql://user:password@localhost:5432/clothing_shop

# Run SQL to revert changes
DROP TABLE IF EXISTS table_name;
```

---

## Querying Data

### Basic Queries

Located in `src/index.ts`:

```typescript
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
```

### Select Queries

```typescript
import { db } from "@workspace/db";
import { products, orders } from "@workspace/db/schema";

// Get all products
const allProducts = await db.select().from(products);

// Get with conditions
const activeProducts = await db
  .select()
  .from(products)
  .where(eq(products.active, true));

// Get with limit and offset
const paginated = await db
  .select()
  .from(products)
  .limit(10)
  .offset(0);

// Get with ordering
const sorted = await db
  .select()
  .from(products)
  .orderBy(desc(products.createdAt));

// Get specific columns
const names = await db
  .select({ id: products.id, name: products.name })
  .from(products);
```

### Insert Queries

```typescript
import { db } from "@workspace/db";
import { products } from "@workspace/db/schema";

// Insert single record
const newProduct = await db
  .insert(products)
  .values({
    name: "T-Shirt",
    slug: "t-shirt",
    price: 2999,
    stock: 100,
  })
  .returning();

// Insert multiple records
const newProducts = await db
  .insert(products)
  .values([
    { name: "Shirt", slug: "shirt", price: 3999, stock: 50 },
    { name: "Pants", slug: "pants", price: 5999, stock: 30 },
  ])
  .returning();
```

### Update Queries

```typescript
import { db } from "@workspace/db";
import { products, eq } from "@workspace/db/schema";

// Update single record
const updated = await db
  .update(products)
  .set({ stock: 50 })
  .where(eq(products.id, 1))
  .returning();

// Update multiple records
const updated = await db
  .update(products)
  .set({ active: false })
  .where(lt(products.stock, 10))
  .returning();
```

### Delete Queries

```typescript
import { db } from "@workspace/db";
import { products, eq } from "@workspace/db/schema";

// Delete single record
await db
  .delete(products)
  .where(eq(products.id, 1));

// Delete multiple records
await db
  .delete(products)
  .where(lt(products.stock, 0));
```

### Joins

```typescript
import { db } from "@workspace/db";
import { orders, users, eq } from "@workspace/db/schema";

// Inner join
const userOrders = await db
  .select()
  .from(orders)
  .innerJoin(users, eq(orders.userId, users.id));

// Left join
const allUsers = await db
  .select()
  .from(users)
  .leftJoin(orders, eq(users.id, orders.userId));
```

### Aggregations

```typescript
import { db } from "@workspace/db";
import { products, count, sum } from "drizzle-orm";

// Count
const productCount = await db
  .select({ count: count() })
  .from(products);

// Sum
const totalStock = await db
  .select({ total: sum(products.stock) })
  .from(products);

// Group by
const byCategory = await db
  .select({
    category: products.category,
    count: count(),
  })
  .from(products)
  .groupBy(products.category);
```

---

## Best Practices

### 1. Use Transactions

```typescript
import { db } from "@workspace/db";

await db.transaction(async (tx) => {
  // All queries in transaction
  const order = await tx.insert(orders).values({...}).returning();
  await tx.insert(orderItems).values({...});
  // If any fails, all rollback
});
```

### 2. Use Prepared Statements

Drizzle automatically uses prepared statements (prevents SQL injection).

### 3. Index Frequently Queried Columns

```typescript
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  // slug is indexed automatically due to unique()
}, (table) => ({
  categoryIdx: index("category_idx").on(table.category),
  createdAtIdx: index("created_at_idx").on(table.createdAt),
}));
```

### 4. Use Appropriate Data Types

- Use `integer` for prices (store as cents)
- Use `timestamp` for dates with time
- Use `date` for dates only
- Use `json` for flexible data structures

### 5. Handle Null Values

```typescript
import { isNull, isNotNull } from "drizzle-orm";

// Get products without description
const noDesc = await db
  .select()
  .from(products)
  .where(isNull(products.description));

// Get products with description
const withDesc = await db
  .select()
  .from(products)
  .where(isNotNull(products.description));
```

### 6. Use Relationships

```typescript
import { db } from "@workspace/db";
import { orders, users } from "@workspace/db/schema";

// Query with relations
const orderWithUser = await db.query.orders.findFirst({
  where: eq(orders.id, 1),
  with: {
    user: true,
    items: true,
  },
});
```

---

## Troubleshooting

### Connection Error

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
1. Ensure PostgreSQL is running
2. Check DATABASE_URL in .env.local
3. Verify database exists

### Migration Error

**Error**: `Error: relation "products" already exists`

**Solution**:
```bash
# Force apply migration
pnpm run push-force
```

### Type Errors

**Error**: `Type 'string' is not assignable to type 'number'`

**Solution**: Ensure column types match in schema definition

---

## Next Steps

- [Backend Setup](./BACKEND.md)
- [Frontend Setup](./FRONTEND.md)
- [API Reference](./API.md)
- [Development Workflow](./DEVELOPMENT.md)
