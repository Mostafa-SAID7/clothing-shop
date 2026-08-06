import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../domain/errors/app-error';
import { logger } from '../../infrastructure/logging/logger';
import { ResponseFormatter } from '../utils/response-formatter';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log error
  logger.error({
    err,
    req: {
      method: req.method,
      url: req.url,
      body: req.body,
      params: req.params,
      query: req.query,
    },
  }, 'Request error');

  // Handle operational errors (known errors)
  if (err instanceof AppError) {
    ResponseFormatter.error(res, err.message, err.statusCode);
    return;
  }

  // Handle unexpected errors
  logger.error({ err }, 'Unexpected error');
  ResponseFormatter.error(res, 'Internal server error', 500);
}