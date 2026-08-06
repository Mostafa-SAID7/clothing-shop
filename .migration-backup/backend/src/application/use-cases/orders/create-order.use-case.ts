import { OrderRepository } from '../../../domain/repositories/order.repository';
import { CartRepository } from '../../../domain/repositories/cart.repository';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { PaymentService } from '../../../domain/services/payment.service';
import { EmailService } from '../../../domain/services/email.service';
import { CreateOrderData, Order, PaymentMethod } from '../../../domain/entities/order.entity';
import { Address } from '../../../domain/entities/order.entity';

export interface CreateOrderRequest {
  userId: string;
  cartId: string;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  successUrl: string;
  cancelUrl: string;
}

export interface CreateOrderResponse {
  order: Order;
  paymentUrl?: string;
  sessionId?: string;
}

export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private cartRepository: CartRepository,
    private productRepository: ProductRepository,
    private paymentService: PaymentService,
    private emailService: EmailService
  ) {}

  async execute(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    // Get cart
    const cart = await this.cartRepository.findById(request.cartId);
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty or not found');
    }

    // Verify inventory for all items
    for (const item of cart.items) {
      const isAvailable = await this.productRepository.checkAvailability(
        item.productId,
        item.sizeId,
        item.colorId,
        item.quantity
      );
      if (!isAvailable) {
        throw new Error(`Insufficient inventory for ${item.productName}`);
      }
    }

    // Create order data
    const orderData: CreateOrderData = {
      userId: request.userId,
      items: cart.items.map(item => ({
        productId: item.productId,
        sizeId: item.sizeId,
        colorId: item.colorId,
        quantity: item.quantity
      })),
      shippingAddress: request.shippingAddress,
      billingAddress: request.billingAddress,
      paymentMethod: request.paymentMethod
    };

    // Create order
    const order = await this.orderRepository.create(orderData);

    let paymentUrl: string | undefined;
    let sessionId: string | undefined;

    // Handle payment based on method
    if (request.paymentMethod === PaymentMethod.STRIPE) {
      const paymentResult = await this.paymentService.createCheckoutSession(
        order,
        request.successUrl,
        request.cancelUrl
      );
      paymentUrl = paymentResult.url;
      sessionId = paymentResult.sessionId;
    }

    // Reserve inventory
    for (const item of cart.items) {
      await this.productRepository.updateInventory(
        item.productId,
        item.sizeId,
        item.colorId,
        -item.quantity
      );
    }

    // Clear cart
    await this.cartRepository.clearCart(request.cartId);

    // Send order confirmation email
    await this.emailService.sendOrderConfirmation(
      request.userId, // This should be user email, but we'll need to get it from user repository
      order.id,
      order
    );

    return {
      order,
      paymentUrl,
      sessionId
    };
  }
}