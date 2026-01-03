"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Card,
  Chip,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import { tokens } from "@/themes/colors";
import { CalendarAppointment, CalendarViewMode, CalendarDateInfo } from "@/types/calendar";
import { useLocale } from "@/contexts/LocaleContext";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListIcon from "@mui/icons-material/List";

interface CalendarViewProps {
  appointments: CalendarAppointment[];
  loading: boolean;
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
  onFilterChange: (status: string) => void;
  currentFilter: string;
  onAddAppointment?: () => void;
  onAppointmentClick?: (appointment: CalendarAppointment) => void;
  onDayClick?: (date: Date, appointments: CalendarAppointment[]) => void;
}

const CalendarView = ({
  appointments,
  loading,
  currentMonth,
  currentYear,
  onMonthChange,
  onFilterChange,
  currentFilter,
  onAddAppointment,
  onAppointmentClick,
  onDayClick,
}: CalendarViewProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const [viewMode, setViewMode] = useState<CalendarViewMode>("calendar");
  const isLightMode = theme.palette.mode === "light";

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

  // Get status label
  const getStatusLabel = (status: string) => {
    return t(`calendar.status.${status}`);
  };

  // Generate calendar grid
  const calendarGrid = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Monday = 0
    const daysInMonth = lastDayOfMonth.getDate();
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

    const grid: CalendarDateInfo[] = [];

    // Previous month days
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(
        daysInPrevMonth - i
      ).padStart(2, "0")}`;
      grid.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        appointments: appointments.filter((apt) => apt.date === dateStr),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const isToday =
        isCurrentMonth &&
        day === today.getDate() &&
        currentYear === today.getFullYear() &&
        currentMonth === today.getMonth();

      grid.push({
        date,
        isCurrentMonth: true,
        isToday,
        appointments: appointments.filter((apt) => apt.date === dateStr),
      });
    }

    // Next month days to fill the grid
    const totalCells = grid.length;
    const remainingCells = 42 - totalCells; // 6 weeks * 7 days
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(nextYear, nextMonth, day);
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      grid.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        appointments: appointments.filter((apt) => apt.date === dateStr),
      });
    }

    return grid;
  }, [currentMonth, currentYear, appointments]);

  // Navigate months
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      onMonthChange(11, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      onMonthChange(0, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  // Filter options
  const filterOptions = [
    { value: "all", label: t("calendar.filters.all") },
    { value: "pending", label: t("calendar.filters.pending") },
    { value: "confirmed", label: t("calendar.filters.confirmed") },
    { value: "cancelled", label: t("calendar.filters.cancelled") },
    { value: "completed", label: t("calendar.filters.completed") },
  ];

  // Format date for display
  const formatDate = (date: Date) => {
    return date.getDate().toString();
  };

  // Render calendar grid
  const renderCalendarGrid = () => {
    return (
      <Box>
        {/* Weekday headers */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
            mb: 1,
          }}
        >
          {weekdayNames.map((day) => (
            <Typography
              key={day}
              variant="body2"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: isLightMode ? colors.grey[400] : colors.grey[400],
                py: 1,
              }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        {/* Calendar days */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
          }}
        >
          {calendarGrid.map((dayInfo, index) => {
            const { date, isCurrentMonth, isToday, appointments: dayAppointments } = dayInfo;
            const dayNumber = formatDate(date);

            return (
              <Card
                key={index}
                onClick={() => onDayClick?.(date, dayAppointments)}
                sx={{
                  minHeight: "120px",
                  p: 1,
                  backgroundColor: isCurrentMonth
                    ? isToday
                      ? colors.blueAccent[800]
                      : isLightMode
                      ? "#ffffff"
                      : colors.primary[400]
                    : isLightMode
                    ? "#f5f5f5"
                    : colors.primary[500],
                  border: isToday
                    ? `2px solid ${colors.blueAccent[500]}`
                    : `1px solid ${isLightMode ? colors.grey[700] : colors.grey[800]}`,
                  borderRadius: "4px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: isCurrentMonth
                      ? isLightMode
                        ? "#f0f0f0"
                        : colors.primary[300]
                      : isLightMode
                      ? "#e0e0e0"
                      : colors.primary[600],
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isToday ? "bold" : "normal",
                    color: isCurrentMonth
                      ? isToday
                        ? "#ffffff"
                        : isLightMode
                        ? colors.grey[100]
                        : colors.grey[100]
                      : isLightMode
                      ? colors.grey[400]
                      : colors.grey[600],
                    mb: 0.5,
                  }}
                >
                  {dayNumber}
                </Typography>

                {/* Appointments for this day */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  {dayAppointments.slice(0, 3).map((appointment) => (
                    <Tooltip
                      key={appointment.id}
                      title={`${appointment.time} - ${appointment.customerFirstName} ${appointment.customerLastName.charAt(0)} ${appointment.staffName} ${appointment.service}`}
                      arrow
                    >
                      <Box
                        onClick={(e) => {
                          e.stopPropagation();
                          onAppointmentClick?.(appointment);
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                        }}
                        sx={{
                          backgroundColor: getStatusColor(appointment.status),
                          color: "#ffffff",
                          p: 0.5,
                          borderRadius: "2px",
                          fontSize: "10px",
                          cursor: "pointer",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          "&:hover": {
                            opacity: 0.8,
                          },
                        }}
                      >
                        {appointment.time} - {appointment.customerFirstName}{" "}
                        {appointment.customerLastName.charAt(0)} {appointment.staffName}{" "}
                        {appointment.service.length > 15
                          ? `${appointment.service.substring(0, 15)}...`
                          : appointment.service}
                      </Box>
                    </Tooltip>
                  ))}
                  {dayAppointments.length > 3 && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: isLightMode ? colors.grey[400] : colors.grey[400],
                        fontSize: "10px",
                      }}
                    >
                        +{dayAppointments.length - 3} {t("calendar.more")}
                    </Typography>
                  )}
                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>
    );
  };

  // Render list view
  const renderListView = () => {
    const sortedAppointments = [...appointments].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    if (sortedAppointments.length === 0) {
      return (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
            borderRadius: "8px",
            boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          }}
        >
          <Typography
            sx={{
              color: isLightMode ? colors.grey[300] : colors.grey[300],
            }}
          >
            {t("calendar.noAppointmentsFilter")}
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sortedAppointments.map((appointment) => (
          <Card
            key={appointment.id}
            onClick={() => onAppointmentClick?.(appointment)}
            sx={{
              p: 2,
              backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
              borderRadius: "8px",
              boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: isLightMode ? "#f5f5f5" : colors.primary[300],
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: isLightMode ? colors.grey[100] : colors.grey[100],
                    mb: 1,
                  }}
                >
                  {appointment.customerFirstName} {appointment.customerLastName}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isLightMode ? colors.grey[300] : colors.grey[300],
                    }}
                  >
                    {appointment.date} - {appointment.time}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isLightMode ? colors.grey[300] : colors.grey[300],
                    }}
                  >
                    {appointment.service} • {appointment.duration} {t("calendar.minutes")} •{" "}
                    {appointment.staffName}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={getStatusLabel(appointment.status)}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(appointment.status),
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              />
            </Box>
          </Card>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header with title and add button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: isLightMode ? colors.grey[100] : colors.grey[100],
            fontWeight: "bold",
          }}
        >
          {t("calendar.title")}
        </Typography>
        {onAddAppointment && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddAppointment}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: "#ffffff",
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
            }}
          >
            {t("calendar.addAppointment")}
          </Button>
        )}
      </Box>

      {/* View mode tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={viewMode}
          onChange={(_, newValue) => setViewMode(newValue)}
          sx={{
            "& .MuiTab-root": {
              color: isLightMode ? colors.grey[400] : colors.grey[400],
              "&.Mui-selected": {
                color: colors.blueAccent[500],
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: colors.blueAccent[500],
            },
          }}
        >
          <Tab
            icon={<CalendarMonthIcon />}
            iconPosition="start"
            label={t("calendar.calendarView")}
            value="calendar"
          />
          <Tab
            icon={<ListIcon />}
            iconPosition="start"
            label={t("calendar.listView")}
            value="list"
          />
        </Tabs>
      </Box>

      {/* Filter tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={currentFilter}
          onChange={(_, newValue) => onFilterChange(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              color: isLightMode ? colors.grey[400] : colors.grey[400],
              "&.Mui-selected": {
                color: colors.blueAccent[500],
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: colors.blueAccent[500],
            },
          }}
        >
          {filterOptions.map((option) => (
            <Tab key={option.value} label={option.label} value={option.value} />
          ))}
        </Tabs>
      </Box>

      {/* Calendar navigation and content */}
      {viewMode === "calendar" && (
        <Box>
          {/* Month navigation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <IconButton onClick={handlePreviousMonth} sx={{ color: colors.blueAccent[500] }}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography
              variant="h5"
              sx={{
                color: isLightMode ? colors.grey[100] : colors.grey[100],
                fontWeight: "bold",
              }}
            >
              {monthNames[currentMonth]} {currentYear}
            </Typography>
            <IconButton onClick={handleNextMonth} sx={{ color: colors.blueAccent[500] }}>
              <ChevronRightIcon />
            </IconButton>
          </Box>

          {/* Calendar grid */}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              <Typography sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300] }}>
                {t("calendar.loading")}
              </Typography>
            </Box>
          ) : (
            renderCalendarGrid()
          )}
        </Box>
      )}

      {/* List view */}
      {viewMode === "list" && (
        <Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              <Typography sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300] }}>
                {t("calendar.loading")}
              </Typography>
            </Box>
          ) : (
            renderListView()
          )}
        </Box>
      )}
    </Box>
  );
};

export default CalendarView;

