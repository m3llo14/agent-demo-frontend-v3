import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { AuthProvider } from "@/contexts/AuthContext";
import { LocaleProvider } from "@/contexts/LocaleContext";

export default function RootLayout({ children }: any) {
  return (
    <html lang="tr">
      <body>
        <AppRouterCacheProvider>
          <AuthProvider>
            <LocaleProvider>
              {children}
            </LocaleProvider>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
