import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "haven-cookies";

type CookieChoice = "all" | "essential" | null;

export function CookieBanner() {
  const [choice, setChoice] = useState<CookieChoice | undefined>(undefined);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as CookieChoice | null;
    setChoice(saved);
  }, []);

  const accept = (value: "all" | "essential") => {
    localStorage.setItem(STORAGE_KEY, value);
    setChoice(value);
  };

  const visible = choice === undefined ? false : choice === null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto"
        >
          <div className="bg-background border border-border rounded-2xl shadow-xl p-4 sm:p-5">
            <div className="flex gap-3 items-start">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="h-4 w-4 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm">We use cookies</p>
                  <button
                    onClick={() => accept("essential")}
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0 p-0.5"
                    aria-label="Dismiss"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  HAVEN uses cookies to remember your cart, preferences, and to improve your experience.
                  We never sell your data.{" "}
                  <a href="/privacy" className="underline hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Button size="sm" className="h-8 text-xs px-4 gap-1.5" onClick={() => accept("all")}>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Accept All
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 text-xs px-4" onClick={() => accept("essential")}>
                    Essential Only
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
