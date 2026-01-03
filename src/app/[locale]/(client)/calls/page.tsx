"use client";

import { useState, useEffect } from "react";
import { Box, Alert, useTheme } from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { useCalls } from "@/hooks/use-calls";
import CallLogsView from "@/features/calls/CallLogsView";
import CallDetailModal from "@/features/calls/CallDetailModal";
import { CallLog } from "@/types/calls";

export default function CallsPage() {
  const { calls, loading, error, filters, updateFilters, clearFilters } = useCalls();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const [mounted, setMounted] = useState(false);
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Hydration hatasını önlemek için client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter change handler
  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    updateFilters(newFilters);
  };

  // Action handlers
  const handleDetails = (call: CallLog) => {
    setSelectedCall(call);
    setDetailModalOpen(true);
  };

  // Modal close handler
  const handleModalClose = () => {
    setDetailModalOpen(false);
    setSelectedCall(null);
  };

  // Download handler
  const handleDownload = (call: CallLog) => {
    // TODO: Konuşma dökümünü indirme işlemi
    console.log("Download conversation:", call);
  };

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
      <CallLogsView
        calls={calls}
        loading={loading}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        onDetails={handleDetails}
      />

      {/* Call Detail Modal */}
      <CallDetailModal
        open={detailModalOpen}
        onClose={handleModalClose}
        call={selectedCall}
        onDownload={handleDownload}
      />
    </Box>
  );
}
