import { ProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';

export interface GetProductByIdRequest {
  id: string;
}

export interface GetProductByIdResponse {
  product: Product;
}

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: GetProductByIdRequest): Promise<GetProductByIdResponse> {
    const product = await this.productRepository.findById(request.id);
    
    if (!product) {
      throw new Error('Product not found');
    }

    return { product };
  }
}