// components/public-section/navbar/navbar-menu.tsx

'use client';

import Link from 'next/link';
import { NAV_ITEMS } from './constants';
import { NavItem, NavbarMenuProps } from './types';

export const NavbarMenu = ({ isActive, className = '' }: NavbarMenuProps) => {
  return (
    <nav className={className}>
      <ul className="flex gap-6 md:gap-8">
        {NAV_ITEMS.map((item: NavItem) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`text-sm md:text-base font-medium transition-colors ${
                isActive?.(item.href)
                  ? 'text-link'
                  : 'text-foreground hover:text-link'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
