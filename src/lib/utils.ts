import { AVATAR_COLORS, CUSTOMER_AVATAR_COLORS, STATUS_COLORS } from "./constants";

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Date and Time Utilities
 */

/**
 * Format date string to DD.MM.YYYY format
 */
export function formatDate(dateString: string | null, t?: (key: string) => string): string {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return "-";
  }
}

/**
 * Format date and time string to DD.MM.YYYY - HH:MM format
 */
export function formatDateTime(dateString: string, timeString: string): string {
  try {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year} - ${timeString}`;
  } catch {
    return `${dateString} - ${timeString}`;
  }
}

/**
 * Get month name by index (0-11) based on locale
 */
export function getMonthName(monthIndex: number, t: (key: string) => string, locale: string = "tr"): string {
  const months = [
    t("calendar.months.january"),
    t("calendar.months.february"),
    t("calendar.months.march"),
    t("calendar.months.april"),
    t("calendar.months.may"),
    t("calendar.months.june"),
    t("calendar.months.july"),
    t("calendar.months.august"),
    t("calendar.months.september"),
    t("calendar.months.october"),
    t("calendar.months.november"),
    t("calendar.months.december"),
  ];
  return months[monthIndex] || "";
}

/**
 * Format date with month name (e.g., "15 Ocak 2024")
 */
export function formatDateWithMonth(dateString: string, t: (key: string) => string, locale: string = "tr"): string {
  try {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = getMonthName(date.getMonth(), t, locale);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return dateString;
  }
}

/**
 * Calculate time ago string (e.g., "2 saat önce")
 */
export function getTimeAgo(
  dateString: string,
  t: (key: string) => string,
  locale: string = "tr"
): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    const dayWord = locale === "tr" ? "gün" : diffDays > 1 ? "days" : "day";
    return `${t("notifications.daysAgo")} ${diffDays} ${dayWord} ${t("notifications.timeAgoSuffix")}`;
  } else if (diffHours > 0) {
    const hourWord = locale === "tr" ? "saat" : diffHours > 1 ? "hours" : "hour";
    return `${t("notifications.hoursAgo")} ${diffHours} ${hourWord} ${t("notifications.timeAgoSuffix")}`;
  } else {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const minuteWord = locale === "tr" ? "dakika" : diffMinutes > 1 ? "minutes" : "minute";
    return `${t("notifications.minutesAgo")} ${diffMinutes} ${minuteWord} ${t("notifications.timeAgoSuffix")}`;
  }
}

/**
 * User and Avatar Utilities
 */

/**
 * Get user initials from first and last name
 */
export function getInitials(firstName: string, lastName: string): string {
  const first = firstName.charAt(0).toUpperCase();
  const last = lastName.charAt(0).toUpperCase();
  return `${first}${last}`;
}

/**
 * Get avatar color based on name (for notifications)
 */
export function getAvatarColor(name: string): { bg: string; text: string } {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

/**
 * Get avatar color based on index (for customer cards)
 */
export function getCustomerAvatarColor(index: number): { bg: string; text: string } {
  return CUSTOMER_AVATAR_COLORS[index % CUSTOMER_AVATAR_COLORS.length];
}

/**
 * Status Utilities
 */

/**
 * Get status text translation
 */
export function getStatusText(status: string, t: (key: string) => string): string {
  switch (status) {
    case "pending":
      return t("common.status.pending");
    case "confirmed":
      return t("common.status.confirmed");
    case "cancelled":
      return t("common.status.cancelled");
    case "completed":
      return t("common.status.completed") || status;
    default:
      return status;
  }
}

/**
 * Get status color
 */
export function getStatusColor(status: string, isLightMode: boolean = false): string {
  switch (status) {
    case "pending":
      return STATUS_COLORS.PENDING;
    case "confirmed":
      return STATUS_COLORS.CONFIRMED;
    case "cancelled":
      return STATUS_COLORS.CANCELLED;
    case "completed":
      return STATUS_COLORS.COMPLETED;
    default:
      return isLightMode ? "#757575" : "#BDBDBD";
  }
}

/**
 * Format duration in minutes to HH:MM format
 */
export function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours}:00`;
    }
    return `${hours}:${mins.toString().padStart(2, "0")}`;
  }
  return `0:${minutes.toString().padStart(2, "0")}`;
}
