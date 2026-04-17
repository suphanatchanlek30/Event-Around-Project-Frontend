import Link from 'next/link';

export const AdminNavbarLogo = () => {
  return (
    <Link href="/admin" className="flex items-center">
      <span className="font-bold text-2xl text-primary">Event Around</span>
    </Link>
  );
};
