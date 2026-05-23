import { Request, Response } from 'express';
import { GetProductsUseCase, GetProductByIdUseCase } from '../../application/use-cases';
import { ResponseFormatter } from '../utils/response-formatter';
import { paginationSchema } from '../../shared/dto/pagination.dto';
import { AppError } from '../../domain/errors';
import { ValidationError } from '../../domain/errors';

export class ProductsController {
  constructor(
    private getProductsUseCase: GetProductsUseCase,
    private getProductByIdUseCase: GetProductByIdUseCase
  ) {}

  getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { limit, offset, page } = paginationSchema.parse(req.query);
      const { category, brand, minPrice, maxPrice, search } = req.query;

      const result = await this.getProductsUseCase.execute({
        filter: {
          category: QueryParser.parseString(category),
          brand: QueryParser.parseString(brand),
          minPrice: QueryParser.parseNumber(minPrice),
          maxPrice: QueryParser.parseNumber(maxPrice),
          search: QueryParser.parseString(search),
        },
        page,
        limit,
      });

      ResponseFormatter.successWithMeta(res, result.products, {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        ResponseFormatter.error(res, error.message, error.statusCode);
      } else {
        ResponseFormatter.error(res, error.message, 500);
      }
    }
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id || typeof id !== 'string') {
        throw new ValidationError('Invalid product ID');
      }

      const result = await this.getProductByIdUseCase.execute({ id });

      ResponseFormatter.success(res, result);
    } catch (error: any) {
      if (error instanceof AppError) {
        ResponseFormatter.error(res, error.message, error.statusCode);
      } else {
        ResponseFormatter.error(res, error.message, 500);
      }
    }
  };
}