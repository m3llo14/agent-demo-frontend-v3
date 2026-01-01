"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

type UserRole = "admin" | "merchant" | null;

interface AuthContextType {
  user: { email: string; role: UserRole } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; role: UserRole } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgisini kontrol et
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Email'e göre role belirleme
    let role: UserRole = null;
    
    // Admin email'leri (örnek - gerçek uygulamada backend'den gelmeli)
    if (email.includes("@admin.") || email === "admin@example.com") {
      role = "admin";
    } 
    // Merchant email'leri
    else if (email.includes("@merchant.") || email.includes("@example.com")) {
      role = "merchant";
    }

    if (!role) {
      throw new Error("Invalid email or password");
    }

    const userData = { email, role };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Role'e göre yönlendirme
    if (role === "admin") {
      router.push("/admin/tr/dashboard");
    } else {
      router.push("/tr/dashboard");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/tr/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

