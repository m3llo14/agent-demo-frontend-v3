"use client";

import { useState, useEffect } from "react";
import { Customer, CustomersData } from "@/types/customers";

export function useCustomers() {
  const [data, setData] = useState<CustomersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async (searchQuery?: string): Promise<CustomersData> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data matching the image
        const mockCustomers: Customer[] = [
          {
            id: "1",
            firstName: "Emre",
            lastName: "Akdeniz",
            phone: "05053951905",
            lastAppointment: null,
            callCount: 0,
            totalSpending: null,
            appointmentCount: 0,
            appointments: [],
          },
          {
            id: "2",
            firstName: "Ali",
            lastName: "Ata",
            phone: "05446222518",
            lastAppointment: "2025-08-07",
            callCount: 1,
            totalSpending: null,
            appointmentCount: 1,
            appointments: [
              {
                id: "app1",
                date: "2025-08-07",
                time: "14:30",
                service: "Saç Kesim",
                duration: 30,
                staff: "Büşra Yılmaz",
                price: 400,
                status: "pending",
              },
            ],
          },
        ];

        // Filter by search query if provided
        let filteredCustomers = mockCustomers;
        if (searchQuery && searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          filteredCustomers = mockCustomers.filter(
            (customer) =>
              customer.firstName.toLowerCase().includes(query) ||
              customer.lastName.toLowerCase().includes(query) ||
              `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(query)
          );
        }

        resolve({
          customers: filteredCustomers,
          total: filteredCustomers.length,
        });
      }, 500);
    });
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
    refetch: () => {
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
    },
  };
}

