"use client";

import { useState, useEffect } from "react";

export interface DashboardStatsData {
  emailsSent: number;
  salesObtained: number;
  newClients: number;
  trafficReceived: number;
  emailsProgress: number;
  salesProgress: number;
  clientsProgress: number;
  trafficProgress: number;
  emailsIncrease: string;
  salesIncrease: string;
  clientsIncrease: string;
  trafficIncrease: string;
}

// TODO: API endpoint'i eklendiğinde bu fonksiyon gerçek API çağrısı yapacak
const fetchDashboardStats = async (): Promise<DashboardStatsData> => {
  // Simüle edilmiş API çağrısı
  // Gerçek implementasyonda: return await fetch('/api/dashboard/stats').then(res => res.json());
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        emailsSent: 12361,
        salesObtained: 431225,
        newClients: 32441,
        trafficReceived: 1325134,
        emailsProgress: 14,
        salesProgress: 21,
        clientsProgress: 5,
        trafficProgress: 43,
        emailsIncrease: "+14%",
        salesIncrease: "+21%",
        clientsIncrease: "+5%",
        trafficIncrease: "+43%",
      });
    }, 100);
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

