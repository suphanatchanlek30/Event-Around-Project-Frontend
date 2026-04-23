// components/public-section/home/featured-events/types.ts

import type { EventSummary } from '@/services';

export interface FeaturedEventItem {
  id: string;
  category: string;
  title: string;
  description?: string;
  timeRange: string;
  location?: string;
  dateLabel: string;
}

export interface FeaturedEventsData {
  spotlight: FeaturedEventItem;
  highlights: FeaturedEventItem[];
}

export interface FeaturedEventsProps {
  className?: string;
  events: EventSummary[];
  isLoading?: boolean;
}
