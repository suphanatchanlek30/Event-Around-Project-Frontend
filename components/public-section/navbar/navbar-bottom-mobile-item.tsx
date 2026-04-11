// components/public-section/navbar/navbar-bottom-mobile-item.tsx

'use client';

import Link from 'next/link';
import { NavbarBottomMobileItemProps } from './types';

export const NavbarBottomMobileItem = ({
  href,
  label,
  icon: IconComponent,
  isActive,
}: NavbarBottomMobileItemProps) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-200 ${
        isActive
          ? 'bg-primary'
          : 'text-muted hover:text-foreground'
      }`}
    >
      <IconComponent
        className={`w-5 h-5 mb-0.5 ${
          isActive ? 'text-primary-foreground' : ''
        }`}
      />
      <span
        className={`text-xs font-medium ${
          isActive
            ? 'text-primary-foreground'
            : 'text-foreground'
        }`}
      >
        {label}
      </span>
    </Link>
  );
};
