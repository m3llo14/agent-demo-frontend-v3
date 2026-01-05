"use client";

import { useState, useEffect, useCallback } from "react";
import { CallLog, CallLogsResponse, CallLogsFilters } from "@/types/calls";
import apiClient from "@/lib/api-client";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Call logs hook
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export function useCalls() {
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CallLogsFilters>({});

  // Mock data generator - Backend entegrasyonu sonrası kaldırılacak
  const generateMockCalls = (): CallLog[] => {
    const today = new Date();
    const currentDate = today.toISOString().split("T")[0];
    
    return [
      {
        id: "1",
        phoneNumber: "05308401606",
        customerId: "1",
        customerFirstName: "Emre",
        customerLastName: "Akdeniz",
        date: currentDate,
        time: "12:37",
        duration: 60, // 1 hour
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        phoneNumber: "05446222518",
        customerId: "2",
        customerFirstName: "musteri",
        customerLastName: "SANDIKÇI",
        date: currentDate,
        time: "14:30",
        duration: 15,
        status: "ended",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      },
      {
        id: "3",
        phoneNumber: "05053951905",
        customerId: "1",
        customerFirstName: "Emre",
        customerLastName: "Akdeniz",
        date: currentDate,
        time: "16:00",
        duration: 5,
        status: "missed",
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ];
  };

  // Backend entegrasyonu için hazır fonksiyon
  const fetchCalls = useCallback(async (filters: CallLogsFilters): Promise<CallLogsResponse> => {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    /*
    const params = new URLSearchParams();
    if (filters.startDate) {
      params.append("startDate", filters.startDate);
    }
    if (filters.endDate) {
      params.append("endDate", filters.endDate);
    }
    if (filters.phoneNumber) {
      params.append("phoneNumber", filters.phoneNumber);
    }
    if (filters.status) {
      params.append("status", filters.status);
    }

    const queryString = params.toString();
    const endpoint = queryString ? `/calls?${queryString}` : "/calls";
    
    return apiClient.get<CallLogsResponse>(endpoint);
    */

    // Mock data - Backend entegrasyonu sonrası kaldırılacak
    return new Promise((resolve) => {
      setTimeout(() => {
        let mockCalls = generateMockCalls();

        // Filter by date range
        if (filters.startDate || filters.endDate) {
          mockCalls = mockCalls.filter((call) => {
            const callDate = call.date;
            if (filters.startDate && callDate < filters.startDate) {
              return false;
            }
            if (filters.endDate && callDate > filters.endDate) {
              return false;
            }
            return true;
          });
        }

        // Filter by phone number
        if (filters.phoneNumber) {
          const phoneFilter = filters.phoneNumber.toLowerCase().trim();
          mockCalls = mockCalls.filter(
            (call) =>
              call.phoneNumber.includes(phoneFilter) ||
              call.customerFirstName?.toLowerCase().includes(phoneFilter) ||
              call.customerLastName?.toLowerCase().includes(phoneFilter)
          );
        }

        // Filter by status
        if (filters.status) {
          mockCalls = mockCalls.filter((call) => call.status === filters.status);
        }

        resolve({
          calls: mockCalls,
          total: mockCalls.length,
        });
      }, MOCK_DELAYS.MEDIUM);
    });
  }, []);

  // Load calls
  useEffect(() => {
    const loadCalls = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchCalls(filters);
        setCalls(response.calls);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load calls");
      } finally {
        setLoading(false);
      }
    };

    loadCalls();
  }, [filters, fetchCalls]);

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
      const response = await fetchCalls(filters);
      setCalls(response.calls);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load calls");
    } finally {
      setLoading(false);
    }
  }, [filters, fetchCalls]);

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

