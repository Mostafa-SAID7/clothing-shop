import { AppError } from './app-error';

export class ForbiddenError extends AppError {
  readonly statusCode = 403;
  readonly isOperational = true;

  constructor(message: string = 'Forbidden') {
    super(message);
  }
}