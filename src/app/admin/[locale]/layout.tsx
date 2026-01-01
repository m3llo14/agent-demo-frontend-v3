import Layout from "@/components/layout/Layout";

export default async function AdminLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <Layout locale={locale}>{children}</Layout>;
}