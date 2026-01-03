"use client";

import { useState, useEffect, useCallback } from "react";
import { Notification, NotificationsResponse } from "@/types/notifications";
import apiClient from "@/lib/api-client";

/**
 * Notifications hook
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data generator - Backend entegrasyonu sonrası kaldırılacak
  const generateMockNotifications = (): Notification[] => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    
    // Bugünkü randevular için bildirimler oluştur
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

  // Backend'den bildirimleri çek
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Backend entegrasyonu
      // const response = await apiClient.get<NotificationsResponse>("/notifications");
      // setNotifications(response.data.notifications);

      // Mock data kullan
      const mockData = generateMockNotifications();
      setNotifications(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bildirimler yüklenirken bir hata oluştu");
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Bildirimi sil
  const deleteNotification = useCallback(async (notificationId: string) => {
    try {
      // TODO: Backend entegrasyonu
      // await apiClient.delete(`/notifications/${notificationId}`);

      // Mock data - local state'den sil
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bildirim silinirken bir hata oluştu");
      console.error("Error deleting notification:", err);
      throw err;
    }
  }, []);

  // Bildirimi okundu olarak işaretle
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      // TODO: Backend entegrasyonu
      // await apiClient.patch(`/notifications/${notificationId}/read`);

      // Mock data - local state'de güncelle
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    loading,
    error,
    unreadCount,
    deleteNotification,
    markAsRead,
    refetch: fetchNotifications,
  };
}

