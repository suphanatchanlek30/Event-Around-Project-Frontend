// app/(public)/page.tsx

import { EventsSearchFilter, HeroBanner } from '@/components/public-section/home';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <HeroBanner className="w-full" />
        <EventsSearchFilter />
      </div>
    </main>
  );
}