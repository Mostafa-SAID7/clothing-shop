import { Router } from "express";
import Stripe from "stripe";

const router = Router();

router.post("/create-checkout-session", async (req, res) => {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      res.status(500).json({ error: "Stripe is not configured. Please set STRIPE_SECRET_KEY." });
      return;
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16" as any,
    });

    const { cart, customerInfo } = req.body;
    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: `Size: ${item.selectedSize}, Color: ${item.selectedColor}`,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      customer_email: customerInfo.email,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB"],
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    req.log.error({ err: error }, "Stripe error");
    res.status(500).json({ error: "Error creating checkout session" });
  }
});

export default router;
