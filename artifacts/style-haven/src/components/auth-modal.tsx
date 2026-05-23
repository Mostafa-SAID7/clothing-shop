import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LangContext";
import { useToast } from "@/hooks/use-toast";

export function AuthModal() {
  const { isModalOpen, closeModal, initialTab, login } = useAuth();
  const { t } = useLang();
  const { toast } = useToast();
  const a = t.auth;

  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setActiveTab(initialTab);
    setError("");
  }, [initialTab, isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login(loginData.email, "");
    setLoading(false);
    toast({ title: "Welcome back!", description: loginData.email });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (registerData.password !== registerData.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login(registerData.email, registerData.name);
    setLoading(false);
    toast({ title: "Account created!", description: `Welcome, ${registerData.name || registerData.email}!` });
  };

  return createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          />

          {/* Modal container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              className="w-full max-w-md pointer-events-auto"
              initial={{ opacity: 0, scale: 0.88, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 28 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.18 }}
            >
              <div className="bg-background rounded-2xl shadow-2xl overflow-hidden border border-border/60">
                {/* Header */}
                <div className="bg-gradient-to-br from-primary/8 to-primary/12 px-6 py-5 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground text-xs font-black tracking-widest">H</span>
                    </div>
                    <div>
                      <p className="font-bold text-base">{t.brand}</p>
                      <p className="text-xs text-muted-foreground">
                        {activeTab === "login" ? a.loginSwitch.replace("?", "") : a.registerSwitch.replace("?", "")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Tab switcher */}
                <div className="px-6 pt-4">
                  <div className="flex bg-muted rounded-xl p-1 gap-1">
                    {(["login", "register"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setError(""); }}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                          activeTab === tab
                            ? "bg-background shadow-sm text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab === "login" ? a.login : a.register}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Forms */}
                <AnimatePresence mode="wait" initial={false}>
                  {activeTab === "login" ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.18 }}
                      className="px-6 pb-6 pt-4"
                    >
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="login-email" className="text-sm font-medium">{a.email}</Label>
                          <Input
                            id="login-email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={loginData.email}
                            onChange={(e) => setLoginData((d) => ({ ...d, email: e.target.value }))}
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="login-pwd" className="text-sm font-medium">{a.password}</Label>
                          <div className="relative">
                            <Input
                              id="login-pwd"
                              type={showPwd ? "text" : "password"}
                              required
                              autoComplete="current-password"
                              placeholder="••••••••"
                              value={loginData.password}
                              onChange={(e) => setLoginData((d) => ({ ...d, password: e.target.value }))}
                              className="h-10 pe-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPwd(!showPwd)}
                              className="absolute inset-y-0 end-3 flex items-center text-muted-foreground hover:text-foreground"
                              tabIndex={-1}
                            >
                              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Button type="submit" className="w-full h-10" disabled={loading}>
                          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : a.loginBtn}
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                          {a.loginSwitch}{" "}
                          <button type="button" className="font-medium text-primary underline-offset-4 hover:underline" onClick={() => setActiveTab("register")}>
                            {a.signUp}
                          </button>
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.18 }}
                      className="px-6 pb-6 pt-4"
                    >
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="reg-name" className="text-sm font-medium">{a.fullName}</Label>
                          <Input
                            id="reg-name"
                            required
                            autoComplete="name"
                            placeholder="John Doe"
                            value={registerData.name}
                            onChange={(e) => setRegisterData((d) => ({ ...d, name: e.target.value }))}
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="reg-email" className="text-sm font-medium">{a.email}</Label>
                          <Input
                            id="reg-email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={registerData.email}
                            onChange={(e) => setRegisterData((d) => ({ ...d, email: e.target.value }))}
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="reg-pwd" className="text-sm font-medium">{a.password}</Label>
                          <div className="relative">
                            <Input
                              id="reg-pwd"
                              type={showPwd ? "text" : "password"}
                              required
                              autoComplete="new-password"
                              placeholder="••••••••"
                              value={registerData.password}
                              onChange={(e) => setRegisterData((d) => ({ ...d, password: e.target.value }))}
                              className="h-10 pe-10"
                            />
                            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute inset-y-0 end-3 flex items-center text-muted-foreground hover:text-foreground" tabIndex={-1}>
                              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="reg-confirm" className="text-sm font-medium">{a.confirmPassword}</Label>
                          <div className="relative">
                            <Input
                              id="reg-confirm"
                              type={showConfirm ? "text" : "password"}
                              required
                              autoComplete="new-password"
                              placeholder="••••••••"
                              value={registerData.confirm}
                              onChange={(e) => setRegisterData((d) => ({ ...d, confirm: e.target.value }))}
                              className="h-10 pe-10"
                            />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 end-3 flex items-center text-muted-foreground hover:text-foreground" tabIndex={-1}>
                              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Button type="submit" className="w-full h-10" disabled={loading}>
                          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : a.registerBtn}
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                          {a.registerSwitch}{" "}
                          <button type="button" className="font-medium text-primary underline-offset-4 hover:underline" onClick={() => setActiveTab("login")}>
                            {a.signIn}
                          </button>
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
