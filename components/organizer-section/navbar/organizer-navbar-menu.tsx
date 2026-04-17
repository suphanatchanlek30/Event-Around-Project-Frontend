'use client';

import Link from 'next/link';
import { ORGANIZER_NAV_ITEMS } from '../constants';

interface OrganizerNavbarMenuProps {
  isActive?: (href: string) => boolean;
  className?: string;
}

export const OrganizerNavbarMenu = ({
  isActive,
  className = '',
}: OrganizerNavbarMenuProps) => {
  return (
    <nav className={className}>
      <ul className="flex gap-6 md:gap-8">
        {ORGANIZER_NAV_ITEMS.map((item) => (
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
