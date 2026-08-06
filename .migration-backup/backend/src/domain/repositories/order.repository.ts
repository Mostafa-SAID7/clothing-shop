import { Order, CreateOrderData, OrderStatus } from '../entities/order.entity';

export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string, limit?: number, offset?: number): Promise<Order[]>;
  create(orderData: CreateOrderData): Promise<Order>;
  updateStatus(id: string, status: OrderStatus): Promise<Order | null>;
  updateTrackingNumber(id: string, trackingNumber: string): Promise<Order | null>;
  findAll(limit?: number, offset?: number): Promise<Order[]>;
  findByStatus(status: OrderStatus, limit?: number, offset?: number): Promise<Order[]>;
  findByStripeSessionId(sessionId: string): Promise<Order | null>;
}