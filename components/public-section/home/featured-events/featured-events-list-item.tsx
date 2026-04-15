// components/public-section/home/featured-events/featured-events-list-item.tsx

import { FaArrowRight } from 'react-icons/fa';
import { FeaturedEventItem } from './types';

interface FeaturedEventsListItemProps {
  event: FeaturedEventItem;
}

export const FeaturedEventsListItem = ({ event }: FeaturedEventsListItemProps) => {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-3.5 md:p-4 shadow-sm">
      <div className="space-y-2">
        <p className="text-[11px] font-semibold tracking-[0.08em] text-link">{event.category}</p>
        <h5 className="text-lg md:text-xl font-semibold leading-snug text-foreground">
          {event.title}
        </h5>
        {event.description ? (
          <p className="text-sm text-muted leading-relaxed line-clamp-2">{event.description}</p>
        ) : null}
      </div>

      <div className="mt-auto pt-3 flex items-center justify-between gap-3">
        <p className="text-xs md:text-sm font-semibold text-muted">{event.timeRange}</p>
        <button
          type="button"
          aria-label={`Read more about ${event.title}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-accent-soft transition-colors"
        >
          <FaArrowRight className="h-3 w-3" />
        </button>
      </div>
    </article>
  );
};
