import { useState } from "react";
import { Layout } from "@/components/layout";
import { useLang } from "@/contexts/LangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const { t } = useLang();
  const c = t.contact;

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/8 via-background to-accent/15 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{c.heroTitle}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{c.heroSubtitle}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-6">{c.formTitle}</h2>
                {sent ? (
                  <div className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="font-semibold text-base">{c.successMsg}</p>
                    <Button variant="outline" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">{c.name}</Label>
                        <Input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="John Doe" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">{c.email}</Label>
                        <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">{c.subject}</Label>
                      <Input id="subject" name="subject" required value={form.subject} onChange={handleChange} />
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
                    <Button type="submit" className="w-full h-11" disabled={loading}>
                      {loading ? <><Loader2 className="h-4 w-4 animate-spin me-2" /> {c.sending}</> : c.send}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold">{c.infoTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {c.info.map((item) => (
                <div key={item.label} className="flex gap-4 p-4 rounded-xl border border-border bg-muted/20">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
