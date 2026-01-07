import AdminLayout from "@/components/layout/AdminLayout";

export default async function AdminLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AdminLayout locale={locale}>{children}</AdminLayout>;
}