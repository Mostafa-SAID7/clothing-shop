export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew: boolean;
  description: string;
  sizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}