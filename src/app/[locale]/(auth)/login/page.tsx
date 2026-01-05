"use client";

import { useState, useContext, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  useTheme,
  IconButton,
} from "@mui/material";
import { ColorModeContext, tokens } from "@/themes/colors";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const colorMode = useContext(ColorModeContext) as {
    toggleColorMode: () => void;
  };

  // Hydration hatasını önlemek için client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || t("auth.loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  const isDarkMode = theme.palette.mode === "dark";
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: isDarkMode ? colors.primary[500] : "#ffffff",
      "& fieldset": {
        borderColor: isDarkMode ? colors.grey[700] : colors.grey[300],
      },
      "&:hover fieldset": {
        borderColor: isDarkMode ? colors.grey[100] : colors.blueAccent[500],
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.blueAccent[500],
      },
    },
    "& .MuiInputLabel-root": {
      color: isDarkMode ? colors.grey[300] : colors.grey[600],
    },
    "& .MuiInputBase-input": {
      color: isDarkMode ? colors.grey[100] : colors.grey[900],
    },
  };

  // Server-side render sırasında minimal render döndür
  if (!mounted) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : "#f5f5f5",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 3,
          backgroundColor: isDarkMode ? colors.primary[400] : "#ffffff",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: isDarkMode ? colors.grey[100] : colors.grey[900],
              textAlign: "center",
              mb: 3,
            }}
          >
            {t("auth.title")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? colors.grey[300] : colors.grey[600],
              textAlign: "center",
              mb: 3,
            }}
          >
            {t("auth.subtitle")}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t("common.email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2, ...textFieldStyles }}
            />
            <TextField
              fullWidth
              label={t("common.password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3, ...textFieldStyles }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: colors.blueAccent[500],
                color: colors.grey[100],
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
                py: 1.5,
              }}
            >
              {loading ? t("common.signingIn") : t("common.signIn")}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? colors.grey[400] : colors.grey[600],
                mb: 1,
              }}
            >
              {t("auth.testAccounts")}:
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: isDarkMode ? colors.grey[500] : colors.grey[700] }}
            >
              {t("auth.adminAccount")}
              <br />
              {t("auth.merchantAccount")}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <IconButton
        onClick={colorMode.toggleColorMode}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: isDarkMode ? colors.primary[500] : "#ffffff",
          color: isDarkMode ? colors.grey[100] : colors.grey[900],
          boxShadow: isDarkMode
            ? "0px 2px 8px rgba(0,0,0,0.32)"
            : "0px 2px 8px rgba(0,0,0,0.15)",
          "&:hover": {
            backgroundColor: isDarkMode
              ? colors.primary[600]
              : colors.grey[100],
          },
        }}
      >
        {isDarkMode ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
      </IconButton>
    </Box>
  );
}

