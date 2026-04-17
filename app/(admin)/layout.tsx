import { AdminNavbar } from '@/components/admin-section';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminNavbar />
      <main className="pt-16 min-h-screen">{children}</main>
    </>
  );
}
