export interface Expert {
  id: string;
  name: string;
  surname: string;
  age: number;
  gender: "Kadın" | "Erkek";
  experience: number; // Yıl cinsinden
}

export interface ExpertsResponse {
  experts: Expert[];
  total: number;
}

