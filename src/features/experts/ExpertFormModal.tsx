"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  useTheme,
  Typography,
} from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { Expert } from "@/types/experts";
import { getTextFieldStyles, getSelectFieldStyles } from "@/lib/form-styles";
import { FormValidator } from "@/lib/validation";

interface ExpertFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (expert: Omit<Expert, "id"> | Expert) => Promise<void>;
  expert?: Expert | null;
  mode: "create" | "edit";
}

export default function ExpertFormModal({
  open,
  onClose,
  onSubmit,
  expert,
  mode,
}: ExpertFormModalProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    gender: "Kadın" as "Kadın" | "Erkek",
    experience: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === "edit" && expert) {
      setFormData({
        name: expert.name,
        surname: expert.surname,
        age: expert.age.toString(),
        gender: expert.gender,
        experience: expert.experience.toString(),
      });
    } else {
      setFormData({
        name: "",
        surname: "",
        age: "",
        gender: "Kadın",
        experience: "",
      });
    }
    setErrors({});
  }, [expert, mode, open]);

  const validate = (): boolean => {
    const validator = new FormValidator();
    
    validator
      .required("name", formData.name, t("experts.form.validation.nameRequired"))
      .required("surname", formData.surname, t("experts.form.validation.surnameRequired"))
      .numberRange("age", formData.age, 18, 100, t("experts.form.validation.ageInvalid"))
      .numberRange("experience", formData.experience, 0, 50, t("experts.form.validation.experienceInvalid"));

    const newErrors = validator.getErrors();
    setErrors(newErrors);
    return validator.isValid();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const expertData = {
        name: formData.name.trim(),
        surname: formData.surname.trim(),
        age: parseInt(formData.age),
        gender: formData.gender,
        experience: parseInt(formData.experience),
      };

      if (mode === "edit" && expert) await onSubmit({ ...expertData, id: expert.id });
      else await onSubmit(expertData);

      onClose();
    } catch (err) {
      console.error("Form submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const isLightMode = theme.palette.mode === "light";
  const formStylesOptions = { theme, colors, isLightMode };
  const textFieldStyles = getTextFieldStyles(formStylesOptions);
  const selectFieldStyles = getSelectFieldStyles(formStylesOptions);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
          backgroundImage: "none",
          boxShadow: isLightMode
            ? "0 4px 20px rgba(0,0,0,0.15)"
            : "0 4px 20px rgba(0,0,0,0.5)",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            color: isLightMode ? colors.grey[100] : colors.grey[100],
            borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            pb: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {mode === "create" ? t("experts.form.addTitle") : t("experts.form.editTitle")}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label={t("experts.form.name")}
              value={formData.name}
              onChange={handleChange("name")}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
              sx={textFieldStyles}
            />

            <TextField
              label={t("experts.form.surname")}
              value={formData.surname}
              onChange={handleChange("surname")}
              fullWidth
              required
              error={!!errors.surname}
              helperText={errors.surname}
              sx={textFieldStyles}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label={t("experts.form.age")}
                type="number"
                value={formData.age}
                onChange={handleChange("age")}
                fullWidth
                required
                error={!!errors.age}
                helperText={errors.age}
                inputProps={{ min: 18, max: 100 }}
                sx={textFieldStyles}
              />

              <TextField
                label={t("experts.form.gender")}
                select
                value={formData.gender}
                onChange={handleChange("gender")}
                fullWidth
                required
                sx={selectFieldStyles}
              >
                <MenuItem
                  value="Kadın"
                  sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}
                >
                  {t("common.gender.female")}
                </MenuItem>
                <MenuItem
                  value="Erkek"
                  sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}
                >
                  {t("common.gender.male")}
                </MenuItem>
              </TextField>
            </Box>

            <TextField
              label={t("experts.form.experience")}
              type="number"
              value={formData.experience}
              onChange={handleChange("experience")}
              fullWidth
              required
              error={!!errors.experience}
              helperText={errors.experience}
              inputProps={{ min: 0, max: 50 }}
              sx={textFieldStyles}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            borderTop: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            gap: 2,
          }}
        >
          <Button
            onClick={onClose}
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
            {loading
              ? mode === "create"
                ? t("experts.form.adding")
                : t("experts.form.updating")
              : mode === "create"
              ? t("experts.form.add")
              : t("experts.form.update")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
