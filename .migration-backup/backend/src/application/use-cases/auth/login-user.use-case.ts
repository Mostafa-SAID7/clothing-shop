import { UserRepository } from '../../../domain/repositories/user.repository';
import { AuthService } from '../../../domain/services/auth.service';
import { User } from '../../../domain/entities/user.entity';
import { UserUtils } from '../../../domain/entities/user.utils';
import { UnauthorizedError } from '../../../domain/errors';

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  user: Omit<User, 'passwordHash'>;
  accessToken: string;
  refreshToken: string;
}

export class LoginUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    // Find user by email
    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await this.authService.comparePassword(request.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Generate tokens
    const accessToken = this.authService.generateToken(user.id, user.email, user.role);
    const refreshToken = this.authService.generateRefreshToken(user.id);

    // Return response without password hash
    return {
      user: UserUtils.sanitizeUser(user),
      accessToken,
      refreshToken
    };
  }
}