import { useEffect } from "react";
import { useLocation } from "wouter";
import { CheckCircle, ShoppingBag, Package, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";

export default function SuccessPage() {
  const [, navigate] = useLocation();
  const { clearCart } = useCart();
  const { t } = useLang();
  const s = t.success;

  const orderNum = Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Layout>
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md w-full">
          {/* Icon */}
          <div className="relative inline-flex mb-6">
            <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{s.title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-2">{s.subtitle}</p>
          <p className="text-sm text-muted-foreground">
            {s.orderNumber}<span className="font-mono font-bold text-foreground">{orderNum}</span>
          </p>

          {/* Status steps */}
          <div className="grid grid-cols-3 gap-3 my-8">
            {[
              { icon: Mail, label: "Confirmation\nEmail" },
              { icon: Package, label: "Order\nProcessing" },
              { icon: ShoppingBag, label: "Ready for\nShipping" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-muted/50 rounded-2xl p-4 flex flex-col items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground text-center whitespace-pre-line leading-snug">{label}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="h-12 px-8 gap-2"
          >
            {s.continueShopping} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
}
