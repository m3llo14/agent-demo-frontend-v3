"use client";

import { useState, useEffect } from "react";
import { Box, Alert, useTheme } from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { useCharts } from "@/hooks/use-charts";
import LineChart from "@/features/charts/LineChart";

export default function ChartsPage() {
  const { data, loading, error } = useCharts();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const [mounted, setMounted] = useState(false);

  // Hydration hatasını önlemek için client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // Server-side render sırasında boş render döndür
  if (!mounted) {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: 2 }} />
        <Box sx={{ mb: 3 }} />
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

  return (
    <Box sx={{ width: "100%" }}>
      <LineChart data={data} loading={loading} />
    </Box>
  );
}
