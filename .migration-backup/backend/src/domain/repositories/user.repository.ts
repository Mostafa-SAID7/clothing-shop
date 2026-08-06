import { User, CreateUserData, UpdateUserData } from '../entities/user.entity';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: CreateUserData): Promise<User>;
  update(id: string, userData: UpdateUserData): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findAll(limit?: number, offset?: number): Promise<User[]>;
  verifyEmail(id: string): Promise<boolean>;
}