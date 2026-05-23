import { useState, useMemo, useEffect } from "react";
import { useSearch } from "wouter";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { products, categories } from "@/lib/data";
import { useLang } from "@/contexts/LangContext";

const ITEMS_PER_PAGE = 8;

export default function ShopPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialCat = params.get("cat") || "All";
  const initialQ = params.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const toggleWishlist = (id: number) =>
    setWishlist((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          (selectedCategory === "All" || p.category === selectedCategory) &&
          (searchQuery === "" ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      ),
    [selectedCategory, searchQuery]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchQuery]);

  const hasFilters = selectedCategory !== "All" || searchQuery;

  return (
    <Layout>
      {/* Page header */}
      <div className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold">{t.nav.shop}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t.tagline}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
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
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap h-9 rounded-full px-4 shrink-0"
              >
                {t.categories[cat as keyof typeof t.categories] ?? cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Results meta */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            {loading ? (
              <span className="inline-block w-32 h-4 bg-muted rounded animate-pulse" />
            ) : (
              <>
                {filteredProducts.length > 0
                  ? `Showing ${(safePage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(safePage * ITEMS_PER_PAGE, filteredProducts.length)} of ${filteredProducts.length} products`
                  : "No products found"}
                {selectedCategory !== "All" && (
                  <> in <span className="font-medium text-foreground">{t.categories[selectedCategory as keyof typeof t.categories]}</span></>
                )}
              </>
            )}
          </p>
          {hasFilters && !loading && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-xs h-7">
              <X className="h-3 w-3" /> Clear
            </Button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  disabled={safePage === 1}
                  onClick={() => { setPage((p) => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                    const isActive = pg === safePage;
                    const isNearby = Math.abs(pg - safePage) <= 1 || pg === 1 || pg === totalPages;
                    if (!isNearby && pg !== safePage - 2 && pg !== safePage + 2) {
                      if (pg === safePage - 2 || pg === safePage + 2) {
                        return <span key={pg} className="text-muted-foreground text-sm px-1">…</span>;
                      }
                      return null;
                    }
                    return (
                      <Button
                        key={pg}
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        className="h-9 w-9 p-0"
                        onClick={() => { setPage(pg); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      >
                        {pg}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  disabled={safePage === totalPages}
                  onClick={() => { setPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <Search className="h-12 w-12 text-muted-foreground/30" />
            <div>
              <p className="font-medium">No products found</p>
              <p className="text-muted-foreground text-sm mt-1">Try a different search or category</p>
            </div>
            <Button variant="outline" onClick={clearFilters}>Clear filters</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
