import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/lib/types";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: number) => void;
}

export function ProductCard({ product, isWishlisted, onToggleWishlist }: ProductCardProps) {
  const [, navigate] = useLocation();
  const { addToCart, cart } = useCart();
  const { t } = useLang();
  const { toast } = useToast();
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const size = product.sizes[0];
    const color = product.colors[0].name;
    const existingItem = cart.find(
      (i) => i.id === product.id && i.selectedSize === size && i.selectedColor === color
    );
    addToCart({ ...product, quantity: 1, selectedSize: size, selectedColor: color });
    if (existingItem) {
      toast({ title: "Quantity updated", description: `${product.name} — ${size}, ${color}` });
    } else {
      toast({ title: "Added to bag!", description: `${product.name} — ${size}, ${color}` });
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: product.name,
    });
  };

  const goToProduct = () => navigate(`/product/${product.slug}`);

  return (
    <Card className="rounded-[var(--radius-md)] overflow-hidden group border border-border/60 shadow-lift-sm hover:shadow-lift-md transition-shadow duration-200 cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-t-[var(--radius-md)]" onClick={goToProduct}>
        {!imgLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-t-[var(--radius-md)] rounded-b-none" />
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={`object-cover w-full h-full group-hover:scale-105 transition-all duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2 start-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="text-[10px] py-0 px-2 h-5">{t.newArrival}</Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive" className="text-[10px] py-0 px-2 h-5">{t.sale}</Badge>
          )}
        </div>
        {/* Wishlist */}
        <button
          className="absolute top-2 end-2 h-8 w-8 rounded-[var(--radius-pill)] bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
          onClick={handleWishlist}
          aria-label={t.wishlist}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isWishlisted ? "fill-[color:var(--color-wishlist)] text-[color:var(--color-wishlist)]" : "text-muted-foreground"}`}
          />
        </button>
        {/* Quick add on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 p-2">
          <Button className="w-full h-9 text-xs font-semibold" onClick={handleQuickAdd}>
            {t.addToCart}
          </Button>
        </div>
      </div>

      {/* Info */}
      <CardContent className="p-3 sm:p-4" onClick={goToProduct}>
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">
          {t.categories[product.category as keyof typeof t.categories] ?? product.category}
        </p>
        <h3 className="font-semibold text-sm leading-snug line-clamp-1 mb-1.5">{product.name}</h3>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3 w-3 fill-[color:var(--color-rating)] text-[color:var(--color-rating)]" />
          <span className="text-xs text-muted-foreground">{product.rating} ({product.reviewCount})</span>
        </div>
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {/* Color dots */}
        <div className="flex gap-1 mt-2">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3 w-3 rounded-[var(--radius-pill)] border border-border/50"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-muted-foreground self-center">+{product.colors.length - 4}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-border/60 bg-card">
      <Skeleton className="aspect-[3/4] w-full rounded-t-[var(--radius-md)] rounded-b-none" />
      <div className="p-3 sm:p-4 space-y-2.5">
        <Skeleton className="h-2.5 w-16" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-1.5 pt-1">
          <Skeleton className="h-3 w-3 rounded-[var(--radius-pill)]" />
          <Skeleton className="h-3 w-3 rounded-[var(--radius-pill)]" />
          <Skeleton className="h-3 w-3 rounded-[var(--radius-pill)]" />
        </div>
      </div>
    </div>
  );
}
