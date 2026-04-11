// components/public-section/navbar/navbar-logo.tsx

'use client';

import Link from 'next/link';

export const NavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center">
      <span className="font-bold text-2xl text-primary">
        Event Around
      </span>
    </Link>
  );
};
