import { Request, Response, NextFunction } from 'express';
import { AddToCartUseCase } from '../../application/use-cases/cart/add-to-cart.use-case';

export class CartController {
  constructor(private addToCartUseCase: AddToCartUseCase) {}

  public addToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user?.id || req.body.userId;
      const sessionId = req.cookies?.sessionId || req.body.sessionId;
      
      const cartResponse = await this.addToCartUseCase.execute({
        userId,
        sessionId,
        productId: req.body.productId,
        sizeId: req.body.sizeId,
        colorId: req.body.colorId,
        quantity: req.body.quantity,
      });

      res.status(200).json({
        status: 'success',
        data: cartResponse,
      });
    } catch (error) {
      next(error);
    }
  };
}
