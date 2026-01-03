"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  useTheme,
  IconButton,
} from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { CalendarAppointment } from "@/types/calendar";
import { useRouter } from "next/navigation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface CalendarPreviewProps {
  appointments: CalendarAppointment[];
  loading: boolean;
  locale: string;
}

/**
 * CalendarPreview Component
 * Dashboard için mini takvim görünümü
 * DRY ve clean code prensiplerine uygun
 */
export default function CalendarPreview({
  appointments,
  loading,
  locale,
}: CalendarPreviewProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const router = useRouter();
  const isLightMode = theme.palette.mode === "light";

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Month names
  const monthNames = [
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

  // Weekday names
  const weekdayNames = [
    t("calendar.weekdays.monday"),
    t("calendar.weekdays.tuesday"),
    t("calendar.weekdays.wednesday"),
    t("calendar.weekdays.thursday"),
    t("calendar.weekdays.friday"),
    t("calendar.weekdays.saturday"),
    t("calendar.weekdays.sunday"),
  ];

  // Get status color
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

  // Generate calendar grid
  const calendarGrid = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0

    const grid: Array<{
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
      appointmentCount: number;
    }> = [];

    // Previous month days
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(prevYear, prevMonth, prevMonthLastDay - i);
      grid.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        appointmentCount: 0,
      });
    }

    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      // Count appointments for this day
      const dayAppointments = appointments.filter((apt) => {
        // Tarih formatı: YYYY-MM-DD
        const aptDate = new Date(apt.date + "T00:00:00"); // Timezone sorununu önlemek için
        return (
          aptDate.getDate() === day &&
          aptDate.getMonth() === currentMonth &&
          aptDate.getFullYear() === currentYear
        );
      });

      grid.push({
        date,
        isCurrentMonth: true,
        isToday,
        appointmentCount: dayAppointments.length,
      });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - grid.length; // 6 weeks * 7 days
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(nextYear, nextMonth, day);
      grid.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        appointmentCount: 0,
      });
    }

    return grid;
  }, [currentMonth, currentYear, appointments]);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleViewAll = () => {
    router.push(`/${locale}/calendar`);
  };

  return (
    <Card
      sx={{
        backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
        borderRadius: "8px",
        p: 3,
        boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        border: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <CalendarTodayIcon
            sx={{
              fontSize: 28,
              color: colors.blueAccent[500],
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
            }}
          >
            {t("dashboard.calendar")}
          </Typography>
        </Box>
        <Button
          variant="text"
          size="small"
          onClick={handleViewAll}
          sx={{
            color: colors.blueAccent[500],
            "&:hover": {
              backgroundColor: isLightMode
                ? colors.blueAccent[900]
                : colors.blueAccent[800],
            },
          }}
        >
          {t("dashboard.viewAll")}
        </Button>
      </Box>

      {/* Month Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton
          onClick={handlePrevMonth}
          sx={{
            color: isLightMode ? colors.grey[100] : colors.grey[100],
            "&:hover": {
              backgroundColor: isLightMode
                ? colors.grey[800]
                : colors.primary[500],
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            color: isLightMode ? colors.grey[100] : colors.grey[100],
            fontWeight: "bold",
          }}
        >
          {monthNames[currentMonth]} {currentYear}
        </Typography>
        <IconButton
          onClick={handleNextMonth}
          sx={{
            color: isLightMode ? colors.grey[100] : colors.grey[100],
            "&:hover": {
              backgroundColor: isLightMode
                ? colors.grey[800]
                : colors.primary[500],
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Calendar Grid */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <Typography
            sx={{
              color: isLightMode ? colors.grey[300] : colors.grey[300],
            }}
          >
            {t("common.loading")}
          </Typography>
        </Box>
      ) : (
        <Box>
          {/* Weekday headers */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 0.5,
              mb: 1,
            }}
          >
            {weekdayNames.map((day) => (
              <Typography
                key={day}
                variant="caption"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: isLightMode ? colors.grey[300] : colors.grey[300],
                  py: 1,
                }}
              >
                {day.substring(0, 3)}
              </Typography>
            ))}
          </Box>

          {/* Calendar days */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 0.5,
            }}
          >
            {calendarGrid.map((dayInfo, index) => {
              const { date, isCurrentMonth, isToday, appointmentCount } =
                dayInfo;
              const dayNumber = date.getDate();

              return (
                <Box
                  key={index}
                  sx={{
                    aspectRatio: "1",
                    p: 0.5,
                    backgroundColor: isCurrentMonth
                      ? isToday
                        ? colors.blueAccent[800]
                        : "transparent"
                      : isLightMode
                      ? "#f5f5f5"
                      : colors.primary[500],
                    border: isToday
                      ? `2px solid ${colors.blueAccent[500]}`
                      : `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    cursor: isCurrentMonth ? "pointer" : "default",
                    "&:hover": isCurrentMonth
                      ? {
                          backgroundColor: isLightMode
                            ? "#f0f0f0"
                            : colors.primary[300],
                        }
                      : {},
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: isCurrentMonth
                        ? isToday
                          ? colors.grey[100]
                          : isLightMode
                          ? colors.grey[100]
                          : colors.grey[100]
                        : isLightMode
                        ? colors.grey[400]
                        : colors.grey[600],
                      fontWeight: isToday ? "bold" : "normal",
                      fontSize: "0.75rem",
                    }}
                  >
                    {dayNumber}
                  </Typography>
                  {appointmentCount > 0 && (
                    <Box
                      sx={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        backgroundColor: colors.blueAccent[500],
                        mt: 0.25,
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Card>
  );
}

