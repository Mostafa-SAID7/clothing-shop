import { ProductRepository } from '../../../domain/repositories/product.repository';
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
  constructor(private productRepository: ProductRepository) {}

  async execute(request: GetProductsRequest): Promise<GetProductsResponse> {
    const page = request.page || 1;
    const limit = request.limit || 20;
    const offset = (page - 1) * limit;

    // Get products with filter
    const products = await this.productRepository.findAll(request.filter, limit, offset);
    
    // For simplicity, we'll return the count of fetched products as total
    // In a real implementation, you'd want a separate count query
    const total = products.length;
    const totalPages = Math.ceil(total / limit);

    return {
      products,
      total,
      page,
      limit,
      totalPages
    };
  }
}