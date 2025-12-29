import { getTranslations, type Locale } from "@/lib/i18n";

interface StatsCardsProps {
  locale: Locale;
}

export default function StatsCards({ locale }: StatsCardsProps) {
  const t = getTranslations(locale);
  
  const stats = [
    { 
      labelKey: "totalAppointments", 
      value: "8", 
      subtitleKey: "last30Days",
      color: "from-blue-500 to-indigo-500",
      icon: "📅"
    },
    { 
      labelKey: "pendingAppointments", 
      value: "2", 
      subtitleKey: "awaitingAction",
      color: "from-orange-500 to-amber-500",
      icon: "⏳"
    },
    { 
      labelKey: "customers", 
      value: "1710", 
      subtitleKey: "registeredCustomers",
      color: "from-green-500 to-emerald-500",
      icon: "👥"
    },
    { 
      labelKey: "totalCalls", 
      value: "342", 
      subtitleKey: "thisMonth",
      color: "from-purple-500 to-pink-500",
      icon: "📞"
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.labelKey}
          className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{item.icon}</span>
          </div>
          <p className="text-gray-500 text-sm">{t(`dashboard.${item.labelKey}`)}</p>
          <p className="text-3xl font-bold mt-2">{item.value}</p>
          <p className="text-gray-400 text-xs mt-1">{t(`dashboard.${item.subtitleKey}`)}</p>
          <div className={`mt-3 h-1.5 bg-gradient-to-r ${item.color} rounded-full`} />
        </div>
      ))}
    </div>
  );
}
