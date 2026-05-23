import { Layout } from "@/components/layout";
import { useLang } from "@/contexts/LangContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function AboutPage() {
  const { t } = useLang();
  const a = t.about;
  const [, navigate] = useLocation();

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/8 via-background to-accent/15 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 bg-primary/10 px-3 py-1 rounded-full">
            {t.brand}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{a.heroTitle}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">{a.heroSubtitle}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-5">{a.missionTitle}</h2>
            <p className="text-muted-foreground text-base leading-relaxed">{a.missionText}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button size="lg" className="h-11 px-6" onClick={() => navigate("/")}>
                {t.nav.shop}
              </Button>
              <Button variant="outline" size="lg" className="h-11 px-6" onClick={() => navigate("/contact")}>
                {t.nav.contact}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"
                alt="Fashion store"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -start-4 h-24 w-24 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
              <span className="text-primary-foreground text-xs font-bold text-center leading-tight px-2">Est. 2020</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">{a.valuesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.values.map((val) => (
              <div
                key={val.title}
                className="bg-background rounded-2xl p-6 border border-border hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-4 block">{val.icon}</span>
                <h3 className="font-bold text-base mb-2">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">{a.statsTitle}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {a.stats.map((stat) => (
            <div key={stat.label} className="text-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-border/50">
              <p className="text-3xl sm:text-4xl font-black text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.tagline}</h2>
          <p className="opacity-80 mb-6">Browse our latest collection and find your perfect style.</p>
          <Button variant="secondary" size="lg" className="h-11 px-8" onClick={() => navigate("/")}>
            {t.nav.shop}
          </Button>
        </div>
      </section>
    </Layout>
  );
}
