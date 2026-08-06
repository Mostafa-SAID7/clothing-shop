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
    title: "Information We Collect",
    body: `When you visit or shop at HAVEN, we may collect the following information:\n\n• **Personal identifiers**: name, email address, shipping and billing address, phone number.\n• **Payment information**: processed securely via Stripe — we never store full card numbers.\n• **Device & usage data**: IP address, browser type, pages visited, and time spent on the site.\n• **Order history**: purchases, returns, and preferences to improve your shopping experience.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use the information we collect to:\n\n• Process and fulfill your orders, including shipping and customer support.\n• Send order confirmations, shipping updates, and return notifications.\n• Personalise your shopping experience and recommend products you may love.\n• Improve our website, detect fraud, and comply with legal obligations.\n• Send promotional emails — only if you have opted in. You may unsubscribe at any time.`,
  },
  {
    title: "Sharing of Information",
    body: `We do not sell, trade, or rent your personal data to third parties. We may share data with trusted service providers who assist in operating our website (e.g., Stripe for payments, shipping carriers for delivery). All partners are bound by confidentiality obligations and may not use your data for any other purpose.`,
  },
  {
    title: "Cookies & Tracking",
    body: `HAVEN uses cookies to maintain your session, remember cart contents, and measure site performance. You can disable cookies in your browser settings, though doing so may affect the functionality of certain features. We do not use advertising trackers or sell your browsing data to ad networks.`,
  },
  {
    title: "Data Retention",
    body: `We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Order records are retained for up to 7 years for accounting and legal compliance. You may request deletion of your account data at any time.`,
  },
  {
    title: "Your Rights",
    body: `Depending on your location you may have the right to:\n\n• **Access** the personal data we hold about you.\n• **Correct** inaccurate or incomplete data.\n• **Delete** your account and associated data.\n• **Object** to or restrict certain processing activities.\n• **Portability** — request a copy of your data in a structured, machine-readable format.\n\nTo exercise any of these rights, please contact us at privacy@haven.style.`,
  },
  {
    title: "Security",
    body: `We implement industry-standard security measures including HTTPS/TLS encryption, secure payment processing via Stripe, and access controls on our infrastructure. While we take every precaution, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting a prominent notice on our website. Continued use of HAVEN after such changes constitutes your acceptance of the updated policy.`,
  },
  {
    title: "Contact Us",
    body: `If you have any questions about this Privacy Policy, please contact us:\n\n**HAVEN Fashion**\n123 Fashion Street, Style City, SC 10001\nprivacy@haven.style\n+1 (555) 234-5678`,
  },
];

export default function PrivacyPage() {
  const { t } = useLang();
  useSEO({ title: "Privacy Policy", description: "Read HAVEN's Privacy Policy to understand how we collect, use, and protect your personal information." });

  return (
    <Layout>
      <PageHero
        badge="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
        bgImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=80"
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
          Last updated: <strong>January 1, 2025</strong>. This policy applies to all users of{" "}
          <span className="font-semibold">{t.brand}</span>.
        </motion.p>

        {/* Introduction */}
        <motion.div className="mb-10" variants={fadeUp(0.05)} initial="hidden" animate="show">
          <p className="text-muted-foreground leading-relaxed">
            At HAVEN, your privacy is a priority. This Privacy Policy explains what personal data we collect when you
            use our website, how we use it, and the choices you have. By shopping with us, you agree to the practices
            described below.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((sec, i) => (
            <motion.div
              key={sec.title}
              variants={fadeUp(0.05 * i)}
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
              <div className="text-muted-foreground text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
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
