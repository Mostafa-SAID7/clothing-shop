import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, ChevronRight, Truck, RotateCcw, Sparkles, ShieldCheck, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { products, categories, categoryMeta, newArrivals } from "@/lib/data";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";

const PROMO_ICONS: Record<string, LucideIcon> = {
  "truck": Truck,
  "rotate-ccw": RotateCcw,
  "sparkles": Sparkles,
  "shield-check": ShieldCheck,
};

export default function Home() {
  const [, navigate] = useLocation();
  const { t } = useLang();
  useSEO();
  const h = t.home;

  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (id: number) =>
    setWishlist((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const trending = products.filter((p) => !p.isNew).slice(0, 4);

  return (
    <Layout>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=85"
          alt="Haven collection"
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-e from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
          <Badge
            variant="outline"
            className="w-fit mb-5 text-white/80 border-white/30 bg-white/10 backdrop-blur text-xs tracking-widest uppercase"
          >
            {h.heroBadge}
          </Badge>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">
            {h.heroTitle}
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-md leading-relaxed">{h.heroSubtitle}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button size="lg" className="h-12 px-8 text-base" onClick={() => navigate("/shop")}>
              {t.shopNow}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base text-white border-white/40 bg-white/10 backdrop-blur hover:bg-white/20 hover:text-white"
              onClick={() => navigate("/about")}
            >
              {t.explore}
            </Button>
          </div>
        </div>
      </section>

      {/* ── PROMO STRIP ──────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-1 text-xs sm:text-sm font-medium">
            {h.promos.map((p) => {
              const Icon = PROMO_ICONS[p.iconId] ?? ShieldCheck;
              return (
                <span key={p.text} className="flex items-center gap-1.5 opacity-90">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {p.text}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SHOP BY CATEGORY ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">{h.shopByCategory}</h2>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/shop")}
          >
            {t.viewAll} <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.filter((c) => c !== "All").map((cat) => {
            const meta = categoryMeta[cat];
            return (
              <button
                key={cat}
                onClick={() => navigate(`/shop?cat=${cat}`)}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={meta.image}
                  alt={cat}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 start-0 end-0 p-4 text-start">
                  <p className="text-white/70 text-xs mb-0.5">
                    {t.categories[cat as keyof typeof t.categories]}
                  </p>
                  <p className="text-white font-bold text-lg leading-tight">
                    {t.shopNow} <ArrowRight className="inline h-4 w-4" />
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────────── */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">{h.newArrivals}</h2>
              <p className="text-muted-foreground text-sm mt-1">{h.newArrivalsSubtitle}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/shop")}
            >
              {t.viewAll} <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {newArrivals.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED BANNER ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gray-950">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80"
          alt="Featured collection"
          className="absolute inset-0 w-full h-full object-cover opacity-40 object-center"
          loading="lazy"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-start">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white/60 mb-4 border border-white/20 rounded-full px-3 py-1">
            {h.featured}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight max-w-xl">
            {h.featuredBannerTitle}
          </h2>
          <p className="text-white/60 mt-4 max-w-md text-base leading-relaxed">
            {h.featuredBannerSubtitle}
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 h-12 px-8"
            onClick={() => navigate("/shop")}
          >
            {t.shopNow} <ArrowRight className="ms-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* ── TRENDING NOW ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">{h.trending}</h2>
            <p className="text-muted-foreground text-sm mt-1">{h.trendingSubtitle}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/shop")}
          >
            {t.viewAll} <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {trending.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
