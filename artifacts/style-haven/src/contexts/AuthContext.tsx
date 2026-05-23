import { createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isModalOpen: boolean;
  openModal: (tab?: "login" | "register") => void;
  closeModal: () => void;
  initialTab: "login" | "register";
  login: (email: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  initialTab: "login",
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<"login" | "register">("login");

  const openModal = (tab: "login" | "register" = "login") => {
    setInitialTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const login = (email: string, name: string) => {
    setUser({ email, name: name || email.split("@")[0] });
    closeModal();
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isModalOpen, openModal, closeModal, initialTab, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
