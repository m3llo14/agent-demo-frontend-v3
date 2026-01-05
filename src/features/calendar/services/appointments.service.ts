import apiClient from "@/lib/api-client";
import {
  CalendarAppointment,
  CalendarAppointmentsResponse,
  CalendarFilters,
} from "@/types/calendar";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Appointments Service
 * Feature-specific service - Sadece calendar modülü için
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export const appointmentsService = {
  /**
   * Randevuları filtrelerle getir
   * Backend entegrasyonu için hazır
   */
  async getAll(
    filters: CalendarFilters
  ): Promise<CalendarAppointmentsResponse> {
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
    const endpoint = queryString
      ? `/appointments?${queryString}`
      : "/appointments";
    
    return apiClient.get<CalendarAppointmentsResponse>(endpoint);
    */

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

    // Mock implementation
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
  },

  /**
   * Yeni randevu oluştur
   * Backend entegrasyonu için hazır
   */
  async create(
    appointment: Omit<CalendarAppointment, "id" | "createdAt" | "updatedAt">
  ): Promise<CalendarAppointment> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.post<CalendarAppointment>("/appointments", appointment);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAppointment: CalendarAppointment = {
          ...appointment,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        resolve(newAppointment);
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Randevu güncelle
   * Backend entegrasyonu için hazır
   */
  async update(appointment: CalendarAppointment): Promise<CalendarAppointment> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.put<CalendarAppointment>(
    //   `/appointments/${appointment.id}`,
    //   appointment
    // );

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedAppointment: CalendarAppointment = {
          ...appointment,
          updatedAt: new Date().toISOString(),
        };
        resolve(updatedAppointment);
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Randevu sil
   * Backend entegrasyonu için hazır
   */
  async delete(appointmentId: string): Promise<void> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.delete(`/appointments/${appointmentId}`);

    // Mock implementation
    return Promise.resolve();
  },
};

