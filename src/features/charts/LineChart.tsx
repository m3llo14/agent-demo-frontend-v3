"use client";

import {
  Box,
  Typography,
  Card,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { MonthlyAppointmentData } from "@/types/charts";
import { getMonthName } from "@/lib/utils";

interface LineChartProps {
  data: MonthlyAppointmentData[];
  loading: boolean;
}

/**
 * LineChart Component
 * Aylık randevu sayılarını gösteren line chart
 * DRY ve clean code prensiplerine uygun
 */
export default function LineChart({ data, loading }: LineChartProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, locale } = useLocale();
  const isLightMode = theme.palette.mode === "light";

  // Data'yı ay isimleriyle doldur
  const chartData = data.map((item) => ({
    ...item,
    month: item.month || getMonthName(item.monthIndex, t, locale),
  }));

  // Chart için renkler
  const lineColor = colors.blueAccent[500];
  const gridColor = isLightMode ? colors.grey[800] : colors.grey[700];
  const textColor = isLightMode ? colors.grey[100] : colors.grey[100];
  const backgroundColor = isLightMode ? "#ffffff" : colors.primary[400];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: backgroundColor,
            border: `1px solid ${gridColor}`,
            borderRadius: "8px",
            p: 1.5,
            boxShadow: isLightMode
              ? "0 4px 12px rgba(0,0,0,0.15)"
              : "0 4px 12px rgba(0,0,0,0.5)",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: textColor,
              fontWeight: "bold",
              mb: 1,
            }}
          >
            {payload[0].payload.month}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: lineColor,
            }}
          >
            {t("charts.lineChart.yAxisLabel")}: {payload[0].value}
          </Typography>
        </Box>
      );
    }
    return null;
  };

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

  if (chartData.length === 0) {
    return (
      <Card
        sx={{
          p: 4,
          textAlign: "center",
          backgroundColor: backgroundColor,
          borderRadius: "8px",
          boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <Typography
          sx={{
            color: isLightMode ? colors.grey[300] : colors.grey[300],
          }}
        >
          {t("charts.lineChart.noData")}
        </Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        backgroundColor: backgroundColor,
        borderRadius: "8px",
        p: 3,
        boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        border: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            color: textColor,
            fontWeight: "bold",
            mb: 0.5,
          }}
        >
          {t("charts.lineChart.title")}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: isLightMode ? colors.grey[300] : colors.grey[300],
          }}
        >
          {t("charts.lineChart.subtitle")}
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridColor}
            opacity={0.3}
          />
          <XAxis
            dataKey="month"
            stroke={textColor}
            style={{ fontSize: "12px" }}
            tick={{ fill: textColor }}
          />
          <YAxis
            stroke={textColor}
            style={{ fontSize: "12px" }}
            tick={{ fill: textColor }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ color: textColor }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke={lineColor}
            strokeWidth={3}
            dot={{ fill: lineColor, r: 5 }}
            activeDot={{ r: 7 }}
            name={t("charts.lineChart.yAxisLabel")}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </Card>
  );
}

