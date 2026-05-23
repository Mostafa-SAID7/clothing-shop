import { useLocation } from "wouter";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const [, navigate] = useLocation();
  const { cart, updateQuantity, removeFromCart, totalItems } = useCart();
  const { t } = useLang();
  const c = t.cart;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative" aria-label={c.title}>
          <ShoppingBag className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-base">
            <ShoppingBag className="h-4 w-4" />
            {c.title}
            {totalItems > 0 && (
              <Badge variant="secondary" className="ml-1">
                {totalItems} {c.items}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-muted-foreground text-sm">{c.empty}</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                {c.continueShopping}
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex gap-3 py-3 border-b border-border/50 last:border-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-snug truncate">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.selectedSize} · {item.selectedColor}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm tabular-nums">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between shrink-0">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-4 border-t border-border space-y-3 bg-muted/20">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{c.total}</span>
              <span className="font-bold text-lg">{formatPrice(total)}</span>
            </div>
            <Button
              className="w-full h-11"
              onClick={() => navigate("/checkout")}
            >
              {c.checkout}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
