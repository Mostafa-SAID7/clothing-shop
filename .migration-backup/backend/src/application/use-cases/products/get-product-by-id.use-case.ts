import { ProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';
import { CacheService } from '../../../infrastructure/caching/cache.service';
import { Result } from '../../../shared/result';

export interface GetProductByIdRequest {
  id: string;
}

export interface GetProductByIdResponse {
  product: Product;
}

export class GetProductByIdUseCase {
  constructor(
    private productRepository: ProductRepository,
    private cacheService: CacheService,
  ) {}

  async execute(request: GetProductByIdRequest): Promise<Result<GetProductByIdResponse>> {
    const cacheKey = `product:${request.id}`;
    const cached = this.cacheService.get<GetProductByIdResponse>(cacheKey);
    if (cached) {
      return { success: true, data: cached };
    }
    const product = await this.productRepository.findById(request.id);
    if (!product) {
      return { success: false, error: new Error('Product not found') };
    }
    const response: GetProductByIdResponse = { product };
    this.cacheService.set(cacheKey, response);
    return { success: true, data: response };
  }
}