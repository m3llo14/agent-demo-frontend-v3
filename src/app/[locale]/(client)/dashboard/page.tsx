"use client";

import { Box, CircularProgress, Alert, useTheme } from "@mui/material";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { StatBoxProps } from "@/features/dashboard/StatBox";
import { tokens } from "@/themes/colors";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import TrafficOutlinedIcon from "@mui/icons-material/TrafficOutlined";

const transformStatsDataToStatBoxProps = (
  data: NonNullable<ReturnType<typeof useDashboardStats>["data"]>,
  colors: ReturnType<typeof tokens>
): StatBoxProps[] => {
  return [
    {
      title: data.emailsSent.toLocaleString(),
      subtitle: "Emails Sent",
      icon: (
        <EmailOutlinedIcon
          sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
        />
      ),
    },
    {
      title: data.salesObtained.toLocaleString(),
      subtitle: "Sales Obtained",
      icon: (
        <PointOfSaleOutlinedIcon
          sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
        />
      ),
    },
    {
      title: data.newClients.toLocaleString(),
      subtitle: "New Clients",
      icon: (
        <PersonAddOutlinedIcon
          sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
        />
      ),
    },
    {
      title: data.trafficReceived.toLocaleString(),
      subtitle: "Traffic Received",
      icon: (
        <TrafficOutlinedIcon
          sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
        />
      ),
    },
  ];
};

export default function DashboardPage() {
  const { data, loading, error } = useDashboardStats();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  const stats = transformStatsDataToStatBoxProps(data, colors);

  return (
    <Box sx={{ width: "100%" }}>
      <StatsGrid stats={stats} />
    </Box>
  );
}
