"use client";

import { useState, useEffect, useCallback } from "react";
import { notificationsService } from "@/features/notifications/services/notifications.service";

/**
 * Notifications hook
 * Service katmanını kullanarak bildirimleri yönetir
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState<
    import("@/types/notifications").Notification[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Backend'den bildirimleri çek
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await notificationsService.getAll();
      setNotifications(response.notifications);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Bildirimler yüklenirken bir hata oluştu"
      );
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Bildirimi sil
  const deleteNotification = useCallback(async (notificationId: string) => {
    try {
      await notificationsService.delete(notificationId);
      // Local state'den sil
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Bildirim silinirken bir hata oluştu"
      );
      console.error("Error deleting notification:", err);
      throw err;
    }
  }, []);

  // Bildirimi okundu olarak işaretle
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await notificationsService.markAsRead(notificationId);
      // Local state'de güncelle
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

