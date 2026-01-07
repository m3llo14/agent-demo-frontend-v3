"use client";

import { useState, useEffect } from "react";
import { CompaniesData } from "@/types/companies";
import { companiesService } from "@/features/admin/services/companies.service";

/**
 * Companies hook
 * Service katmanını kullanarak şirketleri yönetir
 */
export function useCompanies() {
  const [data, setData] = useState<CompaniesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await companiesService.getAll();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch companies"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const searchCompanies = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await companiesService.getAll(query);
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to search companies"
      );
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await companiesService.getAll();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch companies"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    searchCompanies,
    refetch,
  };
}

