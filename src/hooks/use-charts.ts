"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MonthlyAppointmentData,
  ChartFilters,
} from "@/types/charts";
import { chartsService } from "@/features/charts/services/charts.service";

/**
 * Charts hook
 * Service katmanını kullanarak chart verilerini yönetir
 */
export function useCharts() {
  const [data, setData] = useState<MonthlyAppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ChartFilters>({});

  // Load chart data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await chartsService.getAppointmentsChart(filters);
        setData(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load chart data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<ChartFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Refetch data
  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await chartsService.getAppointmentsChart(filters);
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load chart data"
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  return {
    data,
    loading,
    error,
    filters,
    updateFilters,
    refetch,
  };
}

