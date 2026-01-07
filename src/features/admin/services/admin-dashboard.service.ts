import apiClient from "@/lib/api-client";
import { AdminDashboardStatsData } from "@/types/dashboard";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Admin Dashboard Service
 * Feature-specific service - Sadece admin dashboard modülü için
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export const adminDashboardService = {
  /**
   * Admin dashboard istatistiklerini getir
   * Backend entegrasyonu için hazır
   */
  async getStats(): Promise<AdminDashboardStatsData> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.get<AdminDashboardStatsData>("/admin/dashboard/stats");

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalCompanies: 45,
          totalAppointments: 1234,
          totalCustomers: 5678,
        });
      }, MOCK_DELAYS.SHORT);
    });
  },
};

