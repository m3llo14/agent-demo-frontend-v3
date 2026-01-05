"use client";

import { useState, useEffect } from "react";
import { DashboardStatsData } from "@/types/dashboard";
import { dashboardService } from "@/features/dashboard/services/dashboard.service";

export const useDashboardStats = () => {
  const [data, setData] = useState<DashboardStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const statsData = await dashboardService.getStats();
        setData(statsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return { data, loading, error };
};

