"use client";

import { Box, Typography, Card, Button, useTheme, CircularProgress } from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { CallLog } from "@/types/calls";
import CallLogCard from "@/features/calls/CallLogCard";
import { useRouter } from "next/navigation";
import PhoneIcon from "@mui/icons-material/Phone";

interface CallLogsPreviewProps {
  calls: CallLog[];
  loading: boolean;
  locale: string;
}

/**
 * CallLogsPreview Component
 * Dashboard için son çağrıları gösteren preview component'i
 * DRY ve clean code prensiplerine uygun
 */
export default function CallLogsPreview({
  calls,
  loading,
  locale,
}: CallLogsPreviewProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const router = useRouter();
  const isLightMode = theme.palette.mode === "light";

  // Son 5 çağrıyı göster
  const recentCalls = calls.slice(0, 5);

  const handleViewAll = () => {
    router.push(`/${locale}/calls`);
  };

  return (
    <Card
      sx={{
        backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
        borderRadius: "8px",
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        border: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <PhoneIcon
            sx={{
              fontSize: 28,
              color: colors.blueAccent[500],
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
            }}
          >
            {t("dashboard.recentCalls")}
          </Typography>
        </Box>
        <Button
          variant="text"
          size="small"
          onClick={handleViewAll}
          sx={{
            color: colors.blueAccent[500],
            "&:hover": {
              backgroundColor: isLightMode
                ? colors.blueAccent[900]
                : colors.blueAccent[800],
            },
          }}
        >
          {t("dashboard.viewAll")}
        </Button>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "500px",
          pr: 1,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: isLightMode ? colors.grey[800] : colors.primary[500],
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.blueAccent[500],
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: colors.blueAccent[600],
            },
          },
        }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <CircularProgress />
          </Box>
        ) : recentCalls.length > 0 ? (
          <Box>
            {recentCalls.map((call) => (
              <Box key={call.id} sx={{ mb: 2 }}>
                <CallLogCard call={call} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
            }}
          >
            <Typography
              sx={{
                color: isLightMode ? colors.grey[300] : colors.grey[300],
              }}
            >
              {t("dashboard.noRecentCalls")}
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
}

