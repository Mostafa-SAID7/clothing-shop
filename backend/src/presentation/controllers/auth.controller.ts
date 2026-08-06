import { Request, Response } from 'express';
import { RegisterUserUseCase, LoginUserUseCase } from '../../application/use-cases';
import { ResponseFormatter } from '../utils/response-formatter';
import { AppError } from '../../domain/errors';

export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, firstName, lastName, password } = req.body;

      const result = await this.registerUserUseCase.execute({
        email,
        firstName,
        lastName,
        password,
      });

      ResponseFormatter.created(res, result);
    } catch (error: any) {
      if (error instanceof AppError) {
        ResponseFormatter.error(res, error.message, error.statusCode);
      } else {
        ResponseFormatter.error(res, error.message, 400);
      }
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const result = await this.loginUserUseCase.execute({
        email,
        password,
      });

      ResponseFormatter.success(res, result);
    } catch (error: any) {
      if (error instanceof AppError) {
        ResponseFormatter.error(res, error.message, error.statusCode);
      } else {
        ResponseFormatter.error(res, error.message, 401);
      }
    }
  };
}