// components/public-section/navbar/navbar.tsx

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavbarLogo } from './navbar-logo';
import { NavbarMenu } from './navbar-menu';
import { NavbarProfile } from './navbar-profile';
import { NavbarMobile } from './navbar-mobile';
import { NAVBAR_HEIGHT, NAVBAR_PADDING } from './constants';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${NAVBAR_HEIGHT} bg-surface border-b border-border`}>
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
