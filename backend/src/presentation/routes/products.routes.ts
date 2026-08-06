import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller';

export function createProductsRoutes(productsController: ProductsController): Router {
  const router = Router();

  router.get('/', productsController.getProducts);
  router.get('/:id', productsController.getProductById);

  return router;
}