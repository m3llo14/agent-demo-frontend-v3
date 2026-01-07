import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { AuthProvider } from "@/contexts/AuthContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { CompanyProvider } from "@/contexts/CompanyContext";

export default function RootLayout({ children }: any) {
  return (
    <html lang="tr">
      <body>
        <AppRouterCacheProvider>
          <CompanyProvider>
            <AuthProvider>
              <LocaleProvider>
                {children}
              </LocaleProvider>
            </AuthProvider>
          </CompanyProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
