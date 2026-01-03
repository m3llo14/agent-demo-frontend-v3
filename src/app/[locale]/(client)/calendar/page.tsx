"use client";

import { useState, useEffect } from "react";
import { Box, CircularProgress, Alert, useTheme } from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { useCalendar } from "@/hooks/use-calendar";
import CalendarView from "@/features/calendar/CalendarView";
import AppointmentDayModal from "@/features/calendar/AppointmentDayModal";
import { CalendarAppointment } from "@/types/calendar";

export default function CalendarPage() {
  const { appointments, loading, error, filters, updateFilters, deleteAppointment } = useCalendar();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dayModalOpen, setDayModalOpen] = useState(false);
  const [selectedDayAppointments, setSelectedDayAppointments] = useState<CalendarAppointment[]>([]);

  // Hydration hatasını önlemek için client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // Month/year değiştiğinde filtreleri güncelle
  useEffect(() => {
    updateFilters({
      month: currentMonth,
      year: currentYear,
    });
  }, [currentMonth, currentYear, updateFilters]);

  // Filter değiştiğinde hook'u güncelle
  const handleFilterChange = (status: string) => {
    updateFilters({
      status: status === "all" ? "all" : (status as any),
    });
  };

  // Month navigation
  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  // Day click handler - Modal'ı açar
  const handleDayClick = (date: Date, dayAppointments: CalendarAppointment[]) => {
    setSelectedDate(date);
    setSelectedDayAppointments(dayAppointments);
    setDayModalOpen(true);
  };

  // Modal kapatma
  const handleModalClose = () => {
    setDayModalOpen(false);
    setSelectedDate(null);
    setSelectedDayAppointments([]);
  };

  // Appointment click handler (gelecekte modal veya detay sayfası için)
  const handleAppointmentClick = (appointment: CalendarAppointment) => {
    // TODO: Appointment detay modal'ı veya sayfası açılacak
    console.log("Appointment clicked:", appointment);
  };

  // Add appointment handler (gelecekte form modal'ı için)
  const handleAddAppointment = () => {
    // TODO: Appointment ekleme modal'ı açılacak
    console.log("Add appointment clicked");
  };

  // Appointment edit handler
  const handleAppointmentEdit = (appointment: CalendarAppointment) => {
    // TODO: Appointment düzenleme modal'ı açılacak
    console.log("Edit appointment:", appointment);
  };

  // Appointment delete handler
  const handleAppointmentDelete = async (appointmentId: string) => {
    try {
      await deleteAppointment(appointmentId);
      // Modal'daki randevuları güncelle
      setSelectedDayAppointments((prev) =>
        prev.filter((apt) => apt.id !== appointmentId)
      );
    } catch (err) {
      console.error("Failed to delete appointment:", err);
      alert(err instanceof Error ? err.message : "Randevu silinirken bir hata oluştu");
    }
  };

  // Server-side render sırasında boş render döndür
  if (!mounted) {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: 2 }} />
        <Box sx={{ mb: 3 }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <CalendarView
        appointments={appointments}
        loading={loading}
        currentMonth={currentMonth}
        currentYear={currentYear}
        onMonthChange={handleMonthChange}
        onFilterChange={handleFilterChange}
        currentFilter={filters.status || "all"}
        onAddAppointment={handleAddAppointment}
        onAppointmentClick={handleAppointmentClick}
        onDayClick={handleDayClick}
      />

      {/* Day Appointments Modal */}
      <AppointmentDayModal
        open={dayModalOpen}
        onClose={handleModalClose}
        date={selectedDate}
        appointments={selectedDayAppointments}
        onAppointmentEdit={handleAppointmentEdit}
        onAppointmentDelete={handleAppointmentDelete}
      />
    </Box>
  );
}
