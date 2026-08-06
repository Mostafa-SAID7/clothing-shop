import { Link } from "wouter";
import { useLang } from "@/contexts/LangContext";

export function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-subtle bg-muted/30 dark:bg-[hsl(0_0%_6%)] backdrop-blur-sm mt-auto shadow-lift-sm pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-[var(--radius-sm)] bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">H</span>
              </div>
              <span className="font-bold text-base tracking-widest uppercase">{t.brand}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{f.tagline}</p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{f.shop}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                { href: "/shop?new=true", label: f.links.newArrivals },
                { href: "/shop?cat=T-Shirts", label: f.links.tshirts },
                { href: "/shop?cat=Jeans", label: f.links.jeans },
                { href: "/shop?cat=Hoodies", label: f.links.hoodies },
                { href: "/shop?cat=Jackets", label: f.links.jackets },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <span className="hover:text-foreground transition-colors cursor-pointer">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{f.company}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                { href: "/about", label: f.links.about },
                { href: "/contact", label: f.links.contact },
                { href: "/privacy", label: f.links.privacy },
                { href: "/terms", label: f.links.terms },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <span className="hover:text-foreground transition-colors cursor-pointer">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{f.newsletterTitle}</h4>
            <p className="text-sm text-muted-foreground mb-3">Stay updated on new arrivals and special offers.</p>
            <div className="flex p-1 bg-background border border-subtle rounded-[var(--radius-pill)] shadow-sm">
              <input
                type="email"
                placeholder={f.newsletterPlaceholder}
                className="flex-1 min-w-0 bg-transparent px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none"
              />
              <button className="h-9 px-5 rounded-[var(--radius-pill)] bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shrink-0 whitespace-nowrap">
                {f.newsletterBtn}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© {year} {t.brand}. {f.rights}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy"><span className="hover:text-foreground transition-colors cursor-pointer">{f.links.privacy}</span></Link>
            <Link href="/terms"><span className="hover:text-foreground transition-colors cursor-pointer">{f.links.terms}</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
