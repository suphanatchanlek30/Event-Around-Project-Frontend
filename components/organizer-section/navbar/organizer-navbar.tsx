'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { OrganizerNavbarLogo } from './organizer-navbar-logo';
import { OrganizerNavbarMenu } from './organizer-navbar-menu';
import { OrganizerNavbarMobile } from './organizer-navbar-mobile';
import { OrganizerNavbarProfile } from './organizer-navbar-profile';

export const OrganizerNavbar = () => {
  const pathname = usePathname();
  const isVisible = useScrollDirection();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/organizer') {
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
          <OrganizerNavbarMobile
            isOpen={isMobileOpen}
            onToggle={() => setIsMobileOpen((prev) => !prev)}
            isActive={isActive}
          />
        </div>

        <div className="flex-1 md:flex-none flex justify-center">
          <OrganizerNavbarLogo />
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          <OrganizerNavbarMenu className="hidden md:block" isActive={isActive} />
          <OrganizerNavbarProfile />
        </div>
      </div>
    </header>
  );
};
