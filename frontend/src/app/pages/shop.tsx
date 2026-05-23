import { useState, useMemo, useEffect } from "react";
import { useSearch } from "wouter";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { PageHero } from "@/components/page-hero";
import { LottiePlayer, LOTTIE } from "@/components/lottie-player";
import { products, categories } from "@/lib/data";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";

const ITEMS_PER_PAGE = 8;

export default function ShopPage() {
  useSEO({ title: "Shop", description: "Browse HAVEN's full collection of premium T-Shirts, Jeans, Hoodies, and Jackets. Free shipping on orders over $50." });
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialCat  = params.get("cat") || "All";
  const initialQ    = params.get("q")   || "";
  const initialNew  = params.get("new") === "true";

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery]           = useState(initialQ);
  const [onlyNew, setOnlyNew]                   = useState(initialNew);
  const [wishlist, setWishlist]                 = useState<number[]>([]);
  const [page, setPage]                         = useState(1);
  const [loading, setLoading]                   = useState(true);
  const { t } = useLang();

  /* Sync filters when URL search params change (e.g. footer/nav links) */
  useEffect(() => {
    const p = new URLSearchParams(search);
    setSelectedCategory(p.get("cat") || "All");
    setSearchQuery(p.get("q") || "");
    setOnlyNew(p.get("new") === "true");
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(timer);
  }, []);

  const toggleWishlist = (id: number) =>
    setWishlist((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const filteredProducts = useMemo(
    () =>
      products.filter((p) => {
        const catMatch = selectedCategory === "All" || p.category === selectedCategory;
        const searchMatch =
          searchQuery === "" ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const newMatch = !onlyNew || p.isNew;
        return catMatch && searchMatch && newMatch;
      }),
    [selectedCategory, searchQuery, onlyNew]
  );

  const totalPages        = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage          = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  useEffect(() => { setPage(1); }, [selectedCategory, searchQuery, onlyNew]);

  const clearFilters = () => { setSelectedCategory("All"); setSearchQuery(""); setOnlyNew(false); setPage(1); };
  const hasFilters   = selectedCategory !== "All" || searchQuery || onlyNew;

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Layout>
      {/* ── HERO ─── */}
      <PageHero
        badge={t.brand}
        title={onlyNew ? t.home.newArrivals : t.nav.shop}
        subtitle={onlyNew ? t.home.newArrivalsSubtitle : t.tagline}
        bgImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80"
        overlayOpacity={0.68}
        light
        className="min-h-[220px] sm:min-h-[260px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── FILTERS BAR ─── */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 h-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-wrap">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
            {/* New Arrivals pill */}
            <Button
              variant={onlyNew ? "default" : "outline"}
              size="sm"
              onClick={() => setOnlyNew((v) => !v)}
              className="whitespace-nowrap h-9 rounded-full px-4 shrink-0"
            >
              {t.home.newArrivals}
            </Button>
            {categories.filter((c) => c !== "All").map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory((prev) => (prev === cat ? "All" : cat))}
                className="whitespace-nowrap h-9 rounded-full px-4 shrink-0"
              >
                {t.categories[cat as keyof typeof t.categories] ?? cat}
              </Button>
            ))}
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-xs h-9 shrink-0">
                <X className="h-3 w-3" /> Clear
              </Button>
            )}
          </div>
        </motion.div>

        {/* ── RESULTS META ─── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {loading ? (
              <span className="inline-block w-44 h-4 bg-muted rounded animate-pulse" />
            ) : filteredProducts.length > 0 ? (
              <>
                Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safePage * ITEMS_PER_PAGE, filteredProducts.length)}{" "}
                of {filteredProducts.length} products
                {selectedCategory !== "All" && (
                  <> in <span className="font-medium text-foreground">{t.categories[selectedCategory as keyof typeof t.categories]}</span></>
                )}
                {onlyNew && <> · <span className="font-medium text-foreground">New Arrivals</span></>}
              </>
            ) : (
              "No products found"
            )}
          </p>
        </div>

        {/* ── GRID ─── */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {paginatedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <ProductCard
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={toggleWishlist}
                  />
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline" size="sm" className="gap-1"
                  disabled={safePage === 1}
                  onClick={() => { setPage((p) => p - 1); scrollTop(); }}
                >
                  <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                    const near = Math.abs(pg - safePage) <= 1 || pg === 1 || pg === totalPages;
                    const isDot = !near && (pg === safePage - 2 || pg === safePage + 2);
                    if (!near && !isDot) return null;
                    if (isDot) return <span key={pg} className="text-muted-foreground text-sm w-8 text-center">…</span>;
                    return (
                      <Button
                        key={pg}
                        variant={pg === safePage ? "default" : "outline"}
                        size="sm" className="h-9 w-9 p-0"
                        onClick={() => { setPage(pg); scrollTop(); }}
                      >
                        {pg}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline" size="sm" className="gap-1"
                  disabled={safePage === totalPages}
                  onClick={() => { setPage((p) => p + 1); scrollTop(); }}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center gap-3"
          >
            <LottiePlayer src={LOTTIE.noResults} width={200} height={200} />
            <div>
              <p className="font-semibold text-lg">No products found</p>
              <p className="text-muted-foreground text-sm mt-1">Try a different search or category</p>
            </div>
            <Button variant="outline" onClick={clearFilters} className="mt-2">Clear filters</Button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
