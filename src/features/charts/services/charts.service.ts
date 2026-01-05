import apiClient from "@/lib/api-client";
import {
  MonthlyAppointmentData,
  AppointmentsChartResponse,
  ChartFilters,
} from "@/types/charts";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Charts Service
 * Feature-specific service - Sadece charts modülü için
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export const chartsService = {
  /**
   * Aylık randevu verilerini getir
   * Backend entegrasyonu için hazır
   */
  async getAppointmentsChart(
    filters: ChartFilters
  ): Promise<AppointmentsChartResponse> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    /*
    const params = new URLSearchParams();
    if (filters.year) {
      params.append("year", filters.year.toString());
    }
    if (filters.startMonth !== undefined) {
      params.append("startMonth", filters.startMonth.toString());
    }
    if (filters.endMonth !== undefined) {
      params.append("endMonth", filters.endMonth.toString());
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `/charts/appointments?${queryString}`
      : "/charts/appointments";
    
    return apiClient.get<AppointmentsChartResponse>(endpoint);
    */

    // Mock data generator - Backend entegrasyonu sonrası kaldırılacak
    const generateMockData = (): MonthlyAppointmentData[] => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const months: MonthlyAppointmentData[] = [];

      // Son 12 ayın verilerini oluştur
      for (let i = 11; i >= 0; i--) {
        const date = new Date(currentYear, today.getMonth() - i, 1);
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        // Mock data - rastgele randevu sayıları
        const count = Math.floor(Math.random() * 100) + 20;

        months.push({
          month: "", // Component'te locale'e göre doldurulacak
          monthIndex,
          year,
          count,
        });
      }

      return months;
    };

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        let mockData = generateMockData();

        // Filter by year
        if (filters.year) {
          mockData = mockData.filter((item) => item.year === filters.year);
        }

        // Filter by month range
        if (filters.startMonth !== undefined && filters.endMonth !== undefined) {
          mockData = mockData.filter(
            (item) =>
              item.monthIndex >= filters.startMonth! &&
              item.monthIndex <= filters.endMonth!
          );
        }

        resolve({
          data: mockData,
          total: mockData.reduce((sum, item) => sum + item.count, 0),
        });
      }, MOCK_DELAYS.MEDIUM);
    });
  },
};

