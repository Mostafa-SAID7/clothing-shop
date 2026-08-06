import { useState } from "react";
import { useLocation } from "wouter";
import { ShoppingBag, Package, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const { cart } = useCart();
  const { t } = useLang();
  const c = t.checkout;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "", name: "", address: "", city: "", country: "", postalCode: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFree = subtotal >= 50;
  const shipping = shippingFree ? 0 : 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
      const response = await fetch(`${baseUrl}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, customerInfo: formData }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <div className="h-20 w-20 mx-auto rounded-[var(--radius-pill)] bg-muted flex items-center justify-center">
              <ShoppingBag className="h-9 w-9 text-muted-foreground/40" />
            </div>
            <h2 className="text-2xl font-bold">{c.emptyCart}</h2>
            <Button onClick={() => navigate("/shop")}>{t.cart.continueShopping}</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">{c.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── FORM ── */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">{c.shippingInfo}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" id="checkout-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email">{c.email}</Label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className="h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="name">{c.fullName}</Label>
                      <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="h-10" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="address">{c.address}</Label>
                    <Input id="address" name="address" required value={formData.address} onChange={handleChange} placeholder="123 Main St, Apt 4" className="h-10" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <Label htmlFor="city">{c.city}</Label>
                      <Input id="city" name="city" required value={formData.city} onChange={handleChange} className="h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="postalCode">{c.postalCode}</Label>
                      <Input id="postalCode" name="postalCode" required value={formData.postalCode} onChange={handleChange} className="h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="country">{c.country}</Label>
                      <Input id="country" name="country" required value={formData.country} onChange={handleChange} className="h-10" />
                    </div>
                  </div>
                  {error && (
                    <div className="text-sm text-destructive bg-destructive/10 rounded-[var(--radius-lg)] px-3 py-2">
                      {error}
                    </div>
                  )}
                  <Button type="submit" form="checkout-form" className="w-full h-11 text-base font-semibold gap-2" disabled={loading}>
                    <Shield className="h-4 w-4" />
                    {loading ? c.processing : `${c.proceedPayment} · ${formatPrice(total)}`}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Secured by Stripe · SSL encrypted
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
              {[
                { icon: Truck, label: c.freeShippingNote },
                { icon: Package, label: "Easy 30-day returns" },
                { icon: Shield, label: "256-bit SSL security" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-[var(--radius-lg)] border border-border/60">
                  <Icon className="h-4 w-4 text-primary" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center justify-between">
                  {c.orderSummary}
                  <Badge variant="secondary">{cart.reduce((s, i) => s + i.quantity, 0)} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin pe-1">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                      <div className="relative h-16 w-16 rounded-[var(--radius-lg)] overflow-hidden bg-muted shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <Badge className="absolute -top-1 -end-1 h-4 w-4 p-0 flex items-center justify-center text-[9px] rounded-[var(--radius-pill)]">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.selectedSize} · {item.selectedColor}</p>
                      </div>
                      <p className="font-semibold text-sm shrink-0">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{c.subtotal}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{c.shipping}</span>
                    <span className={shippingFree ? "text-green-600 font-medium" : ""}>
                      {shippingFree ? c.freeShipping : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{c.tax}</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg pt-1">
                    <span>{c.total}</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
