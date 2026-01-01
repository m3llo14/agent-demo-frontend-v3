"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "@/themes/colors";

export interface StatBoxProps {
  label: string; // Card başlığı (örn: "Toplam Randevu")
  value: string | number; // Büyük sayı (örn: "8")
  description: string; // Alt açıklama (örn: "Son 30 gün")
  icon?: React.ReactNode; // Opsiyonel icon
}

const StatBox = ({ label, value, description, icon }: StatBoxProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLightMode = theme.palette.mode === "light";

  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
        borderRadius: "8px",
        p: 3,
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: isLightMode
            ? "0 4px 12px rgba(0,0,0,0.15)"
            : `0 8px 16px ${colors.primary[500]}40`,
        },
      }}
    >
      <Box>
        {icon && <Box sx={{ mb: 1 }}>{icon}</Box>}
        <Typography
          variant="body2"
          sx={{
            color: isLightMode ? colors.grey[300] : colors.grey[300],
            mb: 1,
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            color: isLightMode ? colors.grey[100] : colors.grey[100],
            mb: 1,
          }}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: isLightMode ? colors.grey[400] : colors.grey[400],
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;

