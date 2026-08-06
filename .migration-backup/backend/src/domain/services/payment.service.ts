import { Order } from '../entities/order.entity';

export interface PaymentService {
  createCheckoutSession(order: Order, successUrl: string, cancelUrl: string): Promise<{ sessionId: string; url: string }>;
  verifyPayment(sessionId: string): Promise<{ success: boolean; paymentIntentId?: string }>;
  refundPayment(paymentIntentId: string, amount?: number): Promise<{ success: boolean; refundId?: string }>;
  getPaymentStatus(sessionId: string): Promise<'pending' | 'succeeded' | 'failed' | 'canceled'>;
}