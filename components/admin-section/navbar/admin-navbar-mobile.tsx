'use client';

import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ADMIN_NAV_ITEMS } from '../constants';

interface AdminNavbarMobileProps {
  isOpen: boolean;
  onToggle: () => void;
  isActive: (href: string) => boolean;
}

export const AdminNavbarMobile = ({
  isOpen,
  onToggle,
  isActive,
}: AdminNavbarMobileProps) => {
  return (
    <>
      <button
        onClick={onToggle}
        className="p-2 hover:bg-surface-muted rounded-lg transition-colors"
        aria-label="เปิดเมนูแอดมิน"
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6 text-primary" />
        ) : (
          <FaBars className="w-6 h-6 text-primary" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-surface border-b border-border shadow-lg">
          <nav className="px-4 py-4">
            <ul className="flex flex-col gap-3">
              {ADMIN_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onToggle}
                    className={`block py-2 text-base font-medium transition-colors ${
                      isActive(item.href)
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
        </div>
      )}
    </>
  );
};
