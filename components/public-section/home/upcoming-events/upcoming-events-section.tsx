// components/public-section/home/upcoming-events/upcoming-events-section.tsx

'use client';

import { useMemo, useState } from 'react';
import { UpcomingEventCard } from './upcoming-event-card';
import { UPCOMING_EVENT_ITEMS, UPCOMING_EVENTS_TABS } from './constants';
import { UpcomingEventsProps, UpcomingEventsTabKey } from './types';

export const UpcomingEventsSection = ({ className = '' }: UpcomingEventsProps) => {
  const [activeTab, setActiveTab] = useState<UpcomingEventsTabKey>('all');

  const events = useMemo(() => {
    return UPCOMING_EVENT_ITEMS[activeTab];
  }, [activeTab]);

  return (
    <section className={`mt-6 md:mt-8 ${className}`}>
      <div className="mb-3 md:mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl md:text-[2rem] font-semibold text-foreground">กิจกรรมที่กำลังจะมาถึง</h3>
          <p className="mt-1 text-sm md:text-base text-muted">เลือกดูตามช่วงเวลาหรือประเภทกิจกรรม</p>
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {UPCOMING_EVENTS_TABS.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-surface text-muted border border-border hover:bg-surface-muted'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:overflow-visible lg:pb-0 lg:gap-4">
        {events.map((event) => (
          <div key={event.id} className="min-w-[18rem] sm:min-w-[22rem] lg:min-w-0 lg:h-full">
            <UpcomingEventCard event={event} />
          </div>
        ))}
      </div>
    </section>
  );
};
