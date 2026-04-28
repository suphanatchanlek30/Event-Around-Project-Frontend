// components/public-section/home/upcoming-events/upcoming-event-card.tsx

import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

import { formatThaiDateTime } from '@/lib/thai-datetime';
import type { EventSummary } from '@/services';

interface UpcomingEventCardProps {
  event: EventSummary;
}

const formatDateLabel = (startTime: string) => {
  return formatThaiDateTime(startTime, {
    day: '2-digit',
    month: 'short',
  });
};

const formatTimeLabel = (startTime: string) => {
  return formatThaiDateTime(startTime, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const UpcomingEventCard = ({ event }: UpcomingEventCardProps) => {
  return (
    <Link href={`/events/${event.eventId}`} className="snap-start flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md h-full">
      <div className="h-36 md:h-40 bg-linear-to-br from-slate-800 via-slate-700 to-slate-950 relative">
        {event.coverImageUrl ? (
          <img src={event.coverImageUrl} alt={event.title} className="absolute inset-0 h-full w-full object-cover object-center" />
        ) : null}
        <div className="absolute inset-0 bg-black/25" />
        <div className="flex h-full items-start justify-between p-4 md:p-5">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground shadow-sm z-10">
            {event.category?.name || 'EVENT'}
          </span>
          <span className="rounded-2xl bg-white/15 px-3 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm z-10">
            {formatDateLabel(event.startTime)}
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
            {formatTimeLabel(event.startTime)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FaMapMarkerAlt className="h-3.5 w-3.5 text-link" />
            {event.locationName || 'ยังไม่ระบุสถานที่'}
          </span>
        </div>
      </div>
    </Link>
  );
};
