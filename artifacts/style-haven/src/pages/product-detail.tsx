import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { Heart, ShoppingBag, ChevronRight, Star, Info, Ruler, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { formatPrice } from "@/lib/utils";

function StarRating({ rating, count }: { rating: number; count: number }) {
  const { t } = useLang();
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
      <span className="text-sm font-medium">{rating}</span>
      <span className="text-sm text-muted-foreground">({count} {t.product.reviews})</span>
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const { addToCart } = useCart();
  const { t, isRTL } = useLang();
  const p = t.product;

  const product = products.find((pr) => pr.slug === slug);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlistRelated = (id: number) =>
    setWishlist((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          <h1 className="text-2xl font-bold">{p.notFound}</h1>
          <p className="text-muted-foreground">{p.notFoundSubtitle}</p>
          <Button onClick={() => navigate("/shop")}>{p.backToShop}</Button>
        </div>
      </Layout>
    );
  }

  const related = products
    .filter((pr) => pr.category === product.category && pr.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, selectedSize, selectedColor });
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 2000);
  };

  const sizeRows = ["XS", "S", "M", "L", "XL", "XXL"].filter((s) =>
    product.sizes.includes(s)
  );

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors">{t.nav.home}</button>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <button onClick={() => navigate("/shop")} className="hover:text-foreground transition-colors">{t.nav.shop}</button>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <button
            onClick={() => navigate(`/shop?cat=${product.category}`)}
            className="hover:text-foreground transition-colors"
          >
            {t.categories[product.category as keyof typeof t.categories] ?? product.category}
          </button>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <span className="text-foreground font-medium truncate max-w-[180px]">{product.name}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          {/* ── IMAGE GALLERY ── */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <img
                src={product.images[activeImg] ?? product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
                key={activeImg}
              />
              {product.isNew && (
                <Badge className="absolute top-3 start-3">{t.newArrival}</Badge>
              )}
              {product.originalPrice && (
                <Badge variant="destructive" className="absolute top-3 end-3">{t.sale}</Badge>
              )}
              {/* Prev / Next arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute start-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={() => setActiveImg((i) => (i + 1) % product.images.length)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                      i === activeImg ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── PRODUCT INFO ── */}
          <div className="flex flex-col gap-5">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Name */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{product.name}</h1>
              <div className="mt-2">
                <StarRating rating={product.rating} count={product.reviewCount} />
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive" className="text-xs">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm">{product.description}</p>

            <Separator />

            {/* Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">{p.selectSize}</Label>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <Ruler className="h-3.5 w-3.5" /> {p.sizeGuide}
                </button>
              </div>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-2"
              >
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={`sz-${size}`} className="sr-only" />
                    <Label
                      htmlFor={`sz-${size}`}
                      className={`cursor-pointer flex h-10 min-w-[2.5rem] px-3 items-center justify-center rounded-lg border text-sm font-medium transition-all select-none ${
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

            {/* Color */}
            <div className="space-y-3">
              <Label className="font-semibold">
                {p.selectColor}
                {selectedColor && <span className="font-normal text-muted-foreground ms-1.5">— {selectedColor}</span>}
              </Label>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-2"
              >
                {product.colors.map((color) => (
                  <div key={color.name}>
                    <RadioGroupItem value={color.name} id={`col-${color.name}`} className="sr-only" />
                    <Label
                      htmlFor={`col-${color.name}`}
                      className={`cursor-pointer flex items-center gap-2 h-10 px-3 rounded-lg border text-sm font-medium transition-all select-none ${
                        selectedColor === color.name
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-border/60 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <Label className="font-semibold">{p.quantity}</Label>
              <div className="flex items-center gap-2 border border-border rounded-lg overflow-hidden">
                <button
                  className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                <button
                  className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <span className="text-xs text-muted-foreground">{product.stock} {p.inStock}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <Button
                className="flex-1 h-12 text-base font-semibold gap-2"
                onClick={handleAddToCart}
                disabled={addedFlash}
              >
                <ShoppingBag className="h-5 w-5" />
                {addedFlash ? p.addedToCart : t.addToCart}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 shrink-0"
                onClick={() => setWishlisted((w) => !w)}
                aria-label={t.wishlist}
              >
                <Heart className={`h-5 w-5 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Details */}
            <div className="text-sm text-muted-foreground space-y-1.5 pt-2 border-t border-border">
              <p className="flex items-center gap-1.5"><Info className="h-3.5 w-3.5 shrink-0" /> {t.cart.shippingNote}</p>
              <p>SKU: {product.slug}</p>
              <p>
                {p.tags}:{" "}
                {product.tags.map((tag, i) => (
                  <span key={tag}>
                    <button
                      onClick={() => navigate(`/shop?q=${tag}`)}
                      className="capitalize hover:text-foreground transition-colors"
                    >
                      {tag}
                    </button>
                    {i < product.tags.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <div className="flex items-end justify-between mb-7">
              <h2 className="text-xl sm:text-2xl font-bold">{p.relatedProducts}</h2>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground"
                onClick={() => navigate(`/shop?cat=${product.category}`)}
              >
                {t.viewAll} <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {related.map((rp) => (
                <ProductCard
                  key={rp.id}
                  product={rp}
                  isWishlisted={wishlist.includes(rp.id)}
                  onToggleWishlist={toggleWishlistRelated}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── SIZE GUIDE MODAL ── */}
      <Dialog open={showSizeGuide} onOpenChange={setShowSizeGuide}>
        <DialogContent className="sm:max-w-lg w-[95vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ruler className="h-4 w-4" /> {p.sizeGuideTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {[p.sizeTable.size, p.sizeTable.chest, p.sizeTable.waist, p.sizeTable.hips].map((h) => (
                    <th key={h} className="py-2 px-3 text-start font-semibold text-muted-foreground whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeRows.map((s, i) => {
                  const row = p.sizeTable[s as keyof typeof p.sizeTable] as string[];
                  if (!row) return null;
                  return (
                    <tr key={s} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-muted/30" : ""}`}>
                      {row.map((cell, j) => (
                        <td key={j} className={`py-2.5 px-3 whitespace-nowrap ${j === 0 ? "font-bold" : ""}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Measurements in inches. When between sizes, size up.
          </p>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
