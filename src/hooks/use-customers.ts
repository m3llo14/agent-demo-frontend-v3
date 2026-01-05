"use client";

import { useState, useEffect } from "react";
import { CustomersData } from "@/types/customers";
import { customersService } from "@/features/customers/services/customers.service";

/**
 * Customers hook
 * Service katmanını kullanarak müşterileri yönetir
 */
export function useCustomers() {
  const [data, setData] = useState<CustomersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await customersService.getAll();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch customers"
        );
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
      const result = await customersService.getAll(query);
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to search customers"
      );
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await customersService.getAll();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch customers"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    searchCustomers,
    refetch,
  };
}

