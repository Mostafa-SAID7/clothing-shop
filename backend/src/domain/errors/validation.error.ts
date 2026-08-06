import { AppError } from './app-error';

export class ValidationError extends AppError {
  readonly statusCode = 400;
  readonly isOperational = true;

  constructor(message: string, public readonly details?: any) {
    super(message);
  }
}