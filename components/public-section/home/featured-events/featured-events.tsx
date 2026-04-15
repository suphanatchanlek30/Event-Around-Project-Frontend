// components/public-section/home/featured-events/featured-events.tsx

import Link from 'next/link';
import { FEATURED_EVENTS } from './constants';
import { FeaturedEventsListItem } from './featured-events-list-item';
import { FeaturedEventsMainCard } from './featured-events-main-card';
import { FeaturedEventsProps } from './types';

export const FeaturedEvents = ({ className = '' }: FeaturedEventsProps) => {
  return (
    <section className={`mt-6 md:mt-8 mb-3 md:mb-4 ${className}`}>
      <div className="mb-3 md:mb-4 flex items-center justify-between gap-3">
        <h3 className="text-2xl md:text-[2rem] font-semibold text-foreground">กิจกรรมแนะนำ</h3>
        <Link href="/events" className="text-sm md:text-base font-semibold text-link hover:opacity-80 transition-opacity">
          ดูทั้งหมด
        </Link>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:items-stretch">
        <FeaturedEventsMainCard event={FEATURED_EVENTS.spotlight} />

        <div className="grid gap-4 md:gap-5 lg:auto-rows-fr lg:h-full">
          {FEATURED_EVENTS.highlights.map((event) => (
            <FeaturedEventsListItem key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};
