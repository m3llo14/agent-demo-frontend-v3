import { Company, IndustryType } from "./industry";

export interface CompaniesData {
  companies: Company[];
  total: number;
}

export interface CreateCompanyRequest {
  name: string;
  email: string;
  industry: string;
}

export interface CreateCompanyResponse {
  company: Company;
}

export interface Subscription {
  id: string;
  plan: string;
  status: "active" | "inactive" | "expired";
  startDate: string;
  endDate: string;
}

export interface CompanyAdmin {
  id: string;
  email: string;
  createdAt: string;
}

export interface CompanyDetail {
  id: string;
  name: string;
  email: string;
  industry: IndustryType;
  createdAt: string;
  status: "active" | "inactive" | "pending";
  subscription?: Subscription;
  admins?: CompanyAdmin[];
}

export interface AddSubscriptionRequest {
  plan: string;
  startDate: string;
  endDate: string;
}

export interface AddAdminRequest {
  email: string;
  password: string;
}

