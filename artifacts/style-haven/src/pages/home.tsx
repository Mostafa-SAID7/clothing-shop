import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/data";
import { useLang } from "@/contexts/LangContext";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { t } = useLang();

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          (selectedCategory === "All" || p.category === selectedCategory) &&
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [selectedCategory, searchQuery]
  );

  const toggleWishlist = (id: number) =>
    setWishlist((curr) =>
      curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]
    );

  return (
    <Layout>
      {/* Hero banner */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {t.brand}
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">{t.tagline}</p>
            <div className="mt-6 flex gap-3">
              <Button size="lg" className="h-11 px-6">
                {t.nav.shop}
              </Button>
              <Button variant="outline" size="lg" className="h-11 px-6">
                {t.about.heroTitle}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Shop section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Filters row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 h-10"
            />
          </div>

          {/* Category pills */}
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

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-5">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        </p>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
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
            <p className="text-muted-foreground">No products found for "{searchQuery}"</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </Layout>
  );
}
