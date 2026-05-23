import { useState, useMemo } from "react";
import { useSearch } from "wouter";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/data";
import { useLang } from "@/contexts/LangContext";

export default function ShopPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialCat = params.get("cat") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { t } = useLang();

  const toggleWishlist = (id: number) =>
    setWishlist((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          (selectedCategory === "All" || p.category === selectedCategory) &&
          (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      ),
    [selectedCategory, searchQuery]
  );

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };
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
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            {selectedCategory !== "All" && (
              <span> in <span className="font-medium text-foreground">{t.categories[selectedCategory as keyof typeof t.categories]}</span></span>
            )}
          </p>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-xs h-7">
              <X className="h-3 w-3" /> Clear
            </Button>
          )}
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
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
