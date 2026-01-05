"use client";

import {
  Box,
  Card,
  Typography,
  Avatar,
  Button,
  useTheme,
  Grid,
  Chip,
} from "@mui/material";
import { tokens } from "@/themes/colors";
import { Customer, AppointmentStatus } from "@/types/customers";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import {
  formatDate,
  formatDateTime,
  getCustomerAvatarColor,
  getStatusColor,
} from "@/lib/utils";

interface CustomerCardProps {
  customer: Customer;
  t: (key: string) => string;
}

const CustomerCard = ({ customer, t }: CustomerCardProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLightMode = theme.palette.mode === "light";
  const avatarColor = getCustomerAvatarColor(parseInt(customer.id) || 0);
  const initials = `${customer.firstName[0]}${customer.lastName[0]}`.toUpperCase();

  return (
    <Card
      sx={{
        backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
        borderRadius: "8px",
        p: 3,
        mb: 3,
        boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: avatarColor.bg,
              color: avatarColor.text,
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            {initials}
          </Avatar>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  color: isLightMode ? colors.grey[100] : colors.grey[100],
                  fontWeight: 600,
                }}
              >
                {customer.firstName} {customer.lastName}
              </Typography>
              <InfoOutlinedIcon
                sx={{
                  fontSize: 18,
                  color: isLightMode ? colors.grey[400] : colors.grey[400],
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
              <PhoneOutlinedIcon
                sx={{
                  fontSize: 16,
                  color: isLightMode ? colors.grey[400] : colors.grey[400],
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: isLightMode ? colors.grey[400] : colors.grey[400],
                }}
              >
                {customer.phone}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: "#ffffff",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: colors.blueAccent[600],
            },
          }}
        >
          {customer.appointmentCount} {t("customers.appointments")}
        </Button>
      </Box>

      {/* Details Grid */}
      <Grid container spacing={2} sx={{ mb: customer.appointments.length > 0 ? 3 : 0 }}>
        <Grid size={{ xs: 6 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <AccessTimeIcon
              sx={{
                fontSize: 18,
                color: isLightMode ? colors.grey[400] : colors.grey[400],
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: isLightMode ? colors.grey[400] : colors.grey[400],
                fontWeight: 500,
              }}
            >
              {t("customers.lastAppointment")}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: 600,
            }}
          >
            {formatDate(customer.lastAppointment, t)}
          </Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <PhoneIcon
              sx={{
                fontSize: 18,
                color: isLightMode ? colors.grey[400] : colors.grey[400],
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: isLightMode ? colors.grey[400] : colors.grey[400],
                fontWeight: 500,
              }}
            >
              {t("customers.callCount")}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: 600,
            }}
          >
            {customer.callCount}
          </Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <AccountBalanceWalletOutlinedIcon
              sx={{
                fontSize: 18,
                color: isLightMode ? "#4CAF50" : "#81C784",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: isLightMode ? colors.grey[400] : colors.grey[400],
                fontWeight: 500,
              }}
            >
              {t("customers.totalSpending")}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: 600,
            }}
          >
            {customer.totalSpending !== null
              ? `${customer.totalSpending.toLocaleString()} ₺`
              : "-"}
          </Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <CalendarTodayOutlinedIcon
              sx={{
                fontSize: 18,
                color: isLightMode ? "#9C27B0" : "#BA68C8",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: isLightMode ? colors.grey[400] : colors.grey[400],
                fontWeight: 500,
              }}
            >
              {t("customers.appointmentCount")}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: 600,
            }}
          >
            {customer.appointmentCount}
          </Typography>
        </Grid>
      </Grid>

      {/* Last Appointments Section */}
      {customer.appointments.length > 0 && (
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: 600,
              mb: 2,
            }}
          >
            {t("customers.lastAppointments")}
          </Typography>
          {customer.appointments.map((appointment) => (
            <Box
              key={appointment.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                mb: 1,
                backgroundColor: isLightMode
                  ? "#F5F5F5"
                  : colors.primary[500],
                borderRadius: "4px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarTodayOutlinedIcon
                    sx={{
                      fontSize: 16,
                      color: isLightMode ? colors.grey[400] : colors.grey[400],
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: isLightMode ? colors.grey[100] : colors.grey[100],
                    }}
                  >
                    {formatDateTime(appointment.date, appointment.time)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ContentCutOutlinedIcon
                    sx={{
                      fontSize: 16,
                      color: isLightMode ? colors.grey[400] : colors.grey[400],
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: isLightMode ? colors.grey[100] : colors.grey[100],
                    }}
                  >
                    {appointment.service}
                  </Typography>
                </Box>

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
                      color: isLightMode ? colors.grey[100] : colors.grey[100],
                    }}
                  >
                    {appointment.duration} {t("common.minutes")}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonOutlinedIcon
                    sx={{
                      fontSize: 16,
                      color: isLightMode ? colors.grey[400] : colors.grey[400],
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: isLightMode ? colors.grey[100] : colors.grey[100],
                    }}
                  >
                    {appointment.staff}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AttachMoneyOutlinedIcon
                    sx={{
                      fontSize: 16,
                      color: isLightMode ? colors.grey[400] : colors.grey[400],
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: isLightMode ? colors.grey[100] : colors.grey[100],
                    }}
                  >
                    {appointment.price.toLocaleString()} ₺
                  </Typography>
                </Box>
              </Box>

              <Chip
                label={t(`common.status.${appointment.status}`)}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(appointment.status, isLightMode),
                  color: "#ffffff",
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
};

export default CustomerCard;

