/**
 * Industry Configurations
 * Her sektör için özellikler, menü öğeleri ve alan eşlemeleri
 */

import { IndustryConfig, IndustryType } from "@/types/industry";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HotelIcon from "@mui/icons-material/Hotel";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

/**
 * Icon mapping - Component isimlerini React component'lere map eder
 */
export const iconMap: Record<string, React.ComponentType<any>> = {
  PeopleOutlinedIcon,
  HotelIcon,
  TableRestaurantIcon,
  ContactsOutlinedIcon,
  ReceiptOutlinedIcon,
  CalendarTodayOutlinedIcon,
};

/**
 * Industry configurations
 * Her sektör için özellikler, menü öğeleri ve terminoloji tanımları
 */
export const industryConfigs: Record<IndustryType, IndustryConfig> = {
  beauty_salon: {
    type: "beauty_salon",
    name: "Beauty Salon",
    features: {
      experts: true,
      rooms: false,
      tables: false,
      appointments: true,
      customers: true,
      services: true,
      staff: true,
    },
    menuItems: [
      {
        key: "experts",
        labelKey: "sidebar.manageTeam",
        route: "/experts",
        icon: "PeopleOutlinedIcon",
        feature: "experts",
      },
      {
        key: "customers",
        labelKey: "sidebar.customers",
        route: "/customers",
        icon: "ContactsOutlinedIcon",
        feature: "customers",
      },
      {
        key: "callLogs",
        labelKey: "sidebar.callLogs",
        route: "/calls",
        icon: "ReceiptOutlinedIcon",
      },
      {
        key: "calendar",
        labelKey: "sidebar.calendar",
        route: "/calendar",
        icon: "CalendarTodayOutlinedIcon",
        feature: "appointments",
      },
    ],
    fieldMappings: {
      expert: "fieldMappings.expert",
      customer: "fieldMappings.customer",
      appointment: "fieldMappings.appointment",
      service: "fieldMappings.service",
    },
  },
  hotel: {
    type: "hotel",
    name: "Hotel",
    features: {
      experts: false,
      rooms: true,
      tables: false,
      appointments: true,
      customers: true,
      services: true,
      staff: true,
    },
    menuItems: [
      {
        key: "rooms",
        labelKey: "sidebar.manageRooms",
        route: "/rooms",
        icon: "HotelIcon",
        feature: "rooms",
      },
      {
        key: "customers",
        labelKey: "sidebar.guests",
        route: "/customers",
        icon: "ContactsOutlinedIcon",
        feature: "customers",
      },
      {
        key: "callLogs",
        labelKey: "sidebar.callLogs",
        route: "/calls",
        icon: "ReceiptOutlinedIcon",
      },
      {
        key: "calendar",
        labelKey: "sidebar.calendar",
        route: "/calendar",
        icon: "CalendarTodayOutlinedIcon",
        feature: "appointments",
      },
    ],
    fieldMappings: {
      expert: "fieldMappings.room",
      customer: "fieldMappings.guest",
      appointment: "fieldMappings.reservation",
      service: "fieldMappings.roomType",
    },
  },
  cafe: {
    type: "cafe",
    name: "Cafe",
    features: {
      experts: false,
      rooms: false,
      tables: true,
      appointments: true,
      customers: true,
      services: true,
      staff: true,
    },
    menuItems: [
      {
        key: "tables",
        labelKey: "sidebar.manageTables",
        route: "/tables",
        icon: "TableRestaurantIcon",
        feature: "tables",
      },
      {
        key: "customers",
        labelKey: "sidebar.customers",
        route: "/customers",
        icon: "ContactsOutlinedIcon",
        feature: "customers",
      },
      {
        key: "callLogs",
        labelKey: "sidebar.callLogs",
        route: "/calls",
        icon: "ReceiptOutlinedIcon",
      },
      {
        key: "calendar",
        labelKey: "sidebar.calendar",
        route: "/calendar",
        icon: "CalendarTodayOutlinedIcon",
        feature: "appointments",
      },
    ],
    fieldMappings: {
      expert: "fieldMappings.table",
      customer: "fieldMappings.customer",
      appointment: "fieldMappings.reservation",
      service: "fieldMappings.menuItem",
    },
  },
  restaurant: {
    type: "restaurant",
    name: "Restaurant",
    features: {
      experts: false,
      rooms: false,
      tables: true,
      appointments: true,
      customers: true,
      services: true,
      staff: true,
    },
    menuItems: [
      {
        key: "tables",
        labelKey: "sidebar.manageTables",
        route: "/tables",
        icon: "TableRestaurantIcon",
        feature: "tables",
      },
      {
        key: "customers",
        labelKey: "sidebar.customers",
        route: "/customers",
        icon: "ContactsOutlinedIcon",
        feature: "customers",
      },
      {
        key: "callLogs",
        labelKey: "sidebar.callLogs",
        route: "/calls",
        icon: "ReceiptOutlinedIcon",
      },
      {
        key: "calendar",
        labelKey: "sidebar.calendar",
        route: "/calendar",
        icon: "CalendarTodayOutlinedIcon",
        feature: "appointments",
      },
    ],
    fieldMappings: {
      expert: "fieldMappings.table",
      customer: "fieldMappings.customer",
      appointment: "fieldMappings.reservation",
      service: "fieldMappings.menuItem",
    },
  },
  spa: {
    type: "spa",
    name: "Spa",
    features: {
      experts: true,
      rooms: false,
      tables: false,
      appointments: true,
      customers: true,
      services: true,
      staff: true,
    },
    menuItems: [
      {
        key: "experts",
        labelKey: "sidebar.manageTeam",
        route: "/experts",
        icon: "PeopleOutlinedIcon",
        feature: "experts",
      },
      {
        key: "customers",
        labelKey: "sidebar.customers",
        route: "/customers",
        icon: "ContactsOutlinedIcon",
        feature: "customers",
      },
      {
        key: "callLogs",
        labelKey: "sidebar.callLogs",
        route: "/calls",
        icon: "ReceiptOutlinedIcon",
      },
      {
        key: "calendar",
        labelKey: "sidebar.calendar",
        route: "/calendar",
        icon: "CalendarTodayOutlinedIcon",
        feature: "appointments",
      },
    ],
    fieldMappings: {
      expert: "fieldMappings.therapist",
      customer: "fieldMappings.client",
      appointment: "fieldMappings.appointment",
      service: "fieldMappings.service",
    },
  },
  fitness: {
    type: "fitness",
    name: "Fitness Center",
    features: {
      experts: true,
      rooms: false,
      tables: false,
      appointments: true,
      customers: true,
      services: true,
      staff: true,
    },
    menuItems: [
      {
        key: "experts",
        labelKey: "sidebar.manageTeam",
        route: "/experts",
        icon: "PeopleOutlinedIcon",
        feature: "experts",
      },
      {
        key: "customers",
        labelKey: "sidebar.customers",
        route: "/customers",
        icon: "ContactsOutlinedIcon",
        feature: "customers",
      },
      {
        key: "callLogs",
        labelKey: "sidebar.callLogs",
        route: "/calls",
        icon: "ReceiptOutlinedIcon",
      },
      {
        key: "calendar",
        labelKey: "sidebar.calendar",
        route: "/calendar",
        icon: "CalendarTodayOutlinedIcon",
        feature: "appointments",
      },
    ],
    fieldMappings: {
      expert: "fieldMappings.trainer",
      customer: "fieldMappings.member",
      appointment: "fieldMappings.session",
      service: "fieldMappings.service",
    },
  },
  clinic: {
    type: "clinic",
    name: "Clinic",
    features: {
      experts: true,
      rooms: false,
      tables: false,
      appointments: true,
      customers: true,
      services: true,
      staff: true,
    },
    menuItems: [
      {
        key: "experts",
        labelKey: "sidebar.manageTeam",
        route: "/experts",
        icon: "PeopleOutlinedIcon",
        feature: "experts",
      },
      {
        key: "customers",
        labelKey: "sidebar.customers",
        route: "/customers",
        icon: "ContactsOutlinedIcon",
        feature: "customers",
      },
      {
        key: "callLogs",
        labelKey: "sidebar.callLogs",
        route: "/calls",
        icon: "ReceiptOutlinedIcon",
      },
      {
        key: "calendar",
        labelKey: "sidebar.calendar",
        route: "/calendar",
        icon: "CalendarTodayOutlinedIcon",
        feature: "appointments",
      },
    ],
    fieldMappings: {
      expert: "fieldMappings.doctor",
      customer: "fieldMappings.patient",
      appointment: "fieldMappings.appointment",
      service: "fieldMappings.service",
    },
  },
};

/**
 * Belirli bir sektör için config getir
 */
export const getIndustryConfig = (industryType: IndustryType): IndustryConfig => {
  return industryConfigs[industryType] || industryConfigs.beauty_salon;
};

/**
 * Belirli bir feature'ın aktif olup olmadığını kontrol et
 */
export const isFeatureEnabled = (
  industryType: IndustryType,
  feature: keyof IndustryConfig["features"]
): boolean => {
  const config = getIndustryConfig(industryType);
  return config.features[feature] || false;
};

