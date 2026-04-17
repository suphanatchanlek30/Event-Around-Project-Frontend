'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { AdminNavbarLogo } from './admin-navbar-logo';
import { AdminNavbarMenu } from './admin-navbar-menu';
import { AdminNavbarMobile } from './admin-navbar-mobile';
import { AdminNavbarProfile } from './admin-navbar-profile';

export const AdminNavbar = () => {
  const pathname = usePathname();
  const isVisible = useScrollDirection();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-40 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="h-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <div className="md:hidden">
          <AdminNavbarMobile
            isOpen={isMobileOpen}
            onToggle={() => setIsMobileOpen((prev) => !prev)}
            isActive={isActive}
          />
        </div>

        <div className="flex-1 md:flex-none flex justify-center">
          <AdminNavbarLogo />
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <AdminNavbarMenu className="hidden md:block" isActive={isActive} />
          <AdminNavbarProfile />
        </div>
      </div>
    </header>
  );
};
