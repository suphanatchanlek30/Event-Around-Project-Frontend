'use client';

import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';
import { StatsCards } from './stats-cards';
import { RecentEventsTable } from './recent-events-table';

export const OrganizerDashboard = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 space-y-5 md:space-y-7">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">แดชบอร์ดผู้จัดกิจกรรม</h1>
          <p className="text-sm md:text-base text-muted mt-2">
            ยินดีต้อนรับกลับมาผู้จัดงาน นี่คือภาพรวมกิจกรรมของคุณในตอนนี้
          </p>
        </div>
        <Link
          href="/organizer/events"
          className="h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm md:text-base shadow-sm hover:opacity-95 inline-flex items-center justify-center gap-2 md:self-center"
        >
          <FaPlusCircle className="text-base" />
          สร้างอีเวนต์ใหม่
        </Link>
      </div>

      <StatsCards />
      <RecentEventsTable />
    </section>
  );
};
