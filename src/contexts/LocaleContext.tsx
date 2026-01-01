"use client";

import { createContext, useContext, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getTranslations, Locale } from "@/lib/i18n";

interface LocaleContextType {
  locale: Locale;
  t: (key: string) => string;
  changeLocale: (newLocale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract locale from pathname (e.g., /tr/dashboard -> tr)
  // Handle both /tr/dashboard and /dashboard cases
  const localeMatch = pathname.match(/^\/(tr|en)(\/|$)/);
  const locale: Locale = (localeMatch?.[1] as Locale) || "tr";

  const t = getTranslations(locale);

  const changeLocale = (newLocale: Locale) => {
    // Replace current locale in pathname with new locale
    const newPath = pathname.replace(/^\/(tr|en)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <LocaleContext.Provider value={{ locale, t, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

