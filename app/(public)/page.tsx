// app/(public)/page.tsx

import {
  CategoryFilter,
  EventsSearchFilter,
  FeaturedEvents,
  HeroBanner,
  UpcomingEventsSection,
} from '@/components/public-section/home';

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <HeroBanner className="w-full" />
        <EventsSearchFilter />
        <CategoryFilter />
        <FeaturedEvents />
        <UpcomingEventsSection />
      </div>
    </main>
  );
}