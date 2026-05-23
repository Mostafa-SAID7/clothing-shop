import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LangContext";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function AuthModal() {
  const { isModalOpen, closeModal, initialTab, login } = useAuth();
  const { t } = useLang();
  const a = t.auth;

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login(loginData.email, "");
    setLoading(false);
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
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md w-[95vw] p-0 overflow-hidden rounded-2xl">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 pb-4">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">SH</span>
              </div>
              <DialogTitle className="text-lg font-bold">{t.brand}</DialogTitle>
            </div>
          </DialogHeader>
        </div>

        <Tabs defaultValue={initialTab} key={initialTab} className="w-full">
          <div className="px-6">
            <TabsList className="w-full h-10 mt-2">
              <TabsTrigger value="login" className="flex-1 text-sm">{a.login}</TabsTrigger>
              <TabsTrigger value="register" className="flex-1 text-sm">{a.register}</TabsTrigger>
            </TabsList>
          </div>

          {/* LOGIN */}
          <TabsContent value="login" className="px-6 pb-6 pt-4 mt-0">
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
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
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
                <button
                  type="button"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                  onClick={() => {
                    const tabs = document.querySelector('[role="tablist"]');
                    const reg = tabs?.querySelector('[value="register"]') as HTMLElement;
                    reg?.click();
                  }}
                >
                  {a.signUp}
                </button>
              </p>
            </form>
          </TabsContent>

          {/* REGISTER */}
          <TabsContent value="register" className="px-6 pb-6 pt-4 mt-0">
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
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
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
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
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
                <button
                  type="button"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                  onClick={() => {
                    const tabs = document.querySelector('[role="tablist"]');
                    const log = tabs?.querySelector('[value="login"]') as HTMLElement;
                    log?.click();
                  }}
                >
                  {a.signIn}
                </button>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
