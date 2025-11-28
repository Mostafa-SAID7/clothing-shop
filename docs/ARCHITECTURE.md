# Architecture Documentation

## Overview

Style Haven is a modern e-commerce application built with Next.js 15, leveraging the App Router for optimal performance and developer experience.

## Technology Stack

### Frontend
- **Next.js 15.4.2** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.8.2** - Type safety
- **Tailwind CSS 3.3.3** - Utility-first styling
- **shadcn/ui** - Component library built on Radix UI

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Stripe** - Payment processing

### State Management
- **React Hooks** - useState, useEffect for local state
- **localStorage** - Cart persistence

## Application Structure

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Home Page   │  │   Checkout   │  │   Success    │ │
│  │  (page.tsx)  │  │  (page.tsx)  │  │  (page.tsx)  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                  │                  │         │
│         └──────────────────┼──────────────────┘         │
│                            │                            │
│                   ┌────────▼────────┐                   │
│                   │  Components     │                   │
│                   │  - ProductCard  │                   │
│                   │  - CartDrawer   │                   │
│                   │  - UI Library   │                   │
│                   └────────┬────────┘                   │
│                            │                            │
│                   ┌────────▼────────┐                   │
│                   │  State & Data   │                   │
│                   │  - Cart State   │                   │
│                   │  - Wishlist     │                   │
│                   │  - Products     │                   │
│                   └────────┬────────┘                   │
└────────────────────────────┼────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  localStorage   │
                    │  (Cart Persist) │
                    └────────┬────────┘
                             │
┌────────────────────────────┼────────────────────────────┐
│                     Server (Next.js)                     │
├────────────────────────────┼────────────────────────────┤
│                   ┌────────▼────────┐                   │
│                   │   API Routes    │                   │
│                   │  /api/create-   │                   │
│                   │  checkout-      │                   │
│                   │  session        │                   │
│                   └────────┬────────┘                   │
└────────────────────────────┼────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Stripe API     │
                    │  - Checkout     │
                    │  - Payments     │
                    └─────────────────┘
```

## Data Flow

### 1. Product Browsing

```
User → Home Page → Product Data (lib/data.ts) → ProductCard Component → Display
```

### 2. Adding to Cart

```
User Clicks "Add to Cart"
  → ProductCard opens Dialog
  → User selects Size & Color
  → Calls onAddToCart()
  → Updates cart state in Home Page
  → CartDrawer updates badge count
  → Saves to localStorage
```

### 3. Checkout Flow

```
User → CartDrawer → "Proceed to Checkout"
  → Checkout Page loads cart from localStorage
  → User fills form
  → Submit → API Route (/api/create-checkout-session)
  → Stripe creates session
  → Redirect to Stripe Checkout
  → Payment processed
  → Redirect to Success Page
  → Clear cart from localStorage
```

## Component Architecture

### Page Components

#### Home Page (`app/page.tsx`)
- **Purpose**: Main product listing and shopping interface
- **State**:
  - `cart`: Array of cart items
  - `wishlist`: Array of product IDs
  - `selectedCategory`: Current category filter
  - `searchQuery`: Search input value
- **Key Functions**:
  - `addToCart()`: Adds item to cart with size/color
  - `toggleWishlist()`: Adds/removes from wishlist
  - `updateCartItemQuantity()`: Updates item quantity
  - `removeFromCart()`: Removes item from cart

#### Checkout Page (`app/checkout/page.tsx`)
- **Purpose**: Collect shipping info and process payment
- **State**:
  - `cart`: Loaded from localStorage
  - `formData`: Customer information
  - `loading`: Payment processing state
- **Key Functions**:
  - `handleSubmit()`: Creates Stripe session and redirects

#### Success Page (`app/success/page.tsx`)
- **Purpose**: Order confirmation
- **Side Effects**: Clears cart from localStorage

### Reusable Components

#### ProductCard (`components/product-card.tsx`)
- Displays product information
- Handles wishlist toggle
- Opens dialog for size/color selection
- Emits `onAddToCart` event

#### CartDrawer (`components/ui/cart-drawer.tsx`)
- Displays cart items
- Quantity management
- Total calculation
- Checkout navigation

## State Management Strategy

### Local Component State
Used for UI-specific state that doesn't need to be shared:
- Form inputs
- Dialog open/close
- Loading states

### Lifted State
Cart and wishlist state is lifted to the Home page and passed down as props:
```typescript
const [cart, setCart] = useState<CartItem[]>([]);
const [wishlist, setWishlist] = useState<number[]>([]);
```

### Persistent State
Cart data is persisted to localStorage:
```typescript
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
```

## API Architecture

### RESTful Endpoints

#### POST `/api/create-checkout-session`
- **Input**: Cart items + customer info
- **Process**: Creates Stripe Checkout session
- **Output**: Session ID for redirect

### Error Handling
- Try-catch blocks around all API calls
- Generic error messages to clients
- Detailed logging on server

## Security Architecture

### Client-Side
- Only public Stripe key exposed
- Input validation on forms
- XSS protection via React

### Server-Side
- Secret keys in environment variables
- API routes validate input
- Stripe handles PCI compliance

### Data Protection
- No sensitive data in localStorage
- HTTPS in production
- Environment variables not committed

## Performance Optimizations

### Image Optimization
- Next.js Image component (when not using external URLs)
- Remote patterns configured for Unsplash

### Code Splitting
- Automatic with Next.js App Router
- Dynamic imports for heavy components

### Caching
- Static assets cached by CDN
- API responses can be cached

## Scalability Considerations

### Current Limitations
- Products stored in static file
- No database
- No user authentication
- No order history

### Future Enhancements
1. **Database Integration**
   - PostgreSQL or MongoDB for products
   - Order history storage
   - User accounts

2. **Authentication**
   - NextAuth.js for user login
   - Protected routes
   - User profiles

3. **Admin Dashboard**
   - Product management
   - Order management
   - Analytics

4. **Advanced Features**
   - Product reviews
   - Recommendations
   - Inventory management
   - Email notifications

## Testing Strategy

### Manual Testing
- User flow testing
- Cross-browser testing
- Responsive design testing
- Payment flow testing

### Future Automated Testing
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: API route testing
- **E2E Tests**: Playwright or Cypress
- **Visual Regression**: Percy or Chromatic

## Deployment Architecture

### Recommended: Vercel
- Automatic deployments from Git
- Edge network for fast delivery
- Serverless functions for API routes
- Environment variable management

### Alternative: Self-Hosted
- Node.js server
- Nginx reverse proxy
- PM2 process management
- SSL certificates

## Monitoring & Observability

### Recommended Tools
- **Vercel Analytics**: Performance metrics
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Stripe Dashboard**: Payment monitoring

## Dependencies Management

### Core Dependencies
- Locked versions in package-lock.json
- Regular security updates
- Dependabot for automated updates

### Update Strategy
1. Review changelog
2. Test in development
3. Update one major dependency at a time
4. Monitor for issues

## Conclusion

This architecture provides a solid foundation for an e-commerce application with room for growth. The modular structure allows for easy feature additions and maintenance.
