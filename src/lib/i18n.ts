import enTranslations from "@/locales/en";
import trTranslations from "@/locales/tr";

export type Locale = "en" | "tr";

const translations = {
  en: enTranslations,
  tr: trTranslations,
} as const;

type TranslationKey = string;
type TranslationValue = string | { [key: string]: TranslationValue };

function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let value: any = obj;
  
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return path; // Return the path if key not found
    }
  }
  
  return typeof value === "string" ? value : path;
}

export function getTranslations(locale: Locale) {
  const t = (key: string): string => {
    return getNestedValue(translations[locale], key);
  };
  
  return t;
}
