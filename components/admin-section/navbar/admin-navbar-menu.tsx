import Link from 'next/link';
import { ADMIN_NAV_ITEMS } from '../constants';

interface AdminNavbarMenuProps {
  isActive?: (href: string) => boolean;
  className?: string;
}

export const AdminNavbarMenu = ({
  isActive,
  className = '',
}: AdminNavbarMenuProps) => {
  return (
    <nav className={className}>
      <ul className="flex gap-5">
        {ADMIN_NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`text-sm font-medium transition-colors ${
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
