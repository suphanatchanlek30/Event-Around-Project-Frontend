// components/public-section/home/upcoming-events/upcoming-event-card.tsx

import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { UpcomingEventItem } from './types';

interface UpcomingEventCardProps {
  event: UpcomingEventItem;
}

const ACCENT_STYLES: Record<UpcomingEventItem['accent'], string> = {
  violet: 'border-primary/15 bg-primary/5 text-primary',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  amber: 'border-amber-200 bg-amber-50 text-amber-600',
  cyan: 'border-cyan-200 bg-cyan-50 text-cyan-600',
  rose: 'border-rose-200 bg-rose-50 text-rose-600',
};

export const UpcomingEventCard = ({ event }: UpcomingEventCardProps) => {
  const accentClass = ACCENT_STYLES[event.accent];

  return (
    <article className="snap-start flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md h-full">
      <div className={`h-36 md:h-40 bg-linear-to-br from-slate-800 via-slate-700 to-slate-950 ${accentClass}`}>
        <div className="flex h-full items-start justify-between p-4 md:p-5">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground shadow-sm">
            {event.category}
          </span>
          <span className="rounded-2xl bg-white/15 px-3 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm">
            {event.dateLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h4 className="line-clamp-2 text-lg md:text-xl font-semibold leading-snug text-foreground">
          {event.title}
        </h4>

        <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <FaCalendarAlt className="h-3.5 w-3.5 text-link" />
            {event.timeLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FaMapMarkerAlt className="h-3.5 w-3.5 text-link" />
            {event.location}
          </span>
        </div>
      </div>
    </article>
  );
};
