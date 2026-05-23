import { Product, CreateProductData, UpdateProductData, ProductFilter } from '../entities/product.entity';

export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(filter?: ProductFilter, limit?: number, offset?: number): Promise<Product[]>;
  create(productData: CreateProductData): Promise<Product>;
  update(id: string, productData: UpdateProductData): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
  findByCategory(category: string, limit?: number, offset?: number): Promise<Product[]>;
  findByBrand(brand: string, limit?: number, offset?: number): Promise<Product[]>;
  search(query: string, limit?: number, offset?: number): Promise<Product[]>;
  updateInventory(productId: string, sizeId: string, colorId: string, quantity: number): Promise<boolean>;
  checkAvailability(productId: string, sizeId: string, colorId: string, quantity: number): Promise<boolean>;
}