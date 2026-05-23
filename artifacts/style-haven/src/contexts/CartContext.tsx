import { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/lib/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((current) => {
      const existing = current.find(
        (i) =>
          i.id === item.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
      );
      if (existing) {
        return current.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...current, item];
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCart((current) =>
      current.filter(
        (i) =>
          !(
            i.id === item.id &&
            i.selectedSize === item.selectedSize &&
            i.selectedColor === item.selectedColor
          )
      )
    );
  };

  const updateQuantity = (item: CartItem, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(item);
      return;
    }
    setCart((current) =>
      current.map((i) =>
        i.id === item.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
          ? { ...i, quantity: newQuantity }
          : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
