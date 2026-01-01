"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  useTheme,
} from "@mui/material";
import { tokens } from "@/themes/colors";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          backgroundColor: colors.primary[400],
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: colors.grey[100], textAlign: "center", mb: 3 }}
          >
            Artific Agent
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: colors.grey[300], textAlign: "center", mb: 3 }}
          >
            Sign in to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: colors.primary[500],
                  "& fieldset": {
                    borderColor: colors.grey[700],
                  },
                  "&:hover fieldset": {
                    borderColor: colors.grey[100],
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colors.grey[300],
                },
                "& .MuiInputBase-input": {
                  color: colors.grey[100],
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: colors.primary[500],
                  "& fieldset": {
                    borderColor: colors.grey[700],
                  },
                  "&:hover fieldset": {
                    borderColor: colors.grey[100],
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colors.grey[300],
                },
                "& .MuiInputBase-input": {
                  color: colors.grey[100],
                },
              }}
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
              {loading ? "Signing in..." : "SIGN IN"}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: colors.grey[400], mb: 1 }}>
              Test Accounts:
            </Typography>
            <Typography variant="caption" sx={{ color: colors.grey[500] }}>
              Admin: admin@example.com
              <br />
              Merchant: merchant@example.com
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

