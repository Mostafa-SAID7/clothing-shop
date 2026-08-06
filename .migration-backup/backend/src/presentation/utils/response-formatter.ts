import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class ResponseFormatter {
  static success<T>(res: Response, data: T, statusCode: number = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
    };
    res.status(statusCode).json(response);
  }

  static successWithMeta<T>(
    res: Response,
    data: T,
    meta: PaginationMeta,
    statusCode: number = 200
  ): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      meta,
    };
    res.status(statusCode).json(response);
  }

  static error(res: Response, error: string, statusCode: number = 500): void {
    const response: ApiResponse = {
      success: false,
      error,
    };
    res.status(statusCode).json(response);
  }

  static created<T>(res: Response, data: T): void {
    ResponseFormatter.success(res, data, 201);
  }

  static noContent(res: Response): void {
    res.status(204).send();
  }
}