// components/public-section/navbar/navbar-bottom-mobile.tsx

'use client';

import { usePathname } from 'next/navigation';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { NAV_ITEMS, MOBILE_NAV_ICONS } from './constants';
import { NavbarBottomMobileItem } from './navbar-bottom-mobile-item';

export const NavbarBottomMobile = () => {
  const pathname = usePathname();
  const isVisible = useScrollDirection();

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-surface border-t border-border md:hidden z-40 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex justify-around items-center px-2 py-2">
        {NAV_ITEMS.map((item, index) => {
          const iconData = MOBILE_NAV_ICONS[index];

          return (
            <NavbarBottomMobileItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={iconData?.icon}
              isActive={isActive(item.href)}
            />
          );
        })}
      </div>
    </nav>
  );
};
