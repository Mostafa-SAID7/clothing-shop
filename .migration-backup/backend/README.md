# Clothing Shop Backend - Clean Architecture

This backend follows a **4-Layer Clean Architecture** pattern for maintainability, testability, and separation of concerns.

## Architecture Overview

```
src/
├── domain/                 # Domain Layer (Business Logic)
│   ├── entities/          # Business entities and value objects
│   ├── repositories/      # Repository interfaces
│   └── services/          # Domain service interfaces
├── application/           # Application Layer (Use Cases)
│   └── use-cases/        # Business use cases and orchestration
├── infrastructure/        # Infrastructure Layer (External Concerns)
│   ├── repositories/     # Repository implementations
│   ├── services/         # External service implementations
│   └── container/        # Dependency injection container
├── presentation/          # Presentation Layer (API)
│   ├── controllers/      # HTTP controllers
│   ├── routes/          # Route definitions
│   ├── middleware/      # HTTP middleware
│   └── schemas/         # Request/response validation schemas
├── db/                   # Database schema and configuration
└── api-server/          # Legacy server setup (to be removed)
```

## Layer Responsibilities

### 1. Domain Layer
- **Entities**: Core business objects (User, Product, Order, Cart)
- **Repository Interfaces**: Data access contracts
- **Service Interfaces**: External service contracts
- **Business Rules**: Core business logic and validation

### 2. Application Layer
- **Use Cases**: Orchestrate business operations
- **Application Services**: Coordinate between domain and infrastructure
- **DTOs**: Data transfer objects for use case inputs/outputs

### 3. Infrastructure Layer
- **Repository Implementations**: Database access using Drizzle ORM
- **Service Implementations**: External APIs (Stripe, Email, etc.)
- **Container**: Dependency injection and wiring

### 4. Presentation Layer
- **Controllers**: Handle HTTP requests/responses
- **Routes**: API endpoint definitions
- **Middleware**: Authentication, validation, logging
- **Schemas**: Request/response validation with Zod

## Key Features

### ✅ Implemented
- **Clean Architecture**: 4-layer separation of concerns
- **Database Schema**: Complete e-commerce schema with Drizzle ORM
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Payment Integration**: Stripe checkout sessions
- **Validation**: Zod schema validation for all endpoints
- **Logging**: Structured logging with Pino
- **Type Safety**: Full TypeScript coverage
- **Dependency Injection**: Container pattern for loose coupling

### 🚧 In Progress
- Product repository implementation
- Cart management use cases
- Order management workflow
- Email service integration

### 📋 Planned
- Admin panel endpoints
- Inventory management
- Order tracking
- Advanced search and filtering
- Rate limiting and security middleware

## Database Schema

The database includes the following main entities:

- **Users**: Customer and admin accounts
- **Products**: Product catalog with variants
- **Product Sizes/Colors**: Product variation options
- **Product Inventory**: Stock management per variant
- **Carts**: Shopping cart management
- **Cart Items**: Items in shopping carts
- **Orders**: Order management
- **Order Items**: Items in orders
- **Addresses**: Shipping and billing addresses

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - List products with filtering
- `GET /api/products/:id` - Get product by ID

### Legacy (to be refactored)
- `POST /api/create-checkout-session` - Stripe checkout

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/clothing_shop

# Authentication
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret

# Payment
STRIPE_SECRET_KEY=sk_test_...

# Server
PORT=3001
NODE_ENV=development
```

## Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start

# Database operations
pnpm run db:generate  # Generate migrations
pnpm run db:migrate   # Run migrations
pnpm run db:push      # Push schema changes
pnpm run db:studio    # Open Drizzle Studio
```

## Migration from Old Structure

The old structure has been refactored:

### Removed/Deprecated
- `src/api-zod/` - Moved to presentation layer schemas
- `src/api-server/routes/` - Moved to presentation layer
- Monorepo structure - Simplified to single backend

### Migrated
- Route handlers → Controllers in presentation layer
- Business logic → Use cases in application layer
- Database access → Repository pattern in infrastructure layer
- Validation schemas → Zod schemas in presentation layer

## Next Steps

1. **Complete Product Management**: Implement full CRUD operations
2. **Cart Management**: Complete shopping cart functionality
3. **Order Workflow**: Implement complete order lifecycle
4. **Admin Features**: Add admin-specific endpoints
5. **Testing**: Add unit and integration tests
6. **Documentation**: Add API documentation with OpenAPI
7. **Performance**: Add caching and optimization
8. **Security**: Add rate limiting and advanced security measures

## Benefits of This Architecture

- **Maintainability**: Clear separation of concerns
- **Testability**: Easy to unit test business logic
- **Flexibility**: Easy to swap implementations
- **Scalability**: Modular structure supports growth
- **Type Safety**: Full TypeScript coverage
- **Clean Code**: SOLID principles applied throughout