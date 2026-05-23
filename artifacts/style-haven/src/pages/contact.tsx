import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, MapPin, Phone, Mail, Clock, Send, type LucideIcon } from "lucide-react";
import { Layout } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { LottiePlayer, LOTTIE } from "@/components/lottie-player";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/contexts/LangContext";
import { useToast } from "@/hooks/use-toast";

const INFO_ICONS: Record<string, LucideIcon> = {
  "map-pin": MapPin,
  "phone":   Phone,
  "mail":    Mail,
  "clock":   Clock,
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function ContactPage() {
  const { t } = useLang();
  const { toast } = useToast();
  const c = t.contact;

  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast({ title: "Message sent!", description: "We'll be in touch soon." });
  };

  return (
    <Layout>
      {/* ── HERO ─── */}
      <PageHero
        badge={t.brand}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        bgImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1400&q=80"
        overlayOpacity={0.7}
        light
        className="min-h-[240px] sm:min-h-[280px]"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* ── FORM ─── */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp(0.05)}
            initial="hidden"
            animate="show"
          >
            <Card className="border-border/60 shadow-sm">
              <CardContent className="pt-7 pb-7 px-6 sm:px-8">
                <h2 className="text-xl font-bold mb-6">{c.formTitle}</h2>

                {sent ? (
                  <div className="flex flex-col items-center gap-3 py-10 text-center">
                    <LottiePlayer src={LOTTIE.success} width={160} height={160} loop={false} />
                    <p className="font-semibold text-base">{c.successMsg}</p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    >
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">{c.name}</Label>
                        <Input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Jane Doe" className="h-10" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">{c.email}</Label>
                        <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="h-10" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">{c.subject}</Label>
                      <Input id="subject" name="subject" required value={form.subject} onChange={handleChange} className="h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">{c.message}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className="resize-none"
                        placeholder="How can we help?"
                      />
                    </div>
                    <Button type="submit" className="w-full h-11 gap-2" disabled={loading}>
                      {loading
                        ? <><Loader2 className="h-4 w-4 animate-spin" /> {c.sending}</>
                        : <><Send className="h-4 w-4" /> {c.send}</>
                      }
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* ── CONTACT INFO ─── */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            variants={fadeUp(0.15)}
            initial="hidden"
            animate="show"
          >
            <div>
              <h2 className="text-xl font-bold mb-1">{c.infoTitle}</h2>
              <p className="text-sm text-muted-foreground">Reach us through any of the channels below.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {c.info.map((item, i) => {
                const Icon = INFO_ICONS[item.iconId] ?? Mail;
                return (
                  <motion.div
                    key={item.label}
                    variants={fadeUp(0.05 * i)}
                    initial="hidden"
                    animate="show"
                    className="flex gap-4 p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-sm text-muted-foreground mt-0.5 break-words">{item.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Lottie mail decoration */}
            <div className="flex justify-center pt-2">
              <LottiePlayer src={LOTTIE.mail} width={160} height={120} />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
