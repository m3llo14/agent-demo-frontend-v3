"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CalendarAppointment,
  CalendarFilters,
} from "@/types/calendar";
import { appointmentsService } from "@/features/calendar/services/appointments.service";

/**
 * Calendar appointments hook
 * Service katmanını kullanarak randevuları yönetir
 */
export function useCalendar() {
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CalendarFilters>({
    status: "all",
  });

  // Load appointments
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await appointmentsService.getAll(filters);
        setAppointments(response.appointments);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [filters]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<CalendarFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Create appointment
  const createAppointment = useCallback(
    async (
      appointment: Omit<
        CalendarAppointment,
        "id" | "createdAt" | "updatedAt"
      >
    ) => {
      try {
        const newAppointment = await appointmentsService.create(appointment);
        setAppointments((prev) => [...prev, newAppointment]);
        return newAppointment;
      } catch (err) {
        throw new Error(
          err instanceof Error
            ? err.message
            : "Failed to create appointment"
        );
      }
    },
    []
  );

  // Update appointment
  const updateAppointment = useCallback(
    async (appointment: CalendarAppointment) => {
      try {
        const updatedAppointment =
          await appointmentsService.update(appointment);
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === appointment.id ? updatedAppointment : apt
          )
        );
        return updatedAppointment;
      } catch (err) {
        throw new Error(
          err instanceof Error
            ? err.message
            : "Failed to update appointment"
        );
      }
    },
    []
  );

  // Delete appointment
  const deleteAppointment = useCallback(async (appointmentId: string) => {
    try {
      await appointmentsService.delete(appointmentId);
      setAppointments((prev) =>
        prev.filter((apt) => apt.id !== appointmentId)
      );
    } catch (err) {
      throw new Error(
        err instanceof Error
          ? err.message
          : "Failed to delete appointment"
      );
    }
  }, []);

  // Refetch appointments
  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await appointmentsService.getAll(filters);
      setAppointments(response.appointments);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load appointments"
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

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

