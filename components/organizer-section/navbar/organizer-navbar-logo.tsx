import Link from 'next/link';

export const OrganizerNavbarLogo = () => {
  return (
    <Link href="/organizer" className="flex items-center">
      <span className="font-bold text-2xl text-primary">Event Around</span>
    </Link>
  );
};
