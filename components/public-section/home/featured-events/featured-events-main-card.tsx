// components/public-section/home/featured-events/featured-events-main-card.tsx

import Link from 'next/link';
import { FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

import { formatThaiDateTime } from '@/lib/thai-datetime';
import type { EventSummary } from '@/services';
import { FeaturedEventsBadge } from './featured-events-badge';

interface FeaturedEventsMainCardProps {
  event?: EventSummary;
  isLoading?: boolean;
}

const formatTimeRange = (startTime: string, endTime: string) => {
  return `${formatThaiDateTime(startTime, { hour: '2-digit', minute: '2-digit' })} - ${formatThaiDateTime(endTime, { hour: '2-digit', minute: '2-digit' })}`;
};

const formatDateLabel = (startTime: string) => {
  return `${formatThaiDateTime(startTime, { month: 'short' })} ${formatThaiDateTime(startTime, { day: '2-digit' })}`;
};

export const FeaturedEventsMainCard = ({ event, isLoading = false }: FeaturedEventsMainCardProps) => {
  if (!event) {
    return (
      <article className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm lg:row-span-2 lg:self-start p-6 text-muted">
        {isLoading ? 'กำลังโหลดกิจกรรมแนะนำ...' : 'ยังไม่มีกิจกรรมที่จะแนะนำ'}
      </article>
    );
  }

  return (
    <Link href={`/events/${event.eventId}`} className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm lg:row-span-2 lg:self-start block">
      <div className="relative h-56 md:h-68 lg:h-76 overflow-hidden bg-linear-to-br from-primary via-link to-accent">
        {event.coverImageUrl ? (
          <img src={event.coverImageUrl} alt={event.title} className="h-full w-full object-cover object-center" />
        ) : null}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_35%_25%,var(--color-primary-foreground)_0%,transparent_45%)]" />
        <div className="absolute -bottom-8 -right-6 h-36 w-36 rounded-full bg-primary-foreground/20" />
        <div className="absolute -top-12 left-20 h-36 w-36 rounded-full bg-accent-soft" />

        <div className="relative h-full p-4 md:p-6 lg:p-7 flex flex-col justify-between">
          <FeaturedEventsBadge label={event.category?.name || 'EVENT'} />
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
            {formatDateLabel(event.startTime)}
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-muted">
          <span className="inline-flex items-center gap-1.5">
            <FaClock className="h-3 w-3 text-link" />
            {formatTimeRange(event.startTime, event.endTime)}
          </span>
          {event.locationName ? (
            <span className="inline-flex items-center gap-1.5">
              <FaMapMarkerAlt className="h-3 w-3 text-link" />
              {event.locationName}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
};
