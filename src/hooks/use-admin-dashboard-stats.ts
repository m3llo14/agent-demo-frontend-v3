"use client";

import { useState, useEffect } from "react";
import { AdminDashboardStatsData } from "@/types/dashboard";
import { adminDashboardService } from "@/features/admin/services/admin-dashboard.service";

export const useAdminDashboardStats = () => {
  const [data, setData] = useState<AdminDashboardStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const statsData = await adminDashboardService.getStats();
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

