"use client";

import { Box, CircularProgress } from "@mui/material";

interface LoadingStateProps {
  minHeight?: number | string;
}

/**
 * Loading State Component
 * DRY prensibi - Tekrarlayan loading state'lerini merkezi bir component'te toplar
 */
export default function LoadingState({ minHeight = "400px" }: LoadingStateProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      <CircularProgress />
    </Box>
  );
}

