// components/public-section/home/featured-events/types.ts

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
}
