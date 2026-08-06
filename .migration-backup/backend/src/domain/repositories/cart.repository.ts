import { Cart, CartItem, AddToCartData, UpdateCartItemData } from '../entities/cart.entity';

export interface CartRepository {
  findById(id: string): Promise<Cart | null>;
  findByUserId(userId: string): Promise<Cart | null>;
  findBySessionId(sessionId: string): Promise<Cart | null>;
  create(userId?: string, sessionId?: string): Promise<Cart>;
  addItem(cartId: string, itemData: AddToCartData): Promise<CartItem>;
  updateItem(cartId: string, itemId: string, itemData: UpdateCartItemData): Promise<CartItem | null>;
  removeItem(cartId: string, itemId: string): Promise<boolean>;
  clearCart(cartId: string): Promise<boolean>;
  mergeCart(fromCartId: string, toCartId: string): Promise<boolean>;
}