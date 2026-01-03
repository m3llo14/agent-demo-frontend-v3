export type CallStatus = "active" | "ended" | "missed" | "cancelled";

export type MessageType = "assistant" | "user" | "assistant_action";

export interface ConversationMessage {
  id: string;
  type: MessageType;
  content: string;
  actionType?: "availability_status" | "create_appointment" | "other";
  timestamp?: string; // HH:mm:ss format
}

export interface CallLog {
  id: string;
  phoneNumber: string;
  customerId?: string;
  customerFirstName?: string;
  customerLastName?: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // HH:mm format
  duration: number; // minutes
  status: CallStatus;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  conversation?: ConversationMessage[]; // Konuşma dökümü
  audioUrl?: string; // Ses kaydı URL'i
}

export interface CallLogsResponse {
  calls: CallLog[];
  total: number;
}

export interface CallLogsFilters {
  startDate?: string; // YYYY-MM-DD format
  endDate?: string; // YYYY-MM-DD format
  phoneNumber?: string;
  status?: CallStatus;
}

