import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    category: "T-Shirts",
    isNew: true,
    description: "Premium cotton t-shirt with a classic fit and superior comfort.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" }
    ],
    stock: 50
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    category: "Jeans",
    isNew: false,
    description: "Modern slim-fit jeans with stretch comfort technology.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Dark Blue", hex: "#000080" },
      { name: "Light Blue", hex: "#ADD8E6" },
      { name: "Black", hex: "#000000" }
    ],
    stock: 35
  },
  {
    id: 3,
    name: "Cotton Hoodie",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    category: "Hoodies",
    isNew: true,
    description: "Cozy cotton blend hoodie with kangaroo pocket.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Gray", hex: "#808080" },
      { name: "Navy", hex: "#000080" },
      { name: "Black", hex: "#000000" }
    ],
    stock: 25
  },
  {
    id: 4,
    name: "Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&q=80&w=800",
    category: "Jackets",
    isNew: false,
    description: "Classic denim jacket with vintage wash.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Light Wash", hex: "#ADD8E6" },
      { name: "Dark Wash", hex: "#000080" }
    ],
    stock: 20
  }
];

export const categories = ["All", "T-Shirts", "Jeans", "Hoodies", "Jackets"];