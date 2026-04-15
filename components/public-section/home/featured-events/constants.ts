// components/public-section/home/featured-events/constants.ts

import { FeaturedEventsData } from './types';

export const FEATURED_EVENTS: FeaturedEventsData = {
  spotlight: {
    id: 'music-festival-2024',
    category: 'ENTERTAINMENT',
    title: 'Main Stage Music Festival 2024',
    timeRange: '18:00 - 23:00',
    location: 'Central Quad',
    dateLabel: 'ก.ย. 24',
  },
  highlights: [
    {
      id: 'tech-career-fair',
      category: 'CAREER',
      title: 'Tech Career Fair: Meet the Giants',
      description: 'Connect with top engineering firms looking for interns and graduates.',
      timeRange: 'พรุ่งนี้ • 10:00 AM',
      dateLabel: 'SEP 24',
    },
    {
      id: 'ai-ethics-seminar',
      category: 'ACADEMIC',
      title: 'AI Ethics Seminar with Dr. Sarah Chen',
      description: 'A deep dive into the future of LLMs and societal impact.',
      timeRange: '02 ธ.ค. • 2:30 PM',
      dateLabel: 'OCT 02',
    },
  ],
};
