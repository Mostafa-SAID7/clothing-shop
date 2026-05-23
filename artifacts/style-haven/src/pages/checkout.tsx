import { useState } from "react";
import { useLocation } from "wouter";
import { loadStripe } from "@stripe/stripe-js";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/layout";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { formatPrice } from "@/lib/utils";

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const { cart, clearCart } = useCart();
  const { t } = useLang();
  const c = t.checkout;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, customerInfo: formData }),
      });
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) console.error("Stripe error:", error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto" />
            <h2 className="text-2xl font-bold">{c.emptyCart}</h2>
            <Button onClick={() => navigate("/")}>{t.cart.continueShopping}</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">{c.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form — wider column */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email">{c.email}</Label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="you@example.com" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="name">{c.fullName}</Label>
                      <Input id="name" name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="address">{c.address}</Label>
                    <Input id="address" name="address" required value={formData.address} onChange={handleInputChange} placeholder="123 Main St" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="city">{c.city}</Label>
                      <Input id="city" name="city" required value={formData.city} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="postalCode">{c.postalCode}</Label>
                      <Input id="postalCode" name="postalCode" required value={formData.postalCode} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <Label htmlFor="country">{c.country}</Label>
                      <Input id="country" name="country" required value={formData.country} onChange={handleInputChange} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-11 mt-2" disabled={loading}>
                    {loading ? c.processing : c.proceedPayment}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">{c.orderSummary}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                      <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.selectedSize} · {item.selectedColor}
                        </p>
                        <p className="text-xs text-muted-foreground">{c.quantity}: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm shrink-0">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{c.subtotal}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{c.shipping}</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{c.tax}</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base pt-1">
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
