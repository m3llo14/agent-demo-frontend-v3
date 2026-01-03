"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { useCustomers } from "@/hooks/use-customers";
import CustomerCard from "@/features/customers/CustomerCard";

export default function CustomersPage() {
  const { data, loading, error, searchCustomers } = useCustomers();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const isLightMode = theme.palette.mode === "light";

  // Hydration hatasını önlemek için client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = () => {
    searchCustomers(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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

  return (
    <Box sx={{ width: "100%" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          mb: 2,
          "& .MuiBreadcrumbs-ol": {
            flexWrap: "nowrap",
          },
          "& .MuiBreadcrumbs-li": {
            color: isLightMode ? colors.grey[400] : colors.grey[400],
          },
        }}
      >
        <MuiLink
          href={`/${locale}/dashboard`}
          sx={{
            display: "flex",
            alignItems: "center",
            color: isLightMode ? colors.grey[400] : colors.grey[400],
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          <HomeOutlinedIcon sx={{ mr: 0.5, fontSize: 20 }} />
          {t("customers.breadcrumbs.home")}
        </MuiLink>
        <Typography
          sx={{
            color: isLightMode ? colors.grey[100] : colors.grey[100],
          }}
        >
          {t("customers.breadcrumbs.customers")}
        </Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Typography
        variant="h3"
        sx={{
          color: isLightMode ? colors.grey[100] : colors.grey[100],
          fontWeight: "bold",
          mb: 3,
        }}
      >
        {t("customers.title")}
      </Typography>

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
          placeholder={t("customers.searchPlaceholder")}
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

      {/* Error State */}
      {error && (
        <Box p={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Customers List */}
      {!loading && !error && data && (
        <>
          {data.customers.length > 0 ? (
            <Box>
              {data.customers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} t={t} />
              ))}
            </Box>
          ) : (
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
                {t("customers.noCustomers")}
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
