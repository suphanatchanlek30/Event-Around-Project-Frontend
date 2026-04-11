// components/public-section/navbar/navbar.tsx

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { NavbarLogo } from './navbar-logo';
import { NavbarMenu } from './navbar-menu';
import { NavbarProfile } from './navbar-profile';
import { NavbarMobile } from './navbar-mobile';
import { NAVBAR_HEIGHT, NAVBAR_PADDING } from './constants';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isVisible = useScrollDirection();

  const isActive = (href: string) => pathname === href;

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 ${NAVBAR_HEIGHT} bg-surface border-b border-border z-40 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className={`${NAVBAR_HEIGHT} ${NAVBAR_PADDING} flex items-center justify-between mx-auto max-w-7xl`}
      >
        {/* Left - Mobile Toggle */}
        <div className="flex md:hidden">
          <NavbarMobile isOpen={isMobileMenuOpen} onToggle={handleToggleMobileMenu} />
        </div>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center md:flex-none">
          <NavbarLogo />
        </div>

        {/* Right - Desktop Menu + Profile */}
        <div className="flex items-center gap-4 md:gap-12">
          <NavbarMenu isActive={isActive} className="hidden md:block" />
          <NavbarProfile />
        </div>
      </div>
    </header>
  );
};
