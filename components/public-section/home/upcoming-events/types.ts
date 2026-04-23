// components/public-section/home/upcoming-events/types.ts

import type { EventSummary } from '@/services';

export type UpcomingEventsTabKey = 'all' | 'today' | 'week' | 'workshop' | 'nearby';

export interface UpcomingEventsTab {
  key: UpcomingEventsTabKey;
  label: string;
  hint: string;
}

export interface UpcomingEventItem {
  id: string;
  category: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  accent: 'amber' | 'cyan' | 'violet' | 'emerald' | 'rose' | string;
}

export interface UpcomingEventsProps {
  className?: string;
  events: EventSummary[];
  isLoading?: boolean;
}
