import apiClient from "@/lib/api-client";
import { Notification, NotificationsResponse } from "@/types/notifications";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Notifications Service
 * Feature-specific service - Sadece notifications modülü için
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export const notificationsService = {
  /**
   * Tüm bildirimleri getir
   * Backend entegrasyonu için hazır
   */
  async getAll(): Promise<NotificationsResponse> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.get<NotificationsResponse>("/notifications");

    // Mock data generator - Backend entegrasyonu sonrası kaldırılacak
    const generateMockNotifications = (): Notification[] => {
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      
      return [
        {
          id: "1",
          customerId: "2",
          customerFirstName: "Ali",
          customerLastName: "veli",
          customerPhone: "05554443322",
          appointmentId: "1",
          appointmentDate: todayStr,
          appointmentTime: "14:30",
          service: "Manikür",
          status: "pending",
          createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 saat önce
          read: false,
        },
        {
          id: "2",
          customerId: "1",
          customerFirstName: "Ahmet",
          customerLastName: "YILMAZ",
          customerPhone: "05554443322",
          appointmentId: "2",
          appointmentDate: todayStr,
          appointmentTime: "16:00",
          service: "Saç Kesimi",
          status: "confirmed",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 saat önce
          read: false,
        },
        {
          id: "3",
          customerId: "3",
          customerFirstName: "Ayşe",
          customerLastName: "DEMİR",
          customerPhone: "05554443322",
          appointmentId: "3",
          appointmentDate: todayStr,
          appointmentTime: "10:00",
          service: "Saç Boyama",
          status: "confirmed",
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 saat önce
          read: true,
        },
      ];
    };

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockNotifications = generateMockNotifications();
        resolve({
          notifications: mockNotifications,
          total: mockNotifications.length,
          unread: mockNotifications.filter((n) => !n.read).length,
        });
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Bildirimi sil
   * Backend entegrasyonu için hazır
   */
  async delete(notificationId: string): Promise<void> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.delete(`/notifications/${notificationId}`);

    // Mock implementation
    return Promise.resolve();
  },

  /**
   * Bildirimi okundu olarak işaretle
   * Backend entegrasyonu için hazır
   */
  async markAsRead(notificationId: string): Promise<void> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.patch(`/notifications/${notificationId}/read`);

    // Mock implementation
    return Promise.resolve();
  },
};

