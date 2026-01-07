"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "@/themes/colors";

interface EmptyStateProps {
  message: string;
}

/**
 * Empty State Component
 * DRY prensibi - Tekrarlayan empty state'lerini merkezi bir component'te toplar
 */
export default function EmptyState({ message }: EmptyStateProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLightMode = theme.palette.mode === "light";

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
        {message}
      </Typography>
    </Box>
  );
}

