import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";

const FLOAT_CIRCLES = [
  { size: 90,  top: "12%", left:  "8%",  dur: 5.2 },
  { size: 130, top: "65%", left: "82%",  dur: 6.8 },
  { size: 60,  top: "78%", left: "12%",  dur: 4.5 },
  { size: 110, top: "20%", left: "76%",  dur: 7.1 },
  { size: 70,  top: "50%", left: "50%",  dur: 5.8 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function NotFound() {
  const [, navigate] = useLocation();
  const { t } = useLang();
  const nf = t.notFound;

  useSEO({ title: "Page Not Found" });

  return (
    <Layout>
      <div className="relative min-h-[82vh] flex items-center justify-center px-4 overflow-hidden">

        {/* ── Floating ambient circles ── */}
        {FLOAT_CIRCLES.map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/[0.04] pointer-events-none"
            style={{ width: c.size, height: c.size, top: c.top, left: c.left }}
            animate={{ y: [0, -18, 0], x: [0, 8, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}

        {/* ── Ghost "404" backdrop ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.span
            className="text-[22vw] sm:text-[18vw] font-black text-primary leading-none tracking-tighter"
            animate={{ opacity: [0.04, 0.09, 0.04], scale: [1, 1.015, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            404
          </motion.span>
        </motion.div>

        {/* ── Main content ── */}
        <motion.div
          className="relative z-10 text-center max-w-md"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Floating fashion SVG */}
          <motion.div
            className="flex justify-center mb-7"
            variants={item}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 124 96"
              className="w-32 h-28 text-muted-foreground/20"
              fill="currentColor"
            >
              {/* T-shirt body */}
              <path d="M46 10 L30 30 L6 22 L18 68 L106 68 L118 22 L94 30 L78 10 Q62 4 46 10Z" />
              {/* Collar cutout */}
              <path
                d="M55 10 Q62 20 69 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-background/60"
              />
              {/* Label tag on the neck */}
              <rect x="58" y="6" width="8" height="5" rx="1.5" className="opacity-60" />
              {/* Seam lines */}
              <line x1="62" y1="28" x2="62" y2="65" stroke="currentColor" strokeWidth="1.5" className="opacity-20" />
            </svg>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-3xl sm:text-4xl font-black tracking-tight mb-3"
            variants={item}
          >
            {nf.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xs mx-auto"
            variants={item}
          >
            {nf.subtitle}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            variants={item}
          >
            <Button size="lg" className="h-11 px-8 font-semibold" onClick={() => navigate("/")}>
              {nf.cta}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-8"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </motion.div>

          {/* Quick nav links */}
          <motion.nav
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.5, duration: 0.4 } } }}
          >
            {[
              { href: "/",        label: t.nav.home },
              { href: "/shop",    label: t.nav.shop },
              { href: "/about",   label: t.nav.about },
              { href: "/contact", label: t.nav.contact },
            ].map((link) => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                {link.label}
              </button>
            ))}
          </motion.nav>
        </motion.div>
      </div>
    </Layout>
  );
}
