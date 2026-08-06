import { ProductRepository } from '../../../domain/repositories/product.repository';
import { CacheService } from '../../../infrastructure/caching/cache.service';
import { Product, ProductFilter } from '../../../domain/entities/product.entity';

export interface GetProductsRequest {
  filter?: ProductFilter;
  page?: number;
  limit?: number;
}

export interface GetProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class GetProductsUseCase {
  constructor(
    private productRepository: ProductRepository,
    private cacheService: CacheService
  ) {}

  async execute(request: GetProductsRequest): Promise<GetProductsResponse> {
    // Parse pagination parameters (limit and offset) with defaults from schema
    const limit = request.limit ?? 20;
    const offset = request.page ? (request.page - 1) * limit : 0;

    const filter = request.filter ?? {};
    const cacheKey = `products:${limit}:${offset}:${JSON.stringify(filter)}`;

    // Try cache first
    const cached = this.cacheService.get<GetProductsResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch products from repository with pagination
    const products = await this.productRepository.findAll(filter, limit, offset);
    const total = await this.productRepository.count();
    const totalPages = Math.ceil(total / limit);
    const page = Math.floor(offset / limit) + 1;

    const result: GetProductsResponse = {
      products,
      total,
      page,
      limit,
      totalPages,
    };

    // Cache the result for subsequent requests
    this.cacheService.set(cacheKey, result);
    return result;
  }
}