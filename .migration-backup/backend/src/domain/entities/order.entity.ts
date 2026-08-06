export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  sizeId: string;
  sizeName: string;
  colorId: string;
  colorName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export enum PaymentMethod {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  CASH_ON_DELIVERY = 'cash_on_delivery'
}

export interface CreateOrderData {
  userId: string;
  items: CreateOrderItemData[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
}

export interface CreateOrderItemData {
  productId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
}