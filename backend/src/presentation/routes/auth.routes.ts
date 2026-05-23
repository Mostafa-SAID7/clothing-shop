import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schemas';

export function createAuthRoutes(authController: AuthController): Router {
  const router = Router();

  router.post('/register', validateRequest(registerSchema), authController.register);
  router.post('/login', validateRequest(loginSchema), authController.login);

  return router;
}