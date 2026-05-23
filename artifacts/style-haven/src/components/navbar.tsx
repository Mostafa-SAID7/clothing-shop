import { useState } from "react";
import { useLocation } from "wouter";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartDrawer } from "@/components/cart-drawer";
import { AuthModal } from "@/components/auth-modal";
import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LangContext";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [location, navigate] = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLang, t, isRTL } = useLang();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/shop", label: t.nav.shop },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-14 flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="font-black text-xl tracking-widest uppercase select-none hover:opacity-80 transition-opacity shrink-0"
              aria-label={t.brand}
            >
              {t.brand}
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => navigate(link.href)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hidden sm:flex"
                onClick={toggleLang}
                aria-label="Toggle language"
              >
                <Globe className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <CartDrawer />

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hidden sm:flex">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        {user.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-44">
                    <div className="px-2 py-1.5">
                      <p className="text-xs font-semibold truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>{t.auth.profile}</DropdownMenuItem>
                    <DropdownMenuItem>{t.auth.orders}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={logout}>{t.auth.logout}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex h-9 rounded-full text-sm"
                  onClick={() => setAuthOpen(true)}
                >
                  {t.auth.login}
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full md:hidden"
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border/60 bg-background px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => { navigate(link.href); setMenuOpen(false); }}
                className={`w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-border/40 mt-2">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={toggleLang}>
                <Globe className="h-3.5 w-3.5" />
                {lang === "en" ? "العربية" : "English"}
              </Button>
              {!user && (
                <Button
                  variant="outline"
                  size="sm"
                  className="ms-auto text-xs"
                  onClick={() => { setAuthOpen(true); setMenuOpen(false); }}
                >
                  {t.auth.login}
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
