"use client";

import { useState, useEffect, useCallback } from "react";
import { CalendarAppointment, CalendarAppointmentsResponse, CalendarFilters } from "@/types/calendar";
import apiClient from "@/lib/api-client";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Calendar appointments hook
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export function useCalendar() {
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CalendarFilters>({
    status: "all",
  });

  // Mock data generator - Backend entegrasyonu sonrası kaldırılacak
  const generateMockAppointments = (): CalendarAppointment[] => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    return [
      {
        id: "1",
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-09`,
        time: "16:00",
        customerId: "2",
        customerFirstName: "musteri",
        customerLastName: "SANDIKÇI",
        customerPhone: "05446222518",
        service: "Saç Boyama",
        duration: 60,
        staffId: "2",
        staffName: "Büşra Yılmaz",
        price: 500,
        status: "confirmed",
      },
      {
        id: "2",
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-14`,
        time: "14:30",
        customerId: "2",
        customerFirstName: "musteri",
        customerLastName: "SANDIKÇI",
        customerPhone: "05446222518",
        service: "Manikür",
        duration: 45,
        staffId: "1",
        staffName: "Alperen Demirci",
        price: 300,
        status: "pending",
      },
      {
        id: "3",
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-15`,
        time: "12:00",
        customerId: "2",
        customerFirstName: "musteri",
        customerLastName: "musteri s",
        customerPhone: "05446222518",
        service: "Solaryum, İğneli Epilasyon",
        duration: 90,
        staffId: "1",
        staffName: "Alperen Demirci",
        price: 600,
        status: "confirmed",
      },
      {
        id: "4",
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-15`,
        time: "12:00",
        customerId: "2",
        customerFirstName: "musteri",
        customerLastName: "musteri s",
        customerPhone: "05446222518",
        service: "İğneli Epilasyon",
        duration: 60,
        staffId: "2",
        staffName: "Büşra Yılmaz",
        price: 400,
        status: "confirmed",
      },
      {
        id: "5",
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-15`,
        time: "15:00",
        customerId: "2",
        customerFirstName: "musteri",
        customerLastName: "musteri s",
        customerPhone: "05446222518",
        service: "Bildirim Test Saç Boyama",
        duration: 60,
        staffId: "2",
        staffName: "Büşra Yılmaz",
        price: 500,
        status: "pending",
      },
      {
        id: "6",
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-15`,
        time: "15:00",
        customerId: "2",
        customerFirstName: "Pınar",
        customerLastName: "SANDIKÇI",
        customerPhone: "05446222518",
        service: "Test Saç Boyama",
        duration: 60,
        staffId: "2",
        staffName: "Büşra Yılmaz",
        price: 500,
        status: "confirmed",
      },
      {
        id: "7",
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-17`,
        time: "15:00",
        customerId: "2",
        customerFirstName: "Pınar",
        customerLastName: "SANDIKÇI",
        customerPhone: "05446222518",
        service: "Saç Kesim, Fön",
        duration: 45,
        staffId: "2",
        staffName: "Büşra Yılmaz",
        price: 350,
        status: "confirmed",
      },
      {
        id: "8",
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-19`,
        time: "12:00",
        customerId: "2",
        customerFirstName: "Pınar",
        customerLastName: "SANDIKÇI",
        customerPhone: "05446222518",
        service: "Manikür, Pedikür",
        duration: 90,
        staffId: "2",
        staffName: "Büşra Yılmaz",
        price: 600,
        status: "pending",
      },
    ];
  };

  // Backend entegrasyonu için hazır fonksiyon
  const fetchAppointments = useCallback(async (filters: CalendarFilters): Promise<CalendarAppointmentsResponse> => {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    /*
    const params = new URLSearchParams();
    if (filters.status && filters.status !== "all") {
      params.append("status", filters.status);
    }
    if (filters.date) {
      params.append("date", filters.date);
    }
    if (filters.month !== undefined) {
      params.append("month", filters.month.toString());
    }
    if (filters.year) {
      params.append("year", filters.year.toString());
    }
    if (filters.staffId) {
      params.append("staffId", filters.staffId);
    }

    const queryString = params.toString();
    const endpoint = queryString ? `/appointments?${queryString}` : "/appointments";
    
    return apiClient.get<CalendarAppointmentsResponse>(endpoint);
    */

    // Mock data - Backend entegrasyonu sonrası kaldırılacak
    return new Promise((resolve) => {
      setTimeout(() => {
        let mockAppointments = generateMockAppointments();

        // Filter by status
        if (filters.status && filters.status !== "all") {
          mockAppointments = mockAppointments.filter(
            (apt) => apt.status === filters.status
          );
        }

        // Filter by date
        if (filters.date) {
          mockAppointments = mockAppointments.filter(
            (apt) => apt.date === filters.date
          );
        }

        // Filter by month/year
        if (filters.month !== undefined && filters.year) {
          mockAppointments = mockAppointments.filter((apt) => {
            const aptDate = new Date(apt.date);
            return (
              aptDate.getMonth() === filters.month &&
              aptDate.getFullYear() === filters.year
            );
          });
        }

        resolve({
          appointments: mockAppointments,
          total: mockAppointments.length,
        });
      }, MOCK_DELAYS.MEDIUM);
    });
  }, []);

  // Load appointments
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchAppointments(filters);
        setAppointments(response.appointments);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [filters, fetchAppointments]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<CalendarFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Create appointment (Backend entegrasyonu için hazır)
  const createAppointment = useCallback(async (
    appointment: Omit<CalendarAppointment, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
      /*
      const newAppointment = await apiClient.post<CalendarAppointment>(
        "/appointments",
        appointment
      );
      setAppointments((prev) => [...prev, newAppointment]);
      return newAppointment;
      */

      // Mock implementation
      const newAppointment: CalendarAppointment = {
        ...appointment,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setAppointments((prev) => [...prev, newAppointment]);
      return newAppointment;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to create appointment");
    }
  }, []);

  // Update appointment (Backend entegrasyonu için hazır)
  const updateAppointment = useCallback(async (appointment: CalendarAppointment) => {
    try {
      // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
      /*
      const updatedAppointment = await apiClient.put<CalendarAppointment>(
        `/appointments/${appointment.id}`,
        appointment
      );
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === appointment.id ? updatedAppointment : apt))
      );
      return updatedAppointment;
      */

      // Mock implementation
      const updatedAppointment: CalendarAppointment = {
        ...appointment,
        updatedAt: new Date().toISOString(),
      };
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === appointment.id ? updatedAppointment : apt))
      );
      return updatedAppointment;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update appointment");
    }
  }, []);

  // Delete appointment (Backend entegrasyonu için hazır)
  const deleteAppointment = useCallback(async (appointmentId: string) => {
    try {
      // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
      /*
      await apiClient.delete(`/appointments/${appointmentId}`);
      setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));
      */

      // Mock implementation
      setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to delete appointment");
    }
  }, []);

  // Refetch appointments
  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchAppointments(filters);
      setAppointments(response.appointments);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }, [filters, fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    filters,
    updateFilters,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    refetch,
  };
}

