import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }: any) {
  return (
    <html lang="tr">
      <body>
        <AppRouterCacheProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
