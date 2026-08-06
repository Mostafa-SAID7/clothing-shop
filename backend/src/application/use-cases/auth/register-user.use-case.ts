import { UserRepository } from '../../../domain/repositories/user.repository';
import { AuthService } from '../../../domain/services/auth.service';
import { EmailService } from '../../../domain/services/email.service';
import { CreateUserData, User, UserRole } from '../../../domain/entities/user.entity';
import { UserUtils } from '../../../domain/entities/user.utils';
import { ConflictError } from '../../../domain/errors';

export interface RegisterUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterUserResponse {
  user: Omit<User, 'passwordHash'>;
  accessToken: string;
  refreshToken: string;
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
    private emailService: EmailService
  ) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const passwordHash = await this.authService.hashPassword(request.password);

    // Create user data
    const userData: CreateUserData = {
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      password: passwordHash,
      role: UserRole.CUSTOMER
    };

    // Create user
    const user = await this.userRepository.create(userData);

    // Generate tokens
    const accessToken = this.authService.generateToken(user.id, user.email, user.role);
    const refreshToken = this.authService.generateRefreshToken(user.id);

    // Send welcome email
    await this.emailService.sendWelcomeEmail(user.email, user.firstName);

    // Return response without password hash
    return {
      user: UserUtils.sanitizeUser(user),
      accessToken,
      refreshToken
    };
  }
}