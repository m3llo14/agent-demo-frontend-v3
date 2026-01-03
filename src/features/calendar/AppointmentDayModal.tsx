"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  Chip,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { CalendarAppointment } from "@/types/calendar";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface AppointmentDayModalProps {
  open: boolean;
  onClose: () => void;
  date: Date | null;
  appointments: CalendarAppointment[];
  onAppointmentEdit?: (appointment: CalendarAppointment) => void;
  onAppointmentDelete?: (appointmentId: string) => void;
}

/**
 * AppointmentDayModal Component
 * Seçilen günün randevularını gösteren modal
 * DRY ve clean code prensiplerine uygun olarak tasarlandı
 */
export default function AppointmentDayModal({
  open,
  onClose,
  date,
  appointments,
  onAppointmentEdit,
  onAppointmentDelete,
}: AppointmentDayModalProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const isLightMode = theme.palette.mode === "light";

  // Tarih formatlama fonksiyonu
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Durum rengi fonksiyonu
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return isLightMode ? "#FF9800" : "#FFB74D";
      case "confirmed":
        return isLightMode ? "#4CAF50" : "#81C784";
      case "cancelled":
        return isLightMode ? "#F44336" : "#E57373";
      case "completed":
        return isLightMode ? "#2196F3" : "#64B5F6";
      default:
        return isLightMode ? "#757575" : "#BDBDBD";
    }
  };

  // Durum etiketi fonksiyonu
  const getStatusLabel = (status: string) => {
    return t(`calendar.status.${status}`);
  };

  // Randevuları saate göre sırala
  const sortedAppointments = [...appointments].sort((a, b) => {
    const timeA = a.time.split(":").map(Number);
    const timeB = b.time.split(":").map(Number);
    const minutesA = timeA[0] * 60 + timeA[1];
    const minutesB = timeB[0] * 60 + timeB[1];
    return minutesA - minutesB;
  });

  if (!date) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
          backgroundImage: "none",
          boxShadow: isLightMode
            ? "0 4px 20px rgba(0,0,0,0.15)"
            : "0 4px 20px rgba(0,0,0,0.5)",
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
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {t("calendar.dayModal.title")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isLightMode ? colors.grey[300] : colors.grey[300],
            }}
          >
            {formatDate(date)} • {sortedAppointments.length}{" "}
            {t("calendar.dayModal.appointmentCount")}
          </Typography>
        </Box>
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

      <DialogContent sx={{ mt: 2, maxHeight: "70vh", overflowY: "auto" }}>
        {sortedAppointments.length === 0 ? (
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: isLightMode ? "#f5f5f5" : colors.primary[500],
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                color: isLightMode ? colors.grey[300] : colors.grey[300],
              }}
            >
              {t("calendar.dayModal.noAppointments")}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {sortedAppointments.map((appointment, index) => (
              <Card
                key={appointment.id}
                sx={{
                  p: 2.5,
                  backgroundColor: isLightMode ? "#f9f9f9" : colors.primary[500],
                  borderRadius: "8px",
                  border: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
                  "&:hover": {
                    backgroundColor: isLightMode ? "#f0f0f0" : colors.primary[600],
                  },
                }}
              >
                {/* Header: Time and Status */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTimeIcon
                      sx={{
                        fontSize: 20,
                        color: colors.blueAccent[500],
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        color: isLightMode ? colors.grey[100] : colors.grey[100],
                        fontWeight: "bold",
                      }}
                    >
                      {appointment.time}
                    </Typography>
                  </Box>
                  <Chip
                    label={getStatusLabel(appointment.status)}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(appointment.status),
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: "11px",
                    }}
                  />
                </Box>

                <Divider
                  sx={{
                    mb: 2,
                    borderColor: isLightMode ? colors.grey[800] : colors.grey[700],
                  }}
                />

                {/* Appointment Details */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {/* Customer */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <PersonIcon
                      sx={{
                        fontSize: 18,
                        color: isLightMode ? colors.grey[400] : colors.grey[400],
                      }}
                    />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: isLightMode ? colors.grey[400] : colors.grey[400],
                          display: "block",
                          mb: 0.25,
                        }}
                      >
                        {t("calendar.dayModal.customer")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[100] : colors.grey[100],
                          fontWeight: 500,
                        }}
                      >
                        {appointment.customerFirstName} {appointment.customerLastName}
                        {appointment.customerPhone && (
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{
                              color: isLightMode ? colors.grey[300] : colors.grey[300],
                              ml: 1,
                            }}
                          >
                            • {appointment.customerPhone}
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Service */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <ContentCutIcon
                      sx={{
                        fontSize: 18,
                        color: isLightMode ? colors.grey[400] : colors.grey[400],
                      }}
                    />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: isLightMode ? colors.grey[400] : colors.grey[400],
                          display: "block",
                          mb: 0.25,
                        }}
                      >
                        {t("calendar.dayModal.service")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[100] : colors.grey[100],
                        }}
                      >
                        {appointment.service}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Staff */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <PersonIcon
                      sx={{
                        fontSize: 18,
                        color: isLightMode ? colors.grey[400] : colors.grey[400],
                      }}
                    />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: isLightMode ? colors.grey[400] : colors.grey[400],
                          display: "block",
                          mb: 0.25,
                        }}
                      >
                        {t("calendar.dayModal.staff")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[100] : colors.grey[100],
                        }}
                      >
                        {appointment.staffName}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Duration and Price */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      mt: 0.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTimeIcon
                        sx={{
                          fontSize: 16,
                          color: isLightMode ? colors.grey[400] : colors.grey[400],
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[300] : colors.grey[300],
                        }}
                      >
                        {appointment.duration} {t("calendar.minutes")}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AttachMoneyIcon
                        sx={{
                          fontSize: 16,
                          color: isLightMode ? colors.grey[400] : colors.grey[400],
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[300] : colors.grey[300],
                          fontWeight: 500,
                        }}
                      >
                        {appointment.price} ₺
                      </Typography>
                    </Box>
                  </Box>

                  {/* Notes (if available) */}
                  {appointment.notes && (
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: isLightMode ? colors.grey[400] : colors.grey[400],
                          display: "block",
                          mb: 0.5,
                        }}
                      >
                        {t("calendar.dayModal.notes")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[300] : colors.grey[300],
                          fontStyle: "italic",
                        }}
                      >
                        {appointment.notes}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Action Buttons */}
                {(onAppointmentEdit || onAppointmentDelete) && (
                  <>
                    <Divider
                      sx={{
                        mt: 2,
                        mb: 1.5,
                        borderColor: isLightMode ? colors.grey[800] : colors.grey[700],
                      }}
                    />
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                      {onAppointmentEdit && (
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => onAppointmentEdit(appointment)}
                          sx={{
                            color: colors.blueAccent[500],
                            "&:hover": {
                              backgroundColor: isLightMode
                                ? colors.blueAccent[900]
                                : colors.blueAccent[800],
                            },
                          }}
                        >
                          {t("calendar.dayModal.edit")}
                        </Button>
                      )}
                      {onAppointmentDelete && (
                        <Button
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            if (
                              window.confirm(
                                t("experts.form.deleteConfirm") || "Silmek istediğinize emin misiniz?"
                              )
                            ) {
                              onAppointmentDelete(appointment.id);
                            }
                          }}
                          sx={{
                            color: colors.redAccent[500],
                            "&:hover": {
                              backgroundColor: isLightMode
                                ? colors.redAccent[900]
                                : colors.redAccent[800],
                            },
                          }}
                        >
                          {t("calendar.dayModal.delete")}
                        </Button>
                      )}
                    </Box>
                  </>
                )}
              </Card>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          borderTop: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: "#ffffff",
            "&:hover": {
              backgroundColor: colors.blueAccent[600],
            },
          }}
        >
          {t("calendar.dayModal.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

