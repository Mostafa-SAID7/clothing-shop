import { useEffect } from "react";
import { useLocation } from "wouter";
import { CheckCircle, ShoppingBag, Package, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";

export default function SuccessPage() {
  const [, navigate] = useLocation();
  const { clearCart } = useCart();
  const { t } = useLang();
  const s = t.success;

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <div className="relative flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{s.title}</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">{s.subtitle}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: Mail, label: "Confirmation\nEmail Sent" },
              { icon: Package, label: "Order\nProcessing" },
              { icon: ShoppingBag, label: "Ready for\nShipping" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-muted/50 rounded-xl p-4 flex flex-col items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground text-center whitespace-pre-line leading-tight">{label}</span>
              </div>
            ))}
          </div>

          <Button onClick={() => navigate("/")} size="lg" className="h-11 px-8">
            {s.continueShopping}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
