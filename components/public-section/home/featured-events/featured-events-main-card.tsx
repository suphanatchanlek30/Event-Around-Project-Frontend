// components/public-section/home/featured-events/featured-events-main-card.tsx

import { FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { FeaturedEventItem } from './types';
import { FeaturedEventsBadge } from './featured-events-badge';

interface FeaturedEventsMainCardProps {
  event: FeaturedEventItem;
}

export const FeaturedEventsMainCard = ({ event }: FeaturedEventsMainCardProps) => {
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm lg:row-span-2 lg:self-start">
      <div className="relative h-56 md:h-68 lg:h-76 overflow-hidden bg-linear-to-br from-primary via-link to-accent">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_35%_25%,var(--color-primary-foreground)_0%,transparent_45%)]" />
        <div className="absolute -bottom-8 -right-6 h-36 w-36 rounded-full bg-primary-foreground/20" />
        <div className="absolute -top-12 left-20 h-36 w-36 rounded-full bg-accent-soft" />

        <div className="relative h-full p-4 md:p-6 lg:p-7 flex flex-col justify-between">
          <FeaturedEventsBadge label={event.category} />
          <div className="inline-flex self-end rounded-2xl bg-primary-foreground/15 p-2.5 text-primary-foreground">
            <FaUsers className="h-7 w-7 md:h-8 md:w-8" />
          </div>
        </div>
      </div>

      <div className="bg-surface p-4 md:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-2xl md:text-[2rem] font-semibold leading-tight text-foreground max-w-[26ch]">
            {event.title}
          </h4>
          <div className="shrink-0 rounded-xl border border-border bg-surface-muted px-2.5 py-1.5 text-primary text-sm md:text-base font-semibold text-center leading-tight">
            {event.dateLabel.split(' ')[0]}
            <br />
            {event.dateLabel.split(' ')[1]}
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-muted">
          <span className="inline-flex items-center gap-1.5">
            <FaClock className="h-3 w-3 text-link" />
            {event.timeRange}
          </span>
          {event.location ? (
            <span className="inline-flex items-center gap-1.5">
              <FaMapMarkerAlt className="h-3 w-3 text-link" />
              {event.location}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
};
