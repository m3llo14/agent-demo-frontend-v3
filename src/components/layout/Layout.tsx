"use client";

import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Box, Theme } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ColorModeContext, useMode } from "@/themes/colors";

export default function Layout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [theme, colorMode] = useMode() as [
    Theme,
    { toggleColorMode: () => void }
  ];
  const [mounted, setMounted] = useState(false);

  // Hydration hatasını önlemek için client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // Server-side render sırasında boş render döndür
  if (!mounted) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box sx={{ width: "250px" }} />
        <Box sx={{ flex: 1 }} />
      </Box>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar locale={locale} />
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Navbar locale={locale} />
            <Box
              component="main"
              sx={{
                flex: 1,
                p: 4,
                backgroundColor: (theme: Theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : "#f5f5f5",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
