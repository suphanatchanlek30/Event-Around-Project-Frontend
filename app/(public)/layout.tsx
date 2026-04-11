// app/(public)/layout.tsx

import { Navbar, NavbarBottomMobile } from '@/components/public-section/navbar';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">{children}</main>
      <NavbarBottomMobile />
    </>
  );
}
