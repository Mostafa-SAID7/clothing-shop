import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthService } from '../../domain/services/auth.service';

export class BcryptAuthService implements AuthService {
  private readonly jwtSecret: string;
  private readonly jwtRefreshSecret: string;
  private readonly saltRounds = 12;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  generateToken(userId: string, email: string, role: string): string {
    return jwt.sign(
      { userId, email, role },
      this.jwtSecret,
      { expiresIn: '1h' }
    );
  }

  async verifyToken(token: string): Promise<{ userId: string; email: string; role: string } | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any;
      return {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };
    } catch (error) {
      return null;
    }
  }

  generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId },
      this.jwtRefreshSecret,
      { expiresIn: '7d' }
    );
  }

  async verifyRefreshToken(token: string): Promise<{ userId: string } | null> {
    try {
      const decoded = jwt.verify(token, this.jwtRefreshSecret) as any;
      return { userId: decoded.userId };
    } catch (error) {
      return null;
    }
  }
}