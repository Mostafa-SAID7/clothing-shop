import { CartRepository } from '../../../domain/repositories/cart.repository';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { AddToCartData, Cart } from '../../../domain/entities/cart.entity';

export interface AddToCartRequest {
  userId?: string;
  sessionId?: string;
  productId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
}

export interface AddToCartResponse {
  cart: Cart;
}

export class AddToCartUseCase {
  constructor(
    private cartRepository: CartRepository,
    private productRepository: ProductRepository
  ) {}

  async execute(request: AddToCartRequest): Promise<AddToCartResponse> {
    // Validate product exists and is available
    const product = await this.productRepository.findById(request.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Check inventory availability
    const isAvailable = await this.productRepository.checkAvailability(
      request.productId,
      request.sizeId,
      request.colorId,
      request.quantity
    );
    if (!isAvailable) {
      throw new Error('Insufficient inventory');
    }

    // Find or create cart
    let cart: Cart | null = null;
    
    if (request.userId) {
      cart = await this.cartRepository.findByUserId(request.userId);
    } else if (request.sessionId) {
      cart = await this.cartRepository.findBySessionId(request.sessionId);
    }

    if (!cart) {
      cart = await this.cartRepository.create(request.userId, request.sessionId);
    }

    // Add item to cart
    const itemData: AddToCartData = {
      productId: request.productId,
      sizeId: request.sizeId,
      colorId: request.colorId,
      quantity: request.quantity
    };

    await this.cartRepository.addItem(cart.id, itemData);

    // Get updated cart
    const updatedCart = await this.cartRepository.findById(cart.id);
    if (!updatedCart) {
      throw new Error('Failed to retrieve updated cart');
    }

    return { cart: updatedCart };
  }
}