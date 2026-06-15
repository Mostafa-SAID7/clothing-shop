import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { logger } from "../infrastructure/logging/logger";
import { Container } from "../infrastructure/container/container";
import { createAuthRoutes } from "./routes/auth.routes";
import { createProductsRoutes } from "./routes/products.routes";
import { createCartRoutes } from "./routes/cart.routes";
import { createOrdersRoutes } from "./routes/orders.routes";
import { errorHandler } from "./middleware/error-handler.middleware";

const app: Express = express();

// Initialize container
const container = Container.getInstance();

// Middleware
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());

// Mount orders routes BEFORE express.json() to preserve raw body for Stripe Webhooks
if (container.ordersController) {
  app.use("/api/v1/orders", createOrdersRoutes(container.ordersController));
  app.use("/api/orders", createOrdersRoutes(container.ordersController));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Clothing Shop API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/api/healthz",
      products: "/api/v1/products",
      auth: "/api/v1/auth",
      cart: "/api/v1/cart",
      orders: "/api/v1/orders"
    }
  });
});

// Health check route
app.get("/api/healthz", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/v1/auth", createAuthRoutes(container.authController));
app.use("/api/v1/products", createProductsRoutes(container.productsController));
if (container.cartController) {
  app.use("/api/v1/cart", createCartRoutes(container.cartController));
  app.use("/api/cart", createCartRoutes(container.cartController));
}

// Legacy routes (for backward compatibility)
app.use("/api/auth", createAuthRoutes(container.authController));
app.use("/api/products", createProductsRoutes(container.productsController));

// Global error handling middleware (must be last)
app.use(errorHandler);

export default app;