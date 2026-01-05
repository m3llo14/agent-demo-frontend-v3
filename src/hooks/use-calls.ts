"use client";

import { useState, useEffect, useCallback } from "react";
import { CallLog, CallLogsFilters } from "@/types/calls";
import { callsService } from "@/features/calls/services/calls.service";

/**
 * Call logs hook
 * Service katmanını kullanarak arama kayıtlarını yönetir
 */
export function useCalls() {
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CallLogsFilters>({});

  // Load calls
  useEffect(() => {
    const loadCalls = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await callsService.getAll(filters);
        setCalls(response.calls);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load calls");
      } finally {
        setLoading(false);
      }
    };

    loadCalls();
  }, [filters]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<CallLogsFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Refetch calls
  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await callsService.getAll(filters);
      setCalls(response.calls);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load calls");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  return {
    calls,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch,
  };
}

