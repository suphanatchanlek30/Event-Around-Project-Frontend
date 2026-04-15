// components/public-section/home/upcoming-events/types.ts

export type UpcomingEventsTabKey = 'all' | 'today' | 'week' | 'workshop' | 'nearby';

export interface UpcomingEventItem {
  id: string;
  category: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  accent: 'violet' | 'emerald' | 'amber' | 'cyan' | 'rose';
}

export interface UpcomingEventsTab {
  key: UpcomingEventsTabKey;
  label: string;
  hint: string;
}

export interface UpcomingEventsProps {
  className?: string;
}
