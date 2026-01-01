"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { tokens } from "@/themes/colors";
import { useTheme } from "@mui/material";

interface ProgressCircleProps {
  progress: number;
  size?: number;
}

const ProgressCircle = ({ progress, size = 40 }: ProgressCircleProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={progress}
        size={size}
        thickness={4}
        sx={{
          color: colors.greenAccent[500],
          backgroundColor: colors.primary[500],
          borderRadius: "50%",
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{
            fontSize: size * 0.25,
            fontWeight: "bold",
            color: colors.grey[100],
          }}
        >
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;

