export interface DashboardStat {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  progress: number;
  increase: string;
}

export interface DashboardStatsData {
  totalAppointments: number;
  pendingAppointments: number;
  customers: number;
}

export interface AdminDashboardStatsData {
  totalCompanies: number;
  totalAppointments: number;
  totalCustomers: number;
}

