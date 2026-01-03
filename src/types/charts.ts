export interface MonthlyAppointmentData {
  month: string; // Month name (e.g., "Ocak", "January")
  monthIndex: number; // 0-11
  year: number;
  count: number; // Number of appointments in that month
}

export interface AppointmentsChartResponse {
  data: MonthlyAppointmentData[];
  total: number;
}

export interface ChartFilters {
  year?: number;
  startMonth?: number; // 0-11
  endMonth?: number; // 0-11
}

