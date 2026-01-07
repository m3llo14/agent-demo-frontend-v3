"use client";

import { Box, CircularProgress, Alert, useTheme } from "@mui/material";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { StatBoxProps } from "@/features/dashboard/StatBox";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { useCompany } from "@/contexts/CompanyContext";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LineChart from "@/features/charts/LineChart";
import CallLogsPreview from "@/features/dashboard/CallLogsPreview";
import { useCharts } from "@/hooks/use-charts";
import { useCalls } from "@/hooks/use-calls";

const transformStatsDataToStatBoxProps = (
  data: NonNullable<ReturnType<typeof useDashboardStats>["data"]>,
  colors: ReturnType<typeof tokens>,
  t: (key: string) => string,
  appointmentLabel: string,
  customerLabel: string
): StatBoxProps[] => {
  return [
    {
      label: `${t("dashboard.total")} ${appointmentLabel}`,
      value: data.totalAppointments,
      description: t("dashboard.last30Days"),
      icon: (
        <CalendarTodayOutlinedIcon
          sx={{ fontSize: "26px", color: colors.blueAccent[500] }}
        />
      ),
    },
    {
      label: `${t("dashboard.pending")} ${appointmentLabel}`,
      value: data.pendingAppointments,
      description: t("dashboard.awaitingAction"),
      icon: (
        <PendingActionsOutlinedIcon
          sx={{ fontSize: "26px", color: colors.blueAccent[500] }}
        />
      ),
    },
    {
      label: customerLabel,
      value: data.customers,
      description: t("dashboard.registered"),
      icon: (
        <PeopleOutlinedIcon
          sx={{ fontSize: "26px", color: colors.blueAccent[500] }}
        />
      ),
    },
  ];
};

export default function DashboardPage() {
  const { data, loading, error } = useDashboardStats();
  const { data: chartData, loading: chartLoading } = useCharts();
  const { calls, loading: callsLoading } = useCalls();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, locale } = useLocale();
  const { industryConfig } = useCompany();

  // Sektöre göre terminoloji belirleme - Translation key'lerini kullan
  const appointmentLabel = industryConfig?.fieldMappings.appointment 
    ? t(industryConfig.fieldMappings.appointment) 
    : t("dashboard.appointments");
  const customerLabel = industryConfig?.fieldMappings.customer 
    ? t(industryConfig.fieldMappings.customer) 
    : t("dashboard.customers");

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!data) {
    return null;
  }

  const stats = transformStatsDataToStatBoxProps(data, colors, t, appointmentLabel, customerLabel);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Stats Cards */}
      <Box sx={{ mb: 4, width: "100%" }}>
        <StatsGrid stats={stats} />
      </Box>

      {/* Line Chart and Call Logs Preview - Side by Side */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mb: 4,
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ flex: { xs: 1, md: 2 }, width: "100%" }}>
          <LineChart data={chartData} loading={chartLoading} />
        </Box>
        <Box sx={{ flex: { xs: 1, md: 1 }, minWidth: { md: "400px" }, width: "100%" }}>
          <CallLogsPreview
            calls={calls}
            loading={callsLoading}
            locale={locale}
          />
        </Box>
      </Box>

    </Box>
  );
}
