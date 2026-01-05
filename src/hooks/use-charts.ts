"use client";

import { useState, useEffect, useCallback } from "react";
import { MonthlyAppointmentData, AppointmentsChartResponse, ChartFilters } from "@/types/charts";
import apiClient from "@/lib/api-client";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Charts hook
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export function useCharts() {
  const [data, setData] = useState<MonthlyAppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ChartFilters>({});

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

  // Backend entegrasyonu için hazır fonksiyon
  const fetchChartData = useCallback(async (filters: ChartFilters): Promise<AppointmentsChartResponse> => {
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
    const endpoint = queryString ? `/charts/appointments?${queryString}` : "/charts/appointments";
    
    return apiClient.get<AppointmentsChartResponse>(endpoint);
    */

    // Mock data - Backend entegrasyonu sonrası kaldırılacak
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
  }, []);

  // Load chart data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchChartData(filters);
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load chart data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters, fetchChartData]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<ChartFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Refetch data
  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchChartData(filters);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load chart data");
    } finally {
      setLoading(false);
    }
  }, [filters, fetchChartData]);

  return {
    data,
    loading,
    error,
    filters,
    updateFilters,
    refetch,
  };
}

