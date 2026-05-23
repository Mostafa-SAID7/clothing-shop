import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthModal } from "@/components/auth-modal";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
      <AuthModal />
    </div>
  );
}
