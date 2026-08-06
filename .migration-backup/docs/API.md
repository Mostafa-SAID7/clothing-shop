# API Reference

Complete reference for all REST API endpoints.

## 📋 Table of Contents

1. [Base URL](#base-url)
2. [Authentication](#authentication)
3. [Response Format](#response-format)
4. [Error Handling](#error-handling)
5. [Endpoints](#endpoints)
6. [Rate Limiting](#rate-limiting)
7. [Webhooks](#webhooks)

---

## Base URL

```
Development: http://localhost:3000/api
Production: https://api.example.com/api
```

All endpoints are prefixed with `/api`.

---

## Authentication

### Bearer Token

Include JWT token in Authorization header:

```bash
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/protected-endpoint
```

### Token Format

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Getting a Token

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

---

## Response Format

### Success Response

```json
{
  "data": {
    "id": 1,
    "name": "Product Name",
    "price": 2999
  },
  "status": "success"
}
```

### List Response

```json
{
  "data": [
    { "id": 1, "name": "Product 1" },
    { "id": 2, "name": "Product 2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  },
  "status": "success"
}
```

### Error Response

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "error details"
  }
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET/POST |
| 201 | Created | Resource created |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable Entity | Validation error |
| 500 | Server Error | Unexpected error |

### Error Response Example

```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

---

## Endpoints

### Health Check

#### GET /healthz

Returns server health status.

**Request**:
```bash
curl http://localhost:3000/api/healthz
```

**Response** (200 OK):
```json
{
  "status": "ok"
}
```

---

### Products

#### GET /products

Get all products with optional filtering and pagination.

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `category` | string | Filter by category |
| `search` | string | Search by name |
| `sort` | string | Sort by field (name, price, created) |
| `order` | string | Sort order (asc, desc) |

**Request**:
```bash
curl "http://localhost:3000/api/products?page=1&limit=10&category=shirts"
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": 1,
      "name": "T-Shirt",
      "slug": "t-shirt",
      "description": "Comfortable cotton t-shirt",
      "price": 2999,
      "stock": 100,
      "category": "shirts",
      "image": "https://example.com/image.jpg",
      "active": true,
      "featured": false,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

---

#### GET /products/:id

Get a single product by ID.

**Request**:
```bash
curl http://localhost:3000/api/products/1
```

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "T-Shirt",
  "slug": "t-shirt",
  "description": "Comfortable cotton t-shirt",
  "price": 2999,
  "stock": 100,
  "category": "shirts",
  "image": "https://example.com/image.jpg",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "active": true,
  "featured": false,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Error Response** (404 Not Found):
```json
{
  "error": "Product not found",
  "code": "PRODUCT_NOT_FOUND"
}
```

---

#### GET /products/slug/:slug

Get a product by slug.

**Request**:
```bash
curl http://localhost:3000/api/products/slug/t-shirt
```

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "T-Shirt",
  "slug": "t-shirt",
  ...
}
```

---

### Cart

#### GET /cart

Get current user's cart.

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```bash
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/cart
```

**Response** (200 OK):
```json
{
  "items": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 2,
      "product": {
        "id": 1,
        "name": "T-Shirt",
        "price": 2999
      }
    }
  ],
  "total": 5998
}
```

---

#### POST /cart/items

Add item to cart.

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Request**:
```bash
curl -X POST http://localhost:3000/api/cart/items \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

**Response** (201 Created):
```json
{
  "id": 1,
  "productId": 1,
  "quantity": 2,
  "product": {
    "id": 1,
    "name": "T-Shirt",
    "price": 2999
  }
}
```

---

#### PUT /cart/items/:id

Update cart item quantity.

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "quantity": 5
}
```

**Request**:
```bash
curl -X PUT http://localhost:3000/api/cart/items/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

**Response** (200 OK):
```json
{
  "id": 1,
  "productId": 1,
  "quantity": 5,
  "product": {
    "id": 1,
    "name": "T-Shirt",
    "price": 2999
  }
}
```

---

#### DELETE /cart/items/:id

Remove item from cart.

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```bash
curl -X DELETE http://localhost:3000/api/cart/items/1 \
  -H "Authorization: Bearer <token>"
```

**Response** (204 No Content):
```
(empty body)
```

---

### Orders

#### POST /orders

Create a new order.

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "zipCode": "10001",
    "country": "USA"
  },
  "billingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "stripe"
}
```

**Request**:
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

**Response** (201 Created):
```json
{
  "id": 1,
  "orderNumber": "ORD-2024-001",
  "userId": 1,
  "status": "pending",
  "total": 5998,
  "tax": 480,
  "shipping": 500,
  "paymentStatus": "pending",
  "items": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 2,
      "price": 2999,
      "total": 5998
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

#### GET /orders

Get current user's orders.

**Headers**:
```
Authorization: Bearer <token>
```

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `status` | string | Filter by status |

**Request**:
```bash
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/api/orders?page=1&status=completed"
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": 1,
      "orderNumber": "ORD-2024-001",
      "status": "completed",
      "total": 5998,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

---

#### GET /orders/:id

Get a specific order.

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```bash
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/orders/1
```

**Response** (200 OK):
```json
{
  "id": 1,
  "orderNumber": "ORD-2024-001",
  "userId": 1,
  "status": "completed",
  "total": 5998,
  "tax": 480,
  "shipping": 500,
  "paymentStatus": "completed",
  "items": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 2,
      "price": 2999,
      "total": 5998
    }
  ],
  "shippingAddress": {...},
  "billingAddress": {...},
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

### Checkout

#### POST /create-checkout-session

Create a Stripe checkout session.

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "items": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 2999
    }
  ],
  "successUrl": "http://localhost:5173/success",
  "cancelUrl": "http://localhost:5173/checkout"
}
```

**Request**:
```bash
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"productId": "1", "quantity": 2, "price": 2999}],
    "successUrl": "http://localhost:5173/success",
    "cancelUrl": "http://localhost:5173/checkout"
  }'
```

**Response** (200 OK):
```json
{
  "sessionId": "cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "url": "https://checkout.stripe.com/pay/cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": "Invalid request body",
  "code": "VALIDATION_ERROR",
  "details": {
    "items": "Items array is required"
  }
}
```

---

### Authentication

#### POST /auth/register

Register a new user.

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Request**:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Response** (201 Created):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

#### POST /auth/login

Login user.

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Request**:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

#### POST /auth/logout

Logout user (invalidate token).

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer <token>"
```

**Response** (200 OK):
```json
{
  "message": "Logged out successfully"
}
```

---

## Rate Limiting

API endpoints are rate limited to prevent abuse.

**Limits**:
- 100 requests per minute per IP
- 1000 requests per hour per IP

**Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642345678
```

**Error Response** (429 Too Many Requests):
```json
{
  "error": "Too many requests",
  "code": "RATE_LIMIT_EXCEEDED",
  "retryAfter": 60
}
```

---

## Webhooks

### Stripe Webhooks

The API receives webhooks from Stripe for payment events.

**Endpoint**: `POST /webhooks/stripe`

**Events**:
- `payment_intent.succeeded` - Payment completed
- `payment_intent.payment_failed` - Payment failed
- `charge.refunded` - Refund processed

**Webhook Payload**:
```json
{
  "id": "evt_1234567890",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_1234567890",
      "amount": 5998,
      "currency": "usd",
      "status": "succeeded"
    }
  }
}
```

**Verification**:
Stripe webhooks are verified using the webhook signing secret:

```typescript
const signature = req.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(
  req.body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

---

## Testing

### Using cURL

```bash
# Health check
curl http://localhost:3000/api/healthz

# Get products
curl http://localhost:3000/api/products

# Create checkout session
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"items": [{"productId": "1", "quantity": 1, "price": 2999}]}'
```

### Using Postman

1. Import OpenAPI spec: `lib/api-spec/openapi.yaml`
2. Set base URL: `http://localhost:3000/api`
3. Create requests for each endpoint
4. Test with different parameters

### Using Insomnia

1. Create new workspace
2. Import OpenAPI spec
3. Set environment variables
4. Test endpoints

---

## Next Steps

- [Backend Setup](./BACKEND.md)
- [Frontend Setup](./FRONTEND.md)
- [Database Schema](./DATABASE.md)
- [Development Workflow](./DEVELOPMENT.md)
