"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

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
    // Sayfa yüklendiğinde mevcut kullanıcı bilgisini kontrol et
    const loadUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch {
        // Kullanıcı bulunamadı, localStorage'dan kontrol et
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch {
            // Invalid data
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    const userData = {
      email: response.user.email,
      role: response.user.role,
    };
    
    // Token'ı localStorage'a kaydet
    localStorage.setItem("user", JSON.stringify({ ...userData, token: response.user.token }));
    
    setUser(userData);

    // Role'e göre yönlendirme
    if (response.user.role === "admin") {
      router.push("/admin/tr/dashboard");
    } else {
      router.push("/tr/dashboard");
    }
  };

  const logout = async () => {
    await authService.logout();
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

