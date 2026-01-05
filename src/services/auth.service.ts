import apiClient from "@/lib/api-client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    email: string;
    role: "admin" | "merchant";
    token: string;
  };
}

export interface User {
  email: string;
  role: "admin" | "merchant";
}

/**
 * Authentication Service
 * Global service - Birden fazla feature tarafından kullanılır
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export const authService = {
  /**
   * Login işlemi
   * Backend entegrasyonu için hazır
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.post<LoginResponse>("/auth/login", credentials);

    // Mock implementation - Backend entegrasyonu sonrası kaldırılacak
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let role: "admin" | "merchant" | null = null;
        
        // Admin email'leri (örnek - gerçek uygulamada backend'den gelmeli)
        if (credentials.email.includes("@admin.") || credentials.email === "admin@example.com") {
          role = "admin";
        } 
        // Merchant email'leri
        else if (credentials.email.includes("@merchant.") || credentials.email.includes("@example.com")) {
          role = "merchant";
        }

        if (!role) {
          reject(new Error("Invalid email or password"));
          return;
        }

        resolve({
          user: {
            email: credentials.email,
            role,
            token: "mock-token-" + Date.now(),
          },
        });
      }, 300);
    });
  },

  /**
   * Logout işlemi
   * Backend entegrasyonu için hazır
   */
  async logout(): Promise<void> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.post("/auth/logout");

    // Mock implementation
    return Promise.resolve();
  },

  /**
   * Mevcut kullanıcı bilgilerini getir
   * Backend entegrasyonu için hazır
   */
  async getCurrentUser(): Promise<User> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.get<User>("/auth/me");

    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof window === "undefined") {
          reject(new Error("User not found"));
          return;
        }
        
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            const userData = JSON.parse(savedUser);
            resolve({
              email: userData.email,
              role: userData.role,
            });
          } catch {
            reject(new Error("Invalid user data"));
          }
        } else {
          reject(new Error("User not found"));
        }
      }, 100);
    });
  },
};

