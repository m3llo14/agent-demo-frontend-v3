"use client";

import { useState, useEffect } from "react";
import { MOCK_DELAYS } from "@/lib/constants";

export interface DashboardStatsData {
  totalAppointments: number;
  pendingAppointments: number;
  customers: number;
}

// TODO: API endpoint'i eklendiğinde bu fonksiyon gerçek API çağrısı yapacak
const fetchDashboardStats = async (): Promise<DashboardStatsData> => {
  // Simüle edilmiş API çağrısı
  // Gerçek implementasyonda: return await fetch('/api/dashboard/stats').then(res => res.json());
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalAppointments: 8,
        pendingAppointments: 2,
        customers: 1710,
      });
    }, MOCK_DELAYS.SHORT);
  });
};

export const useDashboardStats = () => {
  const [data, setData] = useState<DashboardStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const statsData = await fetchDashboardStats();
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

