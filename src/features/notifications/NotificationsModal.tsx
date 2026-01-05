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
import {
  formatDate,
  getInitials,
  getAvatarColor,
  getStatusText,
  getStatusColor,
  getTimeAgo,
} from "@/lib/utils";

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

  // Saat formatla
  const formatTime = (timeString: string): string => {
    return timeString;
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
              const statusColor = getStatusColor(notification.status, isLightMode);

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
                        {getStatusText(notification.status, t)}
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
                        {getTimeAgo(notification.createdAt, t, locale)}
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

