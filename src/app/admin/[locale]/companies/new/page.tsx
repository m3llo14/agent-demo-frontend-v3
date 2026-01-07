"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  useTheme,
  MenuItem,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { useRouter } from "next/navigation";
import { companiesService } from "@/features/admin/services/companies.service";
import { CreateCompanyRequest } from "@/types/companies";
import { IndustryType } from "@/types/industry";
import { getIndustryConfig } from "@/config/industries";
import { getTextFieldStyles, getSelectFieldStyles } from "@/lib/form-styles";
import { FormValidator, validateEmail } from "@/lib/validation";

const INDUSTRIES: IndustryType[] = [
  "beauty_salon",
  "hotel",
  "cafe",
  "restaurant",
  "spa",
  "fitness",
  "clinic",
  "travel_agency",
];

export default function CreateCompanyPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, locale } = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isLightMode = theme.palette.mode === "light";

  const [formData, setFormData] = useState<CreateCompanyRequest>({
    name: "",
    email: "",
    industry: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const validate = (): boolean => {
    const validator = new FormValidator();
    
    validator
      .required("name", formData.name, t("admin.companies.create.form.nameRequired"))
      .required("email", formData.email, t("admin.companies.create.form.emailRequired"))
      .email("email", formData.email, t("admin.companies.create.form.emailInvalid"))
      .required("industry", formData.industry, t("admin.companies.create.form.industryRequired"));

    const newErrors = validator.getErrors();
    setErrors(newErrors);
    return validator.isValid();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await companiesService.create(formData);
      router.push(`/admin/${locale}/companies`);
    } catch (err) {
      console.error("Create company error:", err);
      setErrors({
        submit: err instanceof Error ? err.message : t("admin.companies.create.form.createError"),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CreateCompanyRequest) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const formStylesOptions = { theme, colors, isLightMode };
  const textFieldStyles = getTextFieldStyles(formStylesOptions);
  const selectFieldStyles = getSelectFieldStyles(formStylesOptions);

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
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(`/admin/${locale}/companies`)}
          sx={{
            color: isLightMode ? colors.grey[300] : colors.grey[300],
            mb: 2,
            "&:hover": {
              backgroundColor: isLightMode ? colors.grey[900] : colors.primary[500],
            },
          }}
        >
          {t("common.cancel")}
        </Button>
        <Typography
          variant="h3"
          sx={{
            color: isLightMode ? colors.grey[100] : colors.grey[100],
            fontWeight: "bold",
            mb: 1,
          }}
        >
          {t("admin.companies.create.title")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: isLightMode ? colors.grey[300] : colors.grey[300],
          }}
        >
          {t("admin.companies.create.subtitle")}
        </Typography>
      </Box>

      {/* Form */}
      <Paper
        sx={{
          p: 4,
          backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
          borderRadius: "8px",
          boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label={t("admin.companies.create.form.name")}
              value={formData.name}
              onChange={handleChange("name")}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
              sx={textFieldStyles}
            />

            <TextField
              label={t("admin.companies.create.form.email")}
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
              sx={textFieldStyles}
            />

            <TextField
              label={t("admin.companies.create.form.industry")}
              select
              value={formData.industry}
              onChange={handleChange("industry")}
              fullWidth
              required
              error={!!errors.industry}
              helperText={errors.industry}
              sx={selectFieldStyles}
            >
              {INDUSTRIES.map((industry) => {
                const config = getIndustryConfig(industry);
                return (
                  <MenuItem
                    key={industry}
                    value={industry}
                    sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}
                  >
                    {config.name}
                  </MenuItem>
                );
              })}
            </TextField>

            {errors.submit && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errors.submit}
              </Alert>
            )}

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
              <Button
                onClick={() => router.push(`/admin/${locale}/companies`)}
                disabled={loading}
                sx={{
                  color: isLightMode ? colors.grey[300] : colors.grey[300],
                  "&:hover": {
                    backgroundColor: isLightMode ? colors.grey[900] : colors.primary[500],
                  },
                }}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: colors.blueAccent[500],
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: colors.blueAccent[600],
                  },
                  "&:disabled": {
                    backgroundColor: isLightMode ? colors.grey[800] : colors.grey[700],
                    color: isLightMode ? colors.grey[600] : colors.grey[500],
                  },
                }}
              >
                {loading ? t("admin.companies.create.form.creating") : t("admin.companies.create.form.create")}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

