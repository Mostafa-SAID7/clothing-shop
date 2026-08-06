import { useState } from "react";
import { useLocation } from "wouter";
import { Sun, Moon, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartDrawer } from "@/components/cart-drawer";
import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LangContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [location, navigate] = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLang, t, isRTL } = useLang();
  const { user, logout, openModal } = useAuth();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/shop", label: t.nav.shop },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  const handleLogout = () => {
    logout();
    toast({ title: "Signed out", description: "See you next time!" });
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-subtle" style={{ boxShadow: "0 1px 0 0 hsl(var(--border) / 0.4)", borderTop: "none", borderLeft: "none", borderRight: "none" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="font-black text-xl uppercase select-none hover:opacity-75 transition-opacity shrink-0 tracking-[0.25em]"
            aria-label={t.brand}
          >
            {t.brand}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 bottom-0 h-[1.5px] bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-1">
            {/* Lang toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-[var(--radius-pill)] hidden sm:flex overflow-hidden"
              onClick={toggleLang}
              aria-label="Toggle language"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={lang}
                  initial={{ y: -14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 14, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                  className="text-[11px] font-bold leading-none"
                >
                  {lang === "en" ? "EN" : "ع"}
                </motion.span>
              </AnimatePresence>
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-[var(--radius-pill)] overflow-hidden"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex items-center justify-center"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </Button>

            <CartDrawer />

            {/* Auth — avatar icon (logged in) or user icon (logged out) */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-[var(--radius-pill)] hidden sm:flex p-0"
                    aria-label="Account menu"
                  >
                    <div className="h-7 w-7 rounded-[var(--radius-pill)] bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold select-none">
                      {(user.name?.[0] ?? user.email?.[0] ?? "U").toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-48">
                  <div className="px-2 py-2">
                    <p className="text-xs font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{t.auth.profile}</DropdownMenuItem>
                  <DropdownMenuItem>{t.auth.orders}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                    {t.auth.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Logged-out: user icon opens auth modal */
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-[var(--radius-pill)] hidden sm:flex"
                onClick={() => openModal("login")}
                aria-label={t.auth.login}
              >
                <User className="h-4 w-4" />
              </Button>
            )}

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-[var(--radius-pill)] md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-t border-border/60 bg-background overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => { navigate(link.href); setMenuOpen(false); }}
                  className={`w-full text-start px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors ${
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
                  {lang === "en" ? "العربية" : "English"}
                </Button>
                {!user ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ms-auto text-xs gap-1.5"
                    onClick={() => { openModal("login"); setMenuOpen(false); }}
                  >
                    <User className="h-3.5 w-3.5" />
                    {t.auth.login}
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ms-auto text-xs text-destructive"
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                  >
                    {t.auth.logout}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
