// components/public-section/home/upcoming-events/upcoming-events-section.tsx

'use client';

import { useMemo, useState } from 'react';
import { UpcomingEventCard } from './upcoming-event-card';
import { UPCOMING_EVENTS_TABS } from './constants';
import { UpcomingEventsProps, UpcomingEventsTabKey } from './types';

const isSameDay = (left: Date, right: Date) => {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
};

export const UpcomingEventsSection = ({ className = '', events, isLoading = false }: UpcomingEventsProps) => {
  const [activeTab, setActiveTab] = useState<UpcomingEventsTabKey>('all');

  const filteredEvents = useMemo(() => {
    const now = new Date();
    const weekAhead = new Date();
    weekAhead.setDate(now.getDate() + 7);

    if (activeTab === 'today') {
      return events.filter((event) => isSameDay(new Date(event.startTime), now));
    }

    if (activeTab === 'week') {
      return events.filter((event) => {
        const start = new Date(event.startTime);
        return start >= now && start <= weekAhead;
      });
    }

    if (activeTab === 'workshop') {
      return events.filter((event) => {
        const category = event.category?.name?.toLowerCase() || '';
        return category.includes('workshop') || category.includes('เวิร์ก');
      });
    }

    if (activeTab === 'nearby') {
      return events.filter((event) => Boolean(event.locationName));
    }

    return events;
  }, [activeTab, events]);

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

      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:overflow-visible lg:pb-0 lg:gap-4">
        {isLoading ? (
          <div className="rounded-2xl border border-border bg-surface px-4 py-6 text-sm text-muted">
            กำลังโหลดกิจกรรมที่กำลังจะมาถึง...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface px-4 py-6 text-sm text-muted">
            ไม่พบกิจกรรมตามตัวกรองที่เลือก
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.eventId} className="min-w-[18rem] sm:min-w-88 lg:min-w-0 lg:h-full">
              <UpcomingEventCard event={event} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};
