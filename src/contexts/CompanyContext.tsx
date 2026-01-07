"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Company, IndustryConfig } from "@/types/industry";
import { getIndustryConfig } from "@/config/industries";

interface CompanyContextType {
  company: Company | null;
  industryConfig: IndustryConfig | null;
  isLoading: boolean;
  setCompany: (company: Company | null) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompanyState] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Company değiştiğinde industry config'i güncelle
  const industryConfig = company ? getIndustryConfig(company.industry) : null;

  const setCompany = (newCompany: Company | null) => {
    setCompanyState(newCompany);
    // Company bilgisini localStorage'a kaydet
    if (newCompany) {
      localStorage.setItem("company", JSON.stringify(newCompany));
    } else {
      localStorage.removeItem("company");
    }
  };

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan company bilgisini yükle
    const loadCompany = () => {
      try {
        const savedCompany = localStorage.getItem("company");
        if (savedCompany) {
          const companyData = JSON.parse(savedCompany);
          setCompanyState(companyData);
        }
      } catch (error) {
        console.error("Failed to load company from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompany();
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        company,
        industryConfig,
        isLoading,
        setCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}

