import { AppError } from './app-error';

export class UnauthorizedError extends AppError {
  readonly statusCode = 401;
  readonly isOperational = true;

  constructor(message: string = 'Unauthorized') {
    super(message);
  }
}