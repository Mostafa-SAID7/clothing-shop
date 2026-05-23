import { User } from './user.entity';

export class UserUtils {
  /**
   * Remove sensitive information from user object
   */
  static sanitizeUser(user: User): Omit<User, 'passwordHash'> {
    const { passwordHash: _, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  /**
   * Check if user has admin role
   */
  static isAdmin(user: User): boolean {
    return user.role === 'admin';
  }

  /**
   * Get user display name
   */
  static getDisplayName(user: User): string {
    return `${user.firstName} ${user.lastName}`.trim();
  }

  /**
   * Check if user email is verified
   */
  static isEmailVerified(user: User): boolean {
    return user.isEmailVerified;
  }
}