export interface EmailService {
  sendWelcomeEmail(email: string, firstName: string): Promise<boolean>;
  sendEmailVerification(email: string, verificationToken: string): Promise<boolean>;
  sendPasswordReset(email: string, resetToken: string): Promise<boolean>;
  sendOrderConfirmation(email: string, orderId: string, orderDetails: any): Promise<boolean>;
  sendOrderStatusUpdate(email: string, orderId: string, status: string, trackingNumber?: string): Promise<boolean>;
}