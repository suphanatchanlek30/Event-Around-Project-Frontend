// components/public-section/navbar/navbar-profile.tsx

'use client';

import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { NavbarProfileProps } from './types';

export const NavbarProfile = ({ className = '' }: NavbarProfileProps) => {
  return (
    <Link
      href="/profile"
      className={`flex items-center justify-center w-10 h-10 rounded-full bg-surface-muted hover:bg-border transition-colors ${className}`}
      aria-label="User Profile"
    >
      <FaUser className="w-5 h-5 text-foreground" />
    </Link>
  );
};
