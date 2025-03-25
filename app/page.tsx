"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/ui/cart-drawer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/lib/data";
import { CartItem } from "@/lib/types";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const toggleWishlist = (productId: number) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const addToCart = (item: CartItem) => {
    setCart((current) => {
      const existingItem = current.find(
        (i) =>
          i.id === item.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
      );

      if (existingItem) {
        return current.map((i) =>
          i === existingItem
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...current, item];
    });
  };

  const updateCartItemQuantity = (item: CartItem, newQuantity: number) => {
    setCart((current) =>
      newQuantity === 0
        ? current.filter(
            (i) =>
              !(
                i.id === item.id &&
                i.selectedSize === item.selectedSize &&
                i.selectedColor === item.selectedColor
              )
          )
        : current.map((i) =>
            i.id === item.id &&
            i.selectedSize === item.selectedSize &&
            i.selectedColor === item.selectedColor
              ? { ...i, quantity: newQuantity }
              : i
          )
    );
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">STYLE HAVEN</h1>
            <div className="flex items-center space-x-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <CartDrawer
                cart={cart}
                updateQuantity={updateCartItemQuantity}
                removeFromCart={removeFromCart}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={toggleWishlist}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
}