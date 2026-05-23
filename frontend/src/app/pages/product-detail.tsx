import { useState, useMemo } from "react";
import { useParams, useLocation } from "wouter";
import { Heart, ShoppingBag, ChevronRight, Star, Info, Ruler, ChevronLeft, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import { getProductReviews, getRatingBreakdown, type Review } from "@/lib/reviews";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="py-5 border-b border-border/50 last:border-0"
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-xs">
          {review.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <span className="font-semibold text-sm">{review.author}</span>
            {review.verified && (
              <Badge variant="secondary" className="text-[10px] h-4 px-1.5 font-normal">
                Verified
              </Badge>
            )}
            <span className="text-xs text-muted-foreground ms-auto">{review.date}</span>
          </div>
          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-3 w-3 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`}
              />
            ))}
          </div>
          <p className="font-semibold text-sm mb-1">{review.title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
          {/* Helpful */}
          <button className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ThumbsUp className="h-3 w-3" />
            Helpful ({review.helpful})
          </button>
        </div>
      </div>
    </motion.div>
  );
}

type SortMode = "recent" | "highest" | "lowest";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const { addToCart, cart } = useCart();
  const { t, isRTL } = useLang();
  const { toast } = useToast();
  const p = t.product;

  const product = products.find((pr) => pr.slug === slug);

  useSEO({
    title: product?.name,
    description: product?.description,
    image: product?.image,
  });

  const [activeImg, setActiveImg]           = useState(0);
  const [selectedSize, setSelectedSize]     = useState(product?.sizes[0] ?? "");
  const [selectedColor, setSelectedColor]   = useState(product?.colors[0]?.name ?? "");
  const [quantity, setQuantity]             = useState(1);
  const [wishlisted, setWishlisted]         = useState(false);
  const [showSizeGuide, setShowSizeGuide]   = useState(false);
  const [imgLoaded, setImgLoaded]           = useState(false);
  const [wishlist, setWishlist]             = useState<number[]>([]);
  const [sortMode, setSortMode]             = useState<SortMode>("recent");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const toggleWishlistRelated = (id: number) =>
    setWishlist((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const allReviews = useMemo(() => getProductReviews(slug ?? ""), [slug]);
  const breakdown  = useMemo(() => getRatingBreakdown(allReviews), [allReviews]);

  const sortedReviews = useMemo(() => {
    const copy = [...allReviews];
    if (sortMode === "highest") return copy.sort((a, b) => b.rating - a.rating);
    if (sortMode === "lowest")  return copy.sort((a, b) => a.rating - b.rating);
    return copy;
  }, [allReviews, sortMode]);

  const visibleReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3);

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
    const existingItem = cart.find(
      (i) => i.id === product.id && i.selectedSize === selectedSize && i.selectedColor === selectedColor
    );
    addToCart({ ...product, quantity, selectedSize, selectedColor });
    toast({
      title: existingItem ? "Quantity updated" : "Added to bag!",
      description: `${product.name} — ${selectedSize}, ${selectedColor}${existingItem ? ` (×${existingItem.quantity + quantity})` : ""}`,
    });
  };

  const handleWishlist = () => {
    setWishlisted((w) => !w);
    toast({
      title: wishlisted ? "Removed from wishlist" : "Saved to wishlist",
      description: product.name,
    });
  };

  const sizeRows = ["XS", "S", "M", "L", "XL", "XXL"].filter((s) => product.sizes.includes(s));

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors">{t.nav.home}</button>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <button onClick={() => navigate("/shop")} className="hover:text-foreground transition-colors">{t.nav.shop}</button>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <button onClick={() => navigate(`/shop?cat=${product.category}`)} className="hover:text-foreground transition-colors">
            {t.categories[product.category as keyof typeof t.categories] ?? product.category}
          </button>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <span className="text-foreground font-medium truncate max-w-[180px]">{product.name}</span>
        </nav>
      </div>

      {/* Main product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          {/* ── IMAGE GALLERY ── */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              {!imgLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-none" />}
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeImg}
                  src={product.images[activeImg] ?? product.image}
                  alt={product.name}
                  onLoad={() => setImgLoaded(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imgLoaded ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {product.isNew && <Badge className="absolute top-3 start-3">{t.newArrival}</Badge>}
              {product.originalPrice && <Badge variant="destructive" className="absolute top-3 end-3">{t.sale}</Badge>}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => { setImgLoaded(false); setActiveImg((i) => (i - 1 + product.images.length) % product.images.length); }}
                    className="absolute start-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={() => { setImgLoaded(false); setActiveImg((i) => (i + 1) % product.images.length); }}
                    className="absolute end-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setImgLoaded(false); setActiveImg(i); }}
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
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full capitalize">
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{product.name}</h1>
              <div className="mt-2">
                <StarRating rating={product.rating} count={product.reviewCount} />
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  <Badge variant="destructive" className="text-xs">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm">{product.description}</p>
            <Separator />

            {/* Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">{p.selectSize}</Label>
                <button onClick={() => setShowSizeGuide(true)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                  <Ruler className="h-3.5 w-3.5" /> {p.sizeGuide}
                </button>
              </div>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
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
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <div key={color.name}>
                    <RadioGroupItem value={color.name} id={`col-${color.name}`} className="sr-only" />
                    <Label
                      htmlFor={`col-${color.name}`}
                      className={`cursor-pointer flex items-center gap-2 h-10 px-3 rounded-lg border text-sm font-medium transition-all select-none ${
                        selectedColor === color.name ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="h-4 w-4 rounded-full border border-border/60 shrink-0" style={{ backgroundColor: color.hex }} />
                      {color.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <Label className="font-semibold">{p.quantity}</Label>
              <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden">
                <button className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}>−</button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                <button className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} disabled={quantity >= product.stock}>+</button>
              </div>
              <span className="text-xs text-muted-foreground">{product.stock} {p.inStock}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <Button className="flex-1 h-12 text-base font-semibold gap-2" onClick={handleAddToCart}>
                <ShoppingBag className="h-5 w-5" />
                {t.addToCart}
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 shrink-0" onClick={handleWishlist} aria-label={t.wishlist}>
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
                    <button onClick={() => navigate(`/shop?q=${tag}`)} className="capitalize hover:text-foreground transition-colors">{tag}</button>
                    {i < product.tags.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* ── REVIEWS SECTION ── */}
        {allReviews.length > 0 && (
          <motion.section
            className="mt-16 sm:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Separator className="mb-10" />

            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Customer Reviews</h2>
                <p className="text-sm text-muted-foreground mt-1">{allReviews.length} reviews for {product.name}</p>
              </div>
              <Select value={sortMode} onValueChange={(v) => setSortMode(v as SortMode)}>
                <SelectTrigger className="w-44 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
              {/* ── Rating summary ── */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  {/* Big score */}
                  <div className="text-center py-6 rounded-2xl bg-muted/30 border border-border/50">
                    <span className="text-6xl font-black leading-none">{product.rating}</span>
                    <div className="flex items-center justify-center gap-1 mt-2 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-4 w-4 ${s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/25"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{product.reviewCount.toLocaleString()} reviews</p>
                  </div>

                  {/* Breakdown bars */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = breakdown[star] ?? 0;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-right text-muted-foreground shrink-0">{star}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 shrink-0" />
                          <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              className="h-full bg-yellow-400 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.7, delay: (5 - star) * 0.07, ease: "easeOut" }}
                            />
                          </div>
                          <span className="w-7 text-right text-muted-foreground shrink-0">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── Review cards ── */}
              <div className="lg:col-span-2">
                <AnimatePresence>
                  {visibleReviews.map((review, i) => (
                    <ReviewCard key={review.id} review={review} index={i} />
                  ))}
                </AnimatePresence>

                {sortedReviews.length > 3 && (
                  <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <Button variant="outline" onClick={() => setShowAllReviews((v) => !v)} className="gap-2">
                      {showAllReviews
                        ? "Show fewer reviews"
                        : `Show all ${sortedReviews.length} reviews`}
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <Separator className="mb-10" />
            <div className="flex items-end justify-between mb-7">
              <h2 className="text-xl sm:text-2xl font-bold">{p.relatedProducts}</h2>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground" onClick={() => navigate(`/shop?cat=${product.category}`)}>
                {t.viewAll} <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {related.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                >
                  <ProductCard product={rp} isWishlisted={wishlist.includes(rp.id)} onToggleWishlist={toggleWishlistRelated} />
                </motion.div>
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
                    <th key={h} className="py-2 px-3 text-start font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
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
                        <td key={j} className={`py-2.5 px-3 whitespace-nowrap ${j === 0 ? "font-bold" : ""}`}>{cell}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Measurements in inches. When between sizes, size up.</p>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
