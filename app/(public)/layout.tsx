// app/(public)/layout.tsx

import { Navbar } from '@/components/public-section/navbar';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
