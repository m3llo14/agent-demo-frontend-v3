import apiClient from "@/lib/api-client";
import { Company, IndustryType } from "@/types/industry";

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
  company: Company;
}

export interface User {
  email: string;
  role: "admin" | "merchant";
  company?: Company;
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
        let industry: IndustryType = "beauty_salon";
        
        // Admin email'leri (örnek - gerçek uygulamada backend'den gelmeli)
        if (credentials.email.includes("@admin.") || credentials.email === "admin@example.com") {
          role = "admin";
        } 
        // Merchant email'leri - Email'e göre sektör belirleme (mock)
        else if (credentials.email.includes("@merchant.") || credentials.email.includes("@example.com")) {
          role = "merchant";
          
          // Email'e göre sektör belirleme (mock - gerçekte backend'den gelecek)
          if (credentials.email.includes("@hotel.") || credentials.email.includes("hotel@")) {
            industry = "hotel";
          } else if (credentials.email.includes("@cafe.") || credentials.email.includes("cafe@")) {
            industry = "cafe";
          } else if (credentials.email.includes("@restaurant.") || credentials.email.includes("restaurant@")) {
            industry = "restaurant";
          } else if (credentials.email.includes("@spa.") || credentials.email.includes("spa@")) {
            industry = "spa";
          } else if (credentials.email.includes("@fitness.") || credentials.email.includes("fitness@")) {
            industry = "fitness";
          } else if (credentials.email.includes("@clinic.") || credentials.email.includes("clinic@")) {
            industry = "clinic";
          } else if (credentials.email.includes("travel@") || credentials.email.includes("@travel.")) {
            industry = "travel_agency";
          } else {
            industry = "beauty_salon"; // Default
          }
        }

        if (!role) {
          reject(new Error("Invalid email or password"));
          return;
        }

        // Mock company bilgisi
        const company: Company = {
          id: "company-" + Date.now(),
          name: `${industry.charAt(0).toUpperCase() + industry.slice(1)} Company`,
          email: credentials.email,
          industry,
        };

        resolve({
          user: {
            email: credentials.email,
            role,
            token: "mock-token-" + Date.now(),
          },
          company,
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
        const savedCompany = localStorage.getItem("company");
        
        if (savedUser) {
          try {
            const userData = JSON.parse(savedUser);
            const user: User = {
              email: userData.email,
              role: userData.role,
            };
            
            // Company bilgisini de ekle
            if (savedCompany) {
              try {
                user.company = JSON.parse(savedCompany);
              } catch {
                // Company parse hatası - devam et
              }
            }
            
            resolve(user);
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

