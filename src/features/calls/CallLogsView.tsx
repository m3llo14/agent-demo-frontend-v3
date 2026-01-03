"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { CallLog, CallLogsFilters } from "@/types/calls";
import CallLogCard from "./CallLogCard";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface CallLogsViewProps {
  calls: CallLog[];
  loading: boolean;
  filters: CallLogsFilters;
  onFilterChange: (filters: CallLogsFilters) => void;
  onClearFilters: () => void;
  onDetails?: (call: CallLog) => void;
}

/**
 * CallLogsView Component
 * Arama kayıtları listesi ve filtreleme component'i
 * DRY ve clean code prensiplerine uygun
 */
export default function CallLogsView({
  calls,
  loading,
  filters,
  onFilterChange,
  onClearFilters,
  onDetails,
}: CallLogsViewProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const isLightMode = theme.palette.mode === "light";

  // Tarih state'lerini formatla
  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return "";
    try {
      const [year, month, day] = dateString.split("-");
      return `${day}.${month}.${year}`;
    } catch {
      return dateString;
    }
  };

  const [startDate, setStartDate] = useState(
    filters.startDate ? formatDateForDisplay(filters.startDate) : ""
  );
  const [endDate, setEndDate] = useState(
    filters.endDate ? formatDateForDisplay(filters.endDate) : ""
  );

  // DD.MM.YYYY formatını YYYY-MM-DD'ye çevir (API için)
  const formatDateForAPI = (dateString: string): string => {
    if (!dateString) return "";
    try {
      const [day, month, year] = dateString.split(".");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    } catch {
      return dateString;
    }
  };

  // Filtreleme
  const handleFilter = () => {
    onFilterChange({
      startDate: startDate ? formatDateForAPI(startDate) : undefined,
      endDate: endDate ? formatDateForAPI(endDate) : undefined,
    });
  };

  // Filtreleri temizle
  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    onClearFilters();
  };

  // Enter tuşu ile filtreleme
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Typography
        variant="h3"
        sx={{
          color: isLightMode ? colors.grey[100] : colors.grey[100],
          fontWeight: "bold",
          mb: 3,
        }}
      >
        {t("calls.title")}
      </Typography>

      {/* Filters Section */}
      <Card
        sx={{
          backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
          borderRadius: "8px",
          p: 3,
          mb: 3,
          boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          border: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          {/* Start Date */}
          <TextField
            label={t("calls.filters.startDate")}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("calls.filters.datePlaceholder")}
            fullWidth
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: isLightMode ? "#ffffff" : colors.primary[500],
                "& fieldset": {
                  borderColor: isLightMode ? colors.grey[700] : colors.grey[700],
                },
                "&:hover fieldset": {
                  borderColor: isLightMode ? colors.grey[500] : colors.grey[500],
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.blueAccent[500],
                },
              },
              "& .MuiInputLabel-root": {
                color: isLightMode ? colors.grey[300] : colors.grey[500],
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.blueAccent[500],
              },
              "& .MuiInputBase-input": {
                color: isLightMode ? colors.grey[100] : colors.grey[100],
              },
            }}
          />

          {/* End Date */}
          <TextField
            label={t("calls.filters.endDate")}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("calls.filters.datePlaceholder")}
            fullWidth
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: isLightMode ? "#ffffff" : colors.primary[500],
                "& fieldset": {
                  borderColor: isLightMode ? colors.grey[700] : colors.grey[700],
                },
                "&:hover fieldset": {
                  borderColor: isLightMode ? colors.grey[500] : colors.grey[500],
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.blueAccent[500],
                },
              },
              "& .MuiInputLabel-root": {
                color: isLightMode ? colors.grey[300] : colors.grey[500],
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.blueAccent[500],
              },
              "& .MuiInputBase-input": {
                color: isLightMode ? colors.grey[100] : colors.grey[100],
              },
            }}
          />

          {/* Filter Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flex: { xs: "1 1 100%", sm: "0 0 auto" },
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
              sx={{
                borderColor: isLightMode ? colors.grey[400] : colors.grey[400],
                color: isLightMode ? colors.grey[300] : colors.grey[300],
                "&:hover": {
                  borderColor: isLightMode ? colors.grey[500] : colors.grey[500],
                  backgroundColor: isLightMode ? colors.grey[900] : colors.primary[500],
                },
              }}
            >
              {t("calls.filters.clearFilters")}
            </Button>

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleFilter}
              sx={{
                backgroundColor: colors.blueAccent[500],
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              {t("calls.filters.filter")}
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Loading State */}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      )}

      {/* Calls List */}
      {!loading && (
        <>
          {calls.length > 0 ? (
            <Box>
              {calls.map((call) => (
                <CallLogCard
                  key={call.id}
                  call={call}
                  onDetails={onDetails}
                />
              ))}
            </Box>
          ) : (
            <Card
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
                {t("calls.noCalls")}
              </Typography>
            </Card>
          )}
        </>
      )}
    </Box>
  );
}

