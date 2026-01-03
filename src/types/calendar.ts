export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface CalendarAppointment {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // HH:mm format
  customerId: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone?: string;
  service: string;
  duration: number; // minutes
  staffId: string;
  staffName: string;
  price: number;
  status: AppointmentStatus;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CalendarAppointmentsResponse {
  appointments: CalendarAppointment[];
  total: number;
}

export interface CalendarFilters {
  status?: AppointmentStatus | "all";
  date?: string; // YYYY-MM-DD format
  month?: number; // 0-11
  year?: number;
  staffId?: string;
}

export type CalendarViewMode = "calendar" | "list";

export interface CalendarDateInfo {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointments: CalendarAppointment[];
}

