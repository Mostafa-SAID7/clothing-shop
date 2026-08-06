export interface AuthService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateToken(userId: string, email: string, role: string): string;
  verifyToken(token: string): Promise<{ userId: string; email: string; role: string } | null>;
  generateRefreshToken(userId: string): string;
  verifyRefreshToken(token: string): Promise<{ userId: string } | null>;
}