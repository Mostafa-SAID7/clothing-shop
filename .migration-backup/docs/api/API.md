# API Documentation

## Overview

Style Haven uses Next.js API Routes for server-side functionality, primarily for Stripe payment processing.

## Endpoints

### POST `/api/create-checkout-session`

Creates a Stripe Checkout session for processing payments.

#### Request

**Headers:**

```
Content-Type: application/json
```

**Body:**

```typescript
{
  cart: CartItem[];
  customerInfo: {
    email: string;
    name: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
}
```

**CartItem Interface:**

```typescript
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
```

#### Response

**Success (200):**

```json
{
  "sessionId": "cs_test_..."
}
```

**Error (500):**

```json
{
  "error": "Error creating checkout session"
}
```

#### Example Usage

```typescript
const response = await fetch("/api/create-checkout-session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    cart: [
      {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        image: "https://...",
        quantity: 2,
        selectedSize: "M",
        selectedColor: "White",
      },
    ],
    customerInfo: {
      email: "customer@example.com",
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      country: "US",
      postalCode: "10001",
    },
  }),
});

const { sessionId } = await response.json();
```

## Stripe Integration

### Configuration

The API uses the Stripe Node.js library with the following configuration:

```typescript
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});
```

### Checkout Session Parameters

- **payment_method_types**: `["card"]` - Only card payments accepted
- **mode**: `"payment"` - One-time payment (not subscription)
- **success_url**: Redirects to `/success` page after successful payment
- **cancel_url**: Redirects back to `/checkout` if user cancels
- **customer_email**: Pre-fills customer email in Stripe Checkout
- **shipping_address_collection**: Collects shipping address for US, CA, and GB

### Line Items

Each cart item is converted to a Stripe line item:

```typescript
{
  price_data: {
    currency: "usd",
    product_data: {
      name: item.name,
      description: `Size: ${item.selectedSize}, Color: ${item.selectedColor}`,
      images: [item.image],
    },
    unit_amount: Math.round(item.price * 100), // Convert to cents
  },
  quantity: item.quantity,
}
```

## Error Handling

All API errors are logged to the console and return a 500 status code with a generic error message to avoid exposing sensitive information.

```typescript
try {
  // API logic
} catch (error) {
  console.error("Stripe error:", error);
  return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 });
}
```

## Security Considerations

1. **API Keys**: Never expose `STRIPE_SECRET_KEY` to the client
2. **Validation**: Validate all input data before processing
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: API routes are same-origin by default
5. **Rate Limiting**: Consider implementing rate limiting for production

## Testing

### Test Mode

Use Stripe test keys for development:

- `STRIPE_SECRET_KEY=sk_test_...`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`

### Test Cards

| Card Number         | Scenario                |
| ------------------- | ----------------------- |
| 4242 4242 4242 4242 | Successful payment      |
| 4000 0000 0000 9995 | Declined payment        |
| 4000 0025 0000 3155 | Requires authentication |

### Testing Webhooks

For production, set up Stripe webhooks to handle:

- `checkout.session.completed` - Order confirmation
- `payment_intent.succeeded` - Payment success
- `payment_intent.payment_failed` - Payment failure

## Future Enhancements

Potential API endpoints to add:

- `POST /api/webhooks/stripe` - Handle Stripe webhooks
- `GET /api/products` - Fetch products from database
- `POST /api/products` - Add new products (admin)
- `GET /api/orders/:id` - Get order details
- `POST /api/newsletter` - Newsletter subscription
- `POST /api/contact` - Contact form submission
