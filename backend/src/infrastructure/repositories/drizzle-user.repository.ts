import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User, CreateUserData, UpdateUserData, UserRole } from '../../domain/entities/user.entity';
import { users } from '../database/schema';
import * as schema from '../database/schema';

export class DrizzleUserRepository implements UserRepository {
  constructor(private db: NodePgDatabase<typeof schema>) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] ? this.mapToUser(result[0]) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] ? this.mapToUser(result[0]) : null;
  }

  async create(userData: CreateUserData): Promise<User> {
    const result = await this.db.insert(users).values({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      passwordHash: userData.password, // This should be hashed already
      role: userData.role || UserRole.CUSTOMER,
    }).returning();
    
    return this.mapToUser(result[0]);
  }

  async update(id: string, userData: UpdateUserData): Promise<User | null> {
    const result = await this.db.update(users)
      .set({
        ...userData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    
    return result[0] ? this.mapToUser(result[0]) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db.delete(users).where(eq(users.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async findAll(limit = 50, offset = 0): Promise<User[]> {
    const result = await this.db.select().from(users).limit(limit).offset(offset);
    return result.map(user => this.mapToUser(user));
  }

  async verifyEmail(id: string): Promise<boolean> {
    const result = await this.db.update(users)
      .set({ isEmailVerified: true, updatedAt: new Date() })
      .where(eq(users.id, id));
    
    return (result.rowCount ?? 0) > 0;
  }

  private mapToUser(dbUser: typeof users.$inferSelect): User {
    return {
      ...dbUser,
      role: dbUser.role as UserRole,
    };
  }
}