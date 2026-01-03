"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Avatar,
  useTheme,
  CircularProgress,
  Button,
} from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { Notification } from "@/types/notifications";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotifications } from "@/hooks/use-notifications";

interface NotificationsModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * NotificationsModal Component
 * Bildirimleri gösteren modal component
 * DRY ve clean code prensiplerine uygun olarak tasarlandı
 */
export default function NotificationsModal({
  open,
  onClose,
}: NotificationsModalProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLightMode = theme.palette.mode === "light";
  const { t, locale } = useLocale();
  const { notifications, loading, deleteNotification } = useNotifications();

  // Tarih formatla
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Saat formatla
  const formatTime = (timeString: string): string => {
    return timeString;
  };

  // Ne kadar zaman önce hesapla
  const getTimeAgo = (dateString: string): string => {
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
  };

  // Avatar rengi hesapla
  const getAvatarColor = (name: string) => {
    const colors = [
      { bg: "#e3f2fd", text: "#1976d2" },
      { bg: "#f3e5f5", text: "#7b1fa2" },
      { bg: "#e8f5e9", text: "#388e3c" },
      { bg: "#fff3e0", text: "#f57c00" },
      { bg: "#fce4ec", text: "#c2185b" },
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // İsim baş harflerini al
  const getInitials = (firstName: string, lastName: string): string => {
    const first = firstName.charAt(0).toUpperCase();
    const last = lastName.charAt(0).toUpperCase();
    return `${first}${last}`;
  };

  // Status çevirisi
  const getStatusText = (status: string): string => {
    switch (status) {
      case "pending":
        return t("notifications.status.pending");
      case "confirmed":
        return t("notifications.status.confirmed");
      case "cancelled":
        return t("notifications.status.cancelled");
      default:
        return status;
    }
  };

  // Status rengi
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "#ff9800";
      case "confirmed":
        return "#4caf50";
      case "cancelled":
        return "#f44336";
      default:
        return colors.grey[500];
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
          backgroundImage: "none",
          boxShadow: isLightMode
            ? "0 4px 20px rgba(0,0,0,0.15)"
            : "0 4px 20px rgba(0,0,0,0.5)",
          borderRadius: "8px",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: isLightMode ? colors.grey[100] : colors.grey[100],
          borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
          pb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {t("notifications.title")}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: isLightMode ? colors.grey[400] : colors.grey[400],
            "&:hover": {
              backgroundColor: isLightMode ? colors.grey[900] : colors.primary[500],
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2, p: 0 }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <CircularProgress />
          </Box>
        ) : notifications.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
            }}
          >
            <Typography
              sx={{
                color: isLightMode ? colors.grey[300] : colors.grey[300],
              }}
            >
              {t("notifications.noNotifications")}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ maxHeight: "70vh", overflowY: "auto" }}>
            {notifications.map((notification) => {
              const avatarColor = getAvatarColor(
                `${notification.customerFirstName} ${notification.customerLastName}`
              );
              const initials = getInitials(
                notification.customerFirstName,
                notification.customerLastName
              );
              const statusColor = getStatusColor(notification.status);

              return (
                <Box
                  key={notification.id}
                  sx={{
                    p: 2,
                    borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
                    display: "flex",
                    gap: 2,
                    position: "relative",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                    "&:hover": {
                      backgroundColor: isLightMode
                        ? colors.grey[900]
                        : colors.primary[500],
                    },
                  }}
                >
                  {/* Avatar */}
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: avatarColor.bg,
                        color: avatarColor.text,
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      {initials}
                    </Avatar>
                    {!notification.read && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: statusColor,
                          border: `2px solid ${isLightMode ? "#ffffff" : colors.primary[400]}`,
                        }}
                      />
                    )}
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        color: isLightMode ? colors.grey[100] : colors.grey[100],
                        mb: 0.5,
                      }}
                    >
                      {notification.customerFirstName} {notification.customerLastName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isLightMode ? colors.grey[300] : colors.grey[300],
                        mb: 0.5,
                      }}
                    >
                      {formatDate(notification.appointmentDate)} - {formatTime(notification.appointmentTime)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isLightMode ? colors.grey[300] : colors.grey[300],
                        mb: 0.5,
                      }}
                    >
                      {notification.service}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[400] : colors.grey[400],
                        }}
                      >
                        {getStatusText(notification.status)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[400] : colors.grey[400],
                        }}
                      >
                        •
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[400] : colors.grey[400],
                        }}
                      >
                        {getTimeAgo(notification.createdAt)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Delete Button */}
                  <IconButton
                    onClick={() => handleDelete(notification.id)}
                    sx={{
                      color: isLightMode ? colors.grey[400] : colors.grey[400],
                      "&:hover": {
                        backgroundColor: isLightMode
                          ? colors.redAccent[900]
                          : colors.redAccent[800],
                        color: colors.redAccent[500],
                      },
                    }}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

