"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "@/themes/colors";

export interface StatBoxProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const StatBox = ({ title, subtitle, icon }: StatBoxProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: colors.primary[400],
        borderRadius: "8px",
        p: 3,
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 16px ${colors.primary[500]}40`,
        },
      }}
    >
      <Box>
        {icon}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100], mt: 1, mb: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;

