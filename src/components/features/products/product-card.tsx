"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Product, CartItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (item: CartItem) => void;
}

export function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor,
    });
    setIsOpen(false);
  };

  return (
    <>
      <Card className="overflow-hidden group">
        <div className="relative aspect-square cursor-pointer" onClick={() => setIsOpen(true)}>
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
          />
          {product.isNew && (
            <Badge className="absolute top-2 left-2">New Arrival</Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold">{formatPrice(product.price)}</span>
            <Button variant="default" size="sm" onClick={() => setIsOpen(true)}>
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Size</Label>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex gap-2"
              >
                {product.sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={`size-${size}`} />
                    <Label htmlFor={`size-${size}`}>{size}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label>Color</Label>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex gap-2"
              >
                {product.colors.map((color) => (
                  <div key={color.name} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={color.name}
                      id={`color-${color.name}`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <Label htmlFor={`color-${color.name}`}>{color.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <p className="text-sm">In stock: {product.stock}</p>
          </div>
          <Button onClick={handleAddToCart} className="w-full">
            Add to Cart - {formatPrice(product.price)}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}