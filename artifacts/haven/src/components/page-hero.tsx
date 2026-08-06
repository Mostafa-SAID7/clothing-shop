import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  bgImage?: string;
  /** overlay opacity 0–1, default 0.72 */
  overlayOpacity?: number;
  className?: string;
  children?: ReactNode;
  /** text color when using a dark image overlay */
  light?: boolean;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0 },
};

export function PageHero({
  badge,
  title,
  subtitle,
  bgImage,
  overlayOpacity = 0.72,
  className = "",
  children,
  light = false,
}: PageHeroProps) {
  const textColor = light ? "text-white" : "text-foreground";
  const subColor  = light ? "text-white/70" : "text-muted-foreground";

  return (
    <section className={`relative overflow-hidden grain ${className}`}>
      {/* Background image */}
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 cinematic-overlay" />
        </>
      )}

      {/* No image fallback gradient */}
      {!bgImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-accent/10" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {badge && (
            <motion.span
              className={`inline-block text-[11px] font-semibold uppercase tracking-widest mb-5 border rounded-[var(--radius-pill)] px-3.5 py-1 ${
                light
                  ? "text-white/70 border-white/30 bg-white/10 backdrop-blur"
                  : "text-primary border-primary/30 bg-primary/8"
              }`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {badge}
            </motion.span>
          )}

          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${textColor}`}
          >
            {title}
          </h1>

          {subtitle && (
            <motion.p
              className={`mt-4 text-lg leading-relaxed max-w-xl mx-auto ${subColor}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
