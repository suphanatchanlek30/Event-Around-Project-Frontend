// components/public-section/navbar/navbar-mobile.tsx

'use client';

import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { NAV_ITEMS } from './constants';
import { NavItem, NavbarMobileProps } from './types';

export const NavbarMobile = ({ isOpen, onToggle }: NavbarMobileProps) => {
  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={onToggle}
        className="p-2 hover:bg-surface-muted rounded-lg transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6 text-primary" />
        ) : (
          <FaBars className="w-6 h-6 text-primary" />
        )}
      </button>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-surface border-b border-border shadow-lg">
          <nav className="px-4 py-4">
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map((item: NavItem) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onToggle}
                    className="block text-base font-medium text-foreground hover:text-link py-2 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
