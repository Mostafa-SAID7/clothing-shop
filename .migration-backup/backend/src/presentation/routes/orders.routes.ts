import { Router } from 'express';
import express from 'express';
import { OrdersController } from '../controllers/orders.controller';

export function createOrdersRoutes(ordersController: OrdersController): Router {
  const router = Router();

  // We need a raw body parser for the Stripe webhook
  router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    ordersController.stripeWebhook
  );

  router.post('/checkout', ordersController.createOrder);
  return router;
}
