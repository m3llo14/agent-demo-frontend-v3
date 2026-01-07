"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { useCompanies } from "@/hooks/use-companies";
import CompaniesTable from "@/features/admin/CompaniesTable";
import { useRouter } from "next/navigation";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

export default function CompaniesPage() {
  const { data, loading, error, searchCompanies } = useCompanies();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, locale } = useLocale();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const isLightMode = theme.palette.mode === "light";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = () => {
    searchCompanies(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCreateCompany = () => {
    router.push(`/admin/${locale}/companies/new`);
  };

  if (!mounted) {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: 2 }} />
        <Box sx={{ mb: 3 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              mb: 1,
            }}
          >
            {t("admin.companies.title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isLightMode ? colors.grey[300] : colors.grey[300],
            }}
          >
            {t("admin.companies.subtitle")}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateCompany}
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: "#ffffff",
            "&:hover": {
              backgroundColor: colors.blueAccent[600],
            },
            px: 3,
            py: 1.5,
          }}
        >
          {t("admin.companies.addNew")}
        </Button>
      </Box>

      {/* Search Section */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          placeholder={t("admin.companies.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <SearchIcon
                sx={{
                  mr: 1,
                  color: isLightMode ? colors.grey[400] : colors.grey[400],
                }}
              />
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
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
            "& .MuiInputBase-input": {
              color: isLightMode ? colors.grey[100] : colors.grey[100],
            },
            "& .MuiInputBase-input::placeholder": {
              color: isLightMode ? colors.grey[400] : colors.grey[400],
              opacity: 1,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: "#ffffff",
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            "&:hover": {
              backgroundColor: colors.blueAccent[600],
            },
          }}
        >
          {t("common.search")}
        </Button>
      </Box>

      {/* Loading State */}
      {loading && <LoadingState />}

      {/* Error State */}
      {error && <ErrorState error={error} />}

      {/* Companies Table */}
      {!loading && !error && data && (
        <>
          {data.companies.length > 0 ? (
            <CompaniesTable companies={data.companies} />
          ) : (
            <EmptyState message={t("admin.companies.noCompanies")} />
          )}
        </>
      )}
    </Box>
  );
}

