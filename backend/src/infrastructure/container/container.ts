import { db } from '../database/connection';

// Repositories
import { DrizzleUserRepository } from '../repositories/drizzle-user.repository';

// Services
import { BcryptAuthService } from '../services/bcrypt-auth.service';
import { StripePaymentService } from '../services/stripe-payment.service';
import { ConsoleEmailService } from '../services/console-email.service';

// Use Cases
import { RegisterUserUseCase, LoginUserUseCase, GetProductsUseCase, GetProductByIdUseCase } from '../../application/use-cases';

// Controllers
import { AuthController } from '../../presentation/controllers/auth.controller';
import { ProductsController } from '../../presentation/controllers/products.controller';

export class Container {
  private static instance: Container;
  
  // Database
  public readonly db;
  
  // Repositories
  public readonly userRepository: DrizzleUserRepository;
  
  // Services
  public readonly authService: BcryptAuthService;
  public readonly paymentService: StripePaymentService;
  public readonly emailService: ConsoleEmailService;
  
  // Use Cases
  public readonly registerUserUseCase: RegisterUserUseCase;
  public readonly loginUserUseCase: LoginUserUseCase;
  public readonly getProductsUseCase: GetProductsUseCase;
  public readonly getProductByIdUseCase: GetProductByIdUseCase;
  
  // Controllers
  public readonly authController: AuthController;
  public readonly productsController: ProductsController;

  private constructor() {
    // Use shared database connection from connection module
    this.db = db;

    // Initialize repositories
    this.userRepository = new DrizzleUserRepository(this.db);

    // Initialize services
    this.authService = new BcryptAuthService();
    this.paymentService = new StripePaymentService();
    this.emailService = new ConsoleEmailService();

    // Initialize use cases
    this.registerUserUseCase = new RegisterUserUseCase(
      this.userRepository,
      this.authService,
      this.emailService
    );
    
    this.loginUserUseCase = new LoginUserUseCase(
      this.userRepository,
      this.authService
    );

    // TODO: Add product repository and initialize these use cases
    this.getProductsUseCase = {} as any;
    this.getProductByIdUseCase = {} as any;

    // Initialize controllers
    this.authController = new AuthController(
      this.registerUserUseCase,
      this.loginUserUseCase
    );

    this.productsController = new ProductsController(
      this.getProductsUseCase,
      this.getProductByIdUseCase
    );
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }
}