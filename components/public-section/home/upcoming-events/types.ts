// components/public-section/home/upcoming-events/types.ts

import type { EventSummary } from '@/services';

export type UpcomingEventsTabKey = 'all' | 'today' | 'week' | 'workshop' | 'nearby';

export interface UpcomingEventsTab {
  key: UpcomingEventsTabKey;
  label: string;
  hint: string;
}

export interface UpcomingEventsProps {
  className?: string;
  events: EventSummary[];
  isLoading?: boolean;
}
