import Stripe from 'stripe';
import { PaymentService } from '../../domain/services/payment.service';
import { Order } from '../../domain/entities/order.entity';

export class StripePaymentService implements PaymentService {
  private stripe: Stripe;

  constructor() {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    
    this.stripe = new Stripe(stripeKey, {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async createCheckoutSession(
    order: Order,
    successUrl: string,
    cancelUrl: string
  ): Promise<{ sessionId: string; url: string }> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productName,
            description: `Size: ${item.sizeName}, Color: ${item.colorName}`,
            images: [item.productImage],
          },
          unit_amount: Math.round(item.unitPrice * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        orderId: order.id,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'],
      },
    });

    return {
      sessionId: session.id,
      url: session.url!,
    };
  }

  async verifyPayment(sessionId: string): Promise<{ success: boolean; paymentIntentId?: string }> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      
      return {
        success: session.payment_status === 'paid',
        paymentIntentId: session.payment_intent as string,
      };
    } catch (error) {
      return { success: false };
    }
  }

  async refundPayment(paymentIntentId: string, amount?: number): Promise<{ success: boolean; refundId?: string }> {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined,
      });

      return {
        success: refund.status === 'succeeded',
        refundId: refund.id,
      };
    } catch (error) {
      return { success: false };
    }
  }

  async getPaymentStatus(sessionId: string): Promise<'pending' | 'succeeded' | 'failed' | 'canceled'> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      
      switch (session.payment_status) {
        case 'paid':
          return 'succeeded';
        case 'unpaid':
          return 'pending';
        default:
          return 'failed';
      }
    } catch (error) {
      return 'failed';
    }
  }

  constructEvent(payload: string | Buffer, signature: string): Stripe.Event {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required');
    }
    return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }
}