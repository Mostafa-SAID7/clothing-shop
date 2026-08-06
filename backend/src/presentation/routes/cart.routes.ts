import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';

export function createCartRoutes(cartController: CartController): Router {
  const router = Router();
  router.post('/items', cartController.addToCart);
  return router;
}
