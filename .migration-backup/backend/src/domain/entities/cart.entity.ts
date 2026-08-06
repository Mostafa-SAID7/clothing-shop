export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  sizeId: string;
  sizeName: string;
  colorId: string;
  colorName: string;
  quantity: number;
  totalPrice: number;
}

export interface AddToCartData {
  productId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
}

export interface UpdateCartItemData {
  quantity: number;
}