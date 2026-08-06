export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  inventory: ProductInventory[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSize {
  id: string;
  name: string;
  value: string;
}

export interface ProductColor {
  id: string;
  name: string;
  hexCode: string;
}

export interface ProductInventory {
  id: string;
  productId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
  reservedQuantity: number;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  sizes: string[];
  colors: string[];
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  brand?: string;
  images?: string[];
  isActive?: boolean;
}

export interface ProductFilter {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  search?: string;
}