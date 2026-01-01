"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "@/themes/colors";
import { Theme } from "@mui/material";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, colorMode] = useMode() as [
    Theme,
    { toggleColorMode: () => void }
  ];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

