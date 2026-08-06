import { EmailService } from '../../domain/services/email.service';

export class ConsoleEmailService implements EmailService {
  async sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
    console.log(`[EMAIL] Welcome email sent to ${email} for ${firstName}`);
    return true;
  }

  async sendEmailVerification(email: string, verificationToken: string): Promise<boolean> {
    console.log(`[EMAIL] Email verification sent to ${email} with token: ${verificationToken}`);
    return true;
  }

  async sendPasswordReset(email: string, resetToken: string): Promise<boolean> {
    console.log(`[EMAIL] Password reset sent to ${email} with token: ${resetToken}`);
    return true;
  }

  async sendOrderConfirmation(email: string, orderId: string, orderDetails: any): Promise<boolean> {
    console.log(`[EMAIL] Order confirmation sent to ${email} for order: ${orderId}`);
    console.log(`[EMAIL] Order details:`, JSON.stringify(orderDetails, null, 2));
    return true;
  }

  async sendOrderStatusUpdate(email: string, orderId: string, status: string, trackingNumber?: string): Promise<boolean> {
    console.log(`[EMAIL] Order status update sent to ${email} for order: ${orderId}`);
    console.log(`[EMAIL] New status: ${status}${trackingNumber ? `, Tracking: ${trackingNumber}` : ''}`);
    return true;
  }
}