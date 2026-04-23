// components/public-section/home/featured-events/types.ts

import type { EventSummary } from '@/services';

export interface FeaturedEventsProps {
  className?: string;
  events: EventSummary[];
  isLoading?: boolean;
}
