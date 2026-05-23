import { useLocation } from "wouter";
import { ShoppingBag, Plus, Minus, Trash2, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LottiePlayer, LOTTIE } from "@/components/lottie-player";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const [, navigate] = useLocation();
  const { cart, updateQuantity, removeFromCart, totalItems } = useCart();
  const { t } = useLang();
  const c = t.cart;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFree = subtotal >= 50;
  const shipping = shippingFree ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full relative"
          aria-label={c.title}
        >
          <ShoppingBag className="h-4 w-4" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                key="badge"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="absolute -top-1 -end-1"
              >
                <Badge className="h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full leading-none">
                  {totalItems > 9 ? "9+" : totalItems}
                </Badge>
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-[420px] flex flex-col p-0" side="right">
        <SheetHeader className="px-5 py-4 border-b border-border shrink-0">
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-base font-bold">
              <ShoppingBag className="h-4 w-4" /> {c.title}
            </span>
            {totalItems > 0 && (
              <Badge variant="secondary" className="font-normal">
                {totalItems} {c.items}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center gap-2">
              {/* Lottie empty-bag animation */}
              <LottiePlayer src={LOTTIE.emptyCart} width={180} height={180} />
              <div>
                <p className="font-semibold text-base">{c.empty}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{c.emptySubtitle}</p>
              </div>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate("/shop")}>
                  {c.continueShopping}
                </Button>
              </SheetTrigger>
            </div>
          ) : (
            <AnimatePresence mode="popLayout" initial={false}>
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  layout
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="flex gap-3"
                >
                  <div
                    className="h-20 w-20 rounded-xl overflow-hidden bg-muted shrink-0 cursor-pointer"
                    onClick={() => navigate(`/product/${item.slug}`)}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm leading-snug line-clamp-1 cursor-pointer hover:underline"
                      onClick={() => navigate(`/product/${item.slug}`)}
                    >
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.selectedSize} · {item.selectedColor}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <button
                        className="h-7 w-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm tabular-nums font-medium">{item.quantity}</span>
                      <button
                        className="h-7 w-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <span className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer totals */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-5 py-4 border-t border-border bg-muted/20 space-y-3 shrink-0"
          >
            {!shippingFree ? (
              <div className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2 flex items-center gap-2">
                <Package className="h-3.5 w-3.5 shrink-0 text-primary" />
                Add <span className="font-semibold text-foreground mx-1">{formatPrice(50 - subtotal)}</span> more for {c.free} shipping
              </div>
            ) : (
              <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 rounded-lg px-3 py-2 flex items-center gap-2">
                <Package className="h-3.5 w-3.5 shrink-0" />
                <span className="font-medium">You've unlocked free shipping!</span>
              </div>
            )}

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>{c.subtotal}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{c.shipping}</span>
                <span className={shippingFree ? "text-green-600 dark:text-green-400 font-medium" : ""}>
                  {shippingFree ? c.free : formatPrice(shipping)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-base pt-0.5">
                <span>{c.total}</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <SheetTrigger asChild>
              <Button className="w-full h-11 text-base font-semibold" onClick={() => navigate("/checkout")}>
                {c.checkout} · {formatPrice(total)}
              </Button>
            </SheetTrigger>
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  );
}
