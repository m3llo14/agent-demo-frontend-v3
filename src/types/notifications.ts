/**
 * Notification types
 * Bildirim sistemi için type tanımlamaları
 */

export interface Notification {
  id: string;
  customerId: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone?: string;
  appointmentId: string;
  appointmentDate: string; // YYYY-MM-DD formatında
  appointmentTime: string; // HH:mm formatında
  service: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string; // ISO date string
  read: boolean;
}

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  unread: number;
}

