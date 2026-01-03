/**
 * ÖRNEK: Backend entegrasyonu ile güncellenmiş use-customers.ts
 * 
 * Bu dosya sadece örnek olarak gösterilmiştir.
 * Gerçek kullanım için use-customers.ts dosyasını bu şekilde güncelleyin.
 */

"use client";

import { useState, useEffect } from "react";
import { Customer, CustomersData } from "@/types/customers";
import apiClient from "@/lib/api-client";

export function useCustomers() {
  const [data, setData] = useState<CustomersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Backend'den müşterileri çek
  const fetchCustomers = async (searchQuery?: string): Promise<CustomersData> => {
    // Query parametresi varsa ekle
    const endpoint = searchQuery
      ? `/customers?search=${encodeURIComponent(searchQuery)}`
      : "/customers";

    // API client kullanarak istek yap
    return apiClient.get<CustomersData>(endpoint);
  };

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchCustomers();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  const searchCustomers = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchCustomers(query);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search customers");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    searchCustomers,
    refetch: async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchCustomers();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    },
  };
}

