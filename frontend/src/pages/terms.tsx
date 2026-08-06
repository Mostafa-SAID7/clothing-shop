import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
});

const sections = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using HAVEN's website and services, you confirm that you are at least 18 years of age (or have the consent of a parent or guardian), and that you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.`,
  },
  {
    title: "Products & Availability",
    body: `All products listed on HAVEN are subject to availability. We reserve the right to limit quantities, discontinue products, or modify descriptions at any time without notice. Product images are for illustrative purposes; slight variations in colour may occur due to screen calibration.`,
  },
  {
    title: "Pricing & Payment",
    body: `All prices are displayed in USD and are inclusive of applicable taxes unless stated otherwise. We reserve the right to adjust prices at any time. Payment is processed securely via Stripe. By placing an order, you represent that you are authorised to use the payment method provided.\n\nIn the event of a pricing error, we reserve the right to cancel the order and issue a full refund.`,
  },
  {
    title: "Order Cancellation",
    body: `Orders may be cancelled within **1 hour** of placement, provided they have not yet entered the fulfilment process. To cancel, please contact us immediately at orders@haven.style. Once an order has been shipped, it cannot be cancelled — please refer to our Returns policy instead.`,
  },
  {
    title: "Shipping & Delivery",
    body: `We offer free standard shipping on orders over $50. Estimated delivery times are provided at checkout and are indicative only — HAVEN is not liable for delays caused by carriers or customs.\n\nRisk of loss and title for products pass to you upon delivery to the carrier.`,
  },
  {
    title: "Returns & Refunds",
    body: `We accept returns within **30 days** of delivery for items in their original, unworn condition with all tags attached. To initiate a return, email returns@haven.style with your order number.\n\nRefunds will be processed to your original payment method within 5–10 business days of receiving the returned item. Sale items are final sale and non-refundable unless defective.`,
  },
  {
    title: "Intellectual Property",
    body: `All content on HAVEN's website — including text, graphics, logos, product images, and software — is the exclusive property of HAVEN or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.`,
  },
  {
    title: "User Accounts",
    body: `If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately at security@haven.style of any unauthorised use. HAVEN reserves the right to terminate accounts that violate these Terms.`,
  },
  {
    title: "Limitation of Liability",
    body: `To the fullest extent permitted by law, HAVEN shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of — or inability to use — our website or products. Our total liability for any claim shall not exceed the amount you paid for the order in question.`,
  },
  {
    title: "Governing Law",
    body: `These Terms shall be governed by and construed in accordance with the laws of the State of South Carolina, USA, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Style City, SC.`,
  },
  {
    title: "Changes to These Terms",
    body: `We reserve the right to update these Terms of Service at any time. We will provide notice of material changes by updating the date at the top of this page. Continued use of HAVEN after any changes constitutes your acceptance of the revised Terms.`,
  },
  {
    title: "Contact",
    body: `Questions about these Terms? Reach us at:\n\n**HAVEN Fashion**\n123 Fashion Street, Style City, SC 10001\nlegal@haven.style\n+1 (555) 234-5678`,
  },
];

export default function TermsPage() {
  const { t } = useLang();
  useSEO({ title: "Terms of Service", description: "Read HAVEN's Terms of Service governing the use of our website, products, and services." });

  return (
    <Layout>
      <PageHero
        badge="Legal"
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services"
        bgImage="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=1400&q=80"
        overlayOpacity={0.72}
        light
        className="min-h-[220px] sm:min-h-[260px]"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Last updated */}
        <motion.p
          className="text-sm text-muted-foreground mb-10 pb-6 border-b border-border"
          variants={fadeUp(0)}
          initial="hidden"
          animate="show"
        >
          Last updated: <strong>January 1, 2025</strong>. These terms govern your use of{" "}
          <span className="font-semibold">{t.brand}</span>'s website and services.
        </motion.p>

        {/* Introduction */}
        <motion.div className="mb-10" variants={fadeUp(0.05)} initial="hidden" animate="show">
          <p className="text-muted-foreground leading-relaxed">
            Welcome to HAVEN. These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between
            you and HAVEN Fashion regarding your access to and use of our website, products, and services. Please
            read them carefully.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((sec, i) => (
            <motion.div
              key={sec.title}
              variants={fadeUp(0.04 * i)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-[var(--radius-pill)] bg-primary/10 text-primary text-xs font-black shrink-0">
                  {i + 1}
                </span>
                {sec.title}
              </h2>
              <div className="text-muted-foreground text-sm leading-relaxed">
                {sec.body.split("\n\n").map((para, j) => (
                  <p key={j} className="mb-3 last:mb-0">
                    {para.split("\n").map((line, k) => (
                      <span key={k}>
                        {line.split(/\*\*(.*?)\*\*/g).map((chunk, l) =>
                          l % 2 === 1 ? <strong key={l}>{chunk}</strong> : chunk
                        )}
                        {k < para.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
