import { Request, Response, NextFunction } from 'express';
import { CreateOrderUseCase } from '../../application/use-cases/orders/create-order.use-case';
import { StripePaymentService } from '../../infrastructure/services/stripe-payment.service';

export class OrdersController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private stripeService: StripePaymentService
  ) {}

  public createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Assuming userId is attached to req by an auth middleware
      const userId = (req as any).user?.id || req.body.userId;
      
      const orderResponse = await this.createOrderUseCase.execute({
        userId,
        cartId: req.body.cartId,
        shippingAddress: req.body.shippingAddress,
        billingAddress: req.body.billingAddress,
        paymentMethod: req.body.paymentMethod,
        successUrl: req.body.successUrl,
        cancelUrl: req.body.cancelUrl,
      });

      res.status(201).json({
        status: 'success',
        data: orderResponse,
      });
    } catch (error) {
      next(error);
    }
  };

  public stripeWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const signature = req.headers['stripe-signature'];
      if (!signature) {
        res.status(400).send('No Stripe signature found');
        return;
      }

      // req.body must be the raw buffer here
      const event = this.stripeService.constructEvent(req.body, signature as string);

      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as any;
          // Handle successful checkout
          // We can use the orderId from metadata to update the order status
          const orderId = session.metadata?.orderId;
          if (orderId) {
            // Update order status logic here
            console.log(`Order ${orderId} has been paid via checkout session.`);
          }
          break;
        // Handle other events as needed
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.status(200).send({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).send(`Webhook Error: ${(error as Error).message}`);
    }
  };
}
