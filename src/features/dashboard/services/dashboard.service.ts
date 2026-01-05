import apiClient from "@/lib/api-client";
import { DashboardStatsData } from "@/types/dashboard";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Dashboard Service
 * Feature-specific service - Sadece dashboard modülü için
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export const dashboardService = {
  /**
   * Dashboard istatistiklerini getir
   * Backend entegrasyonu için hazır
   */
  async getStats(): Promise<DashboardStatsData> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.get<DashboardStatsData>("/dashboard/stats");

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalAppointments: 8,
          pendingAppointments: 2,
          customers: 1710,
        });
      }, MOCK_DELAYS.SHORT);
    });
  },
};

