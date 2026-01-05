"use client";

import {
  Box,
  Card,
  Typography,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import { tokens } from "@/themes/colors";
import { CallLog } from "@/types/calls";
import { useLocale } from "@/contexts/LocaleContext";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatDateWithMonth, formatDuration } from "@/lib/utils";

interface CallLogCardProps {
  call: CallLog;
  onDetails?: (call: CallLog) => void;
}

/**
 * CallLogCard Component
 * Tek bir arama kaydını gösteren kart component'i
 * DRY ve clean code prensiplerine uygun
 */
export default function CallLogCard({
  call,
  onDetails,
}: CallLogCardProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, locale } = useLocale();
  const isLightMode = theme.palette.mode === "light";

  return (
    <Card
      sx={{
        backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
        borderRadius: "8px",
        p: 3,
        mb: 2,
        boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        border: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
      }}
    >
      {/* Header: Phone Number and Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
          <PhoneIcon
            sx={{
              fontSize: 24,
              color: colors.blueAccent[500],
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
            }}
          >
            {call.phoneNumber}
          </Typography>
        </Box>

        {onDetails && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => onDetails(call)}
            sx={{
              borderColor: colors.blueAccent[500],
              color: colors.blueAccent[500],
              "&:hover": {
                borderColor: colors.blueAccent[600],
                backgroundColor: isLightMode
                  ? colors.blueAccent[900]
                  : colors.blueAccent[800],
              },
            }}
          >
            {t("calls.actions.details")}
          </Button>
        )}
      </Box>

      <Divider
        sx={{
          mb: 2,
          borderColor: isLightMode ? colors.grey[800] : colors.grey[700],
        }}
      />

      {/* Date and Time Info */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarTodayIcon
            sx={{
              fontSize: 18,
              color: isLightMode ? colors.grey[400] : colors.grey[400],
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: isLightMode ? colors.grey[300] : colors.grey[300],
            }}
          >
            {formatDateWithMonth(call.date, t, locale)} {call.time}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeIcon
            sx={{
              fontSize: 18,
              color: isLightMode ? colors.grey[400] : colors.grey[400],
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: isLightMode ? colors.grey[300] : colors.grey[300],
            }}
          >
            {formatDuration(call.duration)}
          </Typography>
        </Box>
      </Box>

    </Card>
  );
}

