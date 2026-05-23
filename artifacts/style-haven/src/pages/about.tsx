import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Leaf, Sparkles, Users, Zap, ArrowRight, type LucideIcon } from "lucide-react";
import { Layout } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { LottiePlayer, LOTTIE } from "@/components/lottie-player";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";

const VALUE_ICONS: Record<string, LucideIcon> = {
  "leaf":     Leaf,
  "sparkles": Sparkles,
  "users":    Users,
  "zap":      Zap,
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } },
});

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export default function AboutPage() {
  const { t } = useLang();
  const a = t.about;
  const [, navigate] = useLocation();
  useSEO({ title: "About", description: "Learn the story behind HAVEN — a brand built on timeless style, quality materials, and sustainable fashion values." });

  return (
    <Layout>
      {/* ── HERO ─── */}
      <PageHero
        badge={t.brand}
        title={a.heroTitle}
        subtitle={a.heroSubtitle}
        bgImage="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80"
        overlayOpacity={0.65}
        light
        className="min-h-[260px] sm:min-h-[300px]"
      />

      {/* ── MISSION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
              {a.missionTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-5">
              Crafting timeless fashion<br className="hidden sm:block" /> for every individual.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">{a.missionText}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button size="lg" className="h-11 px-7 gap-2" onClick={() => navigate("/shop")}>
                {t.nav.shop} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-11 px-7" onClick={() => navigate("/contact")}>
                {t.nav.contact}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"
                alt="Fashion store"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-5 -start-5 h-28 w-28 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
              <span className="text-primary-foreground text-sm font-black text-center leading-tight px-2">
                Est.<br />2020
              </span>
            </div>
            {/* Lottie decoration top-right */}
            <div className="absolute -top-6 -end-4 opacity-80 hidden lg:block">
              <LottiePlayer src={LOTTIE.fashion2} width={110} height={110} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ─── */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold">{a.valuesTitle}</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {a.values.map((val) => {
              const Icon = VALUE_ICONS[val.iconId] ?? Sparkles;
              return (
                <motion.div
                  key={val.title}
                  variants={fadeUp()}
                  className="bg-background rounded-2xl p-6 border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200 text-center"
                >
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{val.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold">{a.statsTitle}</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {a.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp()}
              className="text-center bg-gradient-to-br from-primary/6 to-primary/12 rounded-2xl p-7 border border-primary/10"
            >
              <p className="text-3xl sm:text-4xl font-black text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA BANNER ─── */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=70"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-70 mb-3">{t.brand}</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.tagline}</h2>
          <p className="opacity-75 mb-7">Browse our latest collection and find your perfect style.</p>
          <Button variant="secondary" size="lg" className="h-11 px-8 gap-2" onClick={() => navigate("/shop")}>
            {t.shopNow} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
