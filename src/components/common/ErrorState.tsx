"use client";

import { Box, Alert } from "@mui/material";

interface ErrorStateProps {
  error: string;
  padding?: number;
}

/**
 * Error State Component
 * DRY prensibi - Tekrarlayan error state'lerini merkezi bir component'te toplar
 */
export default function ErrorState({ error, padding = 2 }: ErrorStateProps) {
  return (
    <Box p={padding}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );
}

