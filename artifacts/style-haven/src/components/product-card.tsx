import { Heart } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Product } from "@/lib/types";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: number) => void;
}

export function ProductCard({ product, isWishlisted, onToggleWishlist }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const { addToCart } = useCart();
  const { t } = useLang();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1, selectedSize, selectedColor });
    setIsOpen(false);
  };

  return (
    <>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-md transition-shadow duration-200">
        <div className="relative aspect-square overflow-hidden" onClick={() => setIsOpen(true)}>
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.isNew && (
            <Badge className="absolute top-2 start-2 text-xs">{t.newArrival}</Badge>
          )}
          <button
            className="absolute top-2 end-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
            aria-label="Wishlist"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
            />
          </button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm leading-snug line-clamp-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{t.categories[product.category as keyof typeof t.categories] ?? product.category}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="font-bold text-base">{formatPrice(product.price)}</span>
            <Button
              variant="default"
              size="sm"
              className="h-8 text-xs px-3"
              onClick={() => setIsOpen(true)}
            >
              {t.addToCart}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md w-[95vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">{product.name}</DialogTitle>
          </DialogHeader>
          <div className="flex gap-4 mt-2">
            <img
              src={product.image}
              alt={product.name}
              className="h-28 w-28 object-cover rounded-xl shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
              <p className="text-xs text-muted-foreground mt-1">Stock: {product.stock}</p>
              <p className="font-bold text-lg mt-2">{formatPrice(product.price)}</p>
            </div>
          </div>

          <div className="grid gap-4 mt-2">
            <div className="grid gap-2">
              <Label className="text-sm font-medium">{t.checkout.size}</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <RadioGroupItem value={size} id={`size-${product.id}-${size}`} className="sr-only" />
                    <Label
                      htmlFor={`size-${product.id}-${size}`}
                      className={`cursor-pointer px-3 py-1 rounded-md border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium">{t.checkout.color}</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <div key={color.name} className="flex items-center gap-1.5">
                    <RadioGroupItem value={color.name} id={`color-${product.id}-${color.name}`} className="sr-only" />
                    <Label
                      htmlFor={`color-${product.id}-${color.name}`}
                      className={`cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
                        selectedColor === color.name
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-border/50 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <Button onClick={handleAddToCart} className="w-full mt-2 h-11">
            {t.addToCart} — {formatPrice(product.price)}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
