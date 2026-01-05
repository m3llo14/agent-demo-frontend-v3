/**
 * Application Constants
 * Magic numbers, strings, and configuration values
 */

// Mock data delay times (ms)
export const MOCK_DELAYS = {
  SHORT: 100,
  MEDIUM: 300,
  LONG: 500,
} as const;

// Status colors
export const STATUS_COLORS = {
  PENDING: "#ff9800",
  CONFIRMED: "#4caf50",
  CANCELLED: "#f44336",
  COMPLETED: "#4caf50",
} as const;

// Avatar color palettes
export const AVATAR_COLORS = [
  { bg: "#e3f2fd", text: "#1976d2" }, // Blue
  { bg: "#f3e5f5", text: "#7b1fa2" }, // Purple
  { bg: "#e8f5e9", text: "#388e3c" }, // Green
  { bg: "#fff3e0", text: "#f57c00" }, // Orange
  { bg: "#fce4ec", text: "#c2185b" }, // Pink
] as const;

// Customer card avatar colors (different palette)
export const CUSTOMER_AVATAR_COLORS = [
  { bg: "#FFF9C4", text: "#F57F17" }, // Yellow
  { bg: "#FFE0B2", text: "#E65100" }, // Orange
  { bg: "#C5E1A5", text: "#33691E" }, // Green
  { bg: "#BBDEFB", text: "#0D47A1" }, // Blue
  { bg: "#F8BBD0", text: "#880E4F" }, // Pink
  { bg: "#D1C4E9", text: "#4A148C" }, // Purple
] as const;

