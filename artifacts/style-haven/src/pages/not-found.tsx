import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { useLang } from "@/contexts/LangContext";

export default function NotFound() {
  const [, navigate] = useLocation();
  const { t } = useLang();
  const nf = t.notFound;

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          {/* Large artistic 404 */}
          <div className="relative mb-6 select-none">
            <span className="text-[7rem] sm:text-[9rem] font-black text-primary/10 leading-none tracking-tighter block">
              {nf.code}
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="space-y-1">
                <div className="h-1.5 w-16 bg-primary/40 rounded-full mx-auto" />
                <div className="h-1.5 w-10 bg-primary/20 rounded-full mx-auto" />
              </div>
            </div>
          </div>

          {/* Fashion-themed SVG illustration */}
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 120 80" className="w-32 h-20 text-muted-foreground/30" fill="currentColor">
              <path d="M40 10 L30 25 L10 20 L20 55 L100 55 L110 20 L90 25 L80 10 Q60 5 40 10Z" />
              <rect x="50" y="55" width="20" height="20" rx="3" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{nf.title}</h1>
          <p className="text-muted-foreground mb-8 text-base leading-relaxed">{nf.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => navigate("/")} className="h-11 px-8">
              {nf.cta}
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()} className="h-11 px-8">
              Go Back
            </Button>
          </div>

          {/* Quick nav links */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {[
              { href: "/", label: t.nav.home },
              { href: "/shop", label: t.nav.shop },
              { href: "/about", label: t.nav.about },
              { href: "/contact", label: t.nav.contact },
            ].map((link) => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
