import { OrganizerNavbar } from '@/components/organizer-section';

export default function OrganizerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <OrganizerNavbar />
      <main className="pt-16 min-h-screen">{children}</main>
    </>
  );
}
