import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

export const OrganizerNavbarProfile = () => {
  return (
    <Link
      href="/profile"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-muted hover:bg-border transition-colors"
      aria-label="โปรไฟล์ผู้ใช้"
    >
      <FaUser className="w-5 h-5 text-foreground" />
    </Link>
  );
};
