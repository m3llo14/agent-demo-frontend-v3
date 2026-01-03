export type AppointmentStatus = "pending" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  date: string; // ISO date string
  time: string; // HH:mm format
  service: string;
  duration: number; // minutes
  staff: string;
  price: number;
  status: AppointmentStatus;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  lastAppointment: string | null; // ISO date string or null
  callCount: number;
  totalSpending: number | null; // null if no spending
  appointmentCount: number;
  appointments: Appointment[]; // Last appointments
}

export interface CustomersData {
  customers: Customer[];
  total: number;
}

