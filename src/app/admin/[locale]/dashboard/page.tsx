"use client";

import { Box, Typography, useTheme } from "@mui/material";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { useAdminDashboardStats } from "@/hooks/use-admin-dashboard-stats";
import { StatBoxProps } from "@/features/dashboard/StatBox";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

const transformAdminStatsToStatBoxProps = (
  data: NonNullable<ReturnType<typeof useAdminDashboardStats>["data"]>,
  colors: ReturnType<typeof tokens>,
  t: (key: string) => string
): StatBoxProps[] => {
  return [
    {
      label: t("admin.dashboard.totalCompanies"),
      value: data.totalCompanies,
      description: t("admin.dashboard.totalCompanies"),
      icon: (
        <BusinessOutlinedIcon
          sx={{ fontSize: "26px", color: colors.blueAccent[500] }}
        />
      ),
    },
    {
      label: t("admin.dashboard.totalAppointments"),
      value: data.totalAppointments,
      description: t("admin.dashboard.totalAppointments"),
      icon: (
        <CalendarTodayOutlinedIcon
          sx={{ fontSize: "26px", color: colors.blueAccent[500] }}
        />
      ),
    },
    {
      label: t("admin.dashboard.totalCustomers"),
      value: data.totalCustomers,
      description: t("admin.dashboard.totalCustomers"),
      icon: (
        <PeopleOutlinedIcon
          sx={{ fontSize: "26px", color: colors.blueAccent[500] }}
        />
      ),
    },
  ];
};

export default function AdminDashboard() {
  const { data, loading, error } = useAdminDashboardStats();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!data) {
    return null;
  }

  const stats = transformAdminStatsToStatBoxProps(data, colors, t);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: theme.palette.mode === "light" ? colors.grey[100] : colors.grey[100],
        }}
      >
        {t("admin.dashboard.title")}
      </Typography>

      {/* Stats Cards */}
      <Box sx={{ mb: 4, width: "100%" }}>
        <StatsGrid stats={stats} />
      </Box>
    </Box>
  );
}