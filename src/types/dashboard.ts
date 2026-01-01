export interface DashboardStat {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  progress: number;
  increase: string;
}

export interface DashboardStatsData {
  stats: DashboardStat[];
}

