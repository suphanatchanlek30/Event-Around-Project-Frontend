"use client";

import type { EventListMeta, EventSummary } from "@/services";

import EventCard from "./EventCard";

type EventListProps = {
  events: EventSummary[];
  isLoading: boolean;
  meta?: EventListMeta;
  onPageChange: (nextPage: number) => void;
};

export default function EventList({ events, isLoading, meta, onPageChange }: EventListProps) {
  return (
    <div className="w-full">
      {isLoading ? (
        <div className="rounded-2xl bg-white p-10 text-center text-muted">กำลังโหลดกิจกรรม...</div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center text-muted">ไม่พบกิจกรรมตามเงื่อนไขที่เลือก</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => (
            <EventCard key={event.eventId} event={event} isSelected={idx === 0} />
          ))}
        </div>
      )}

      {meta ? (
        <div className="flex flex-col items-center mt-10 mb-8 md:mb-12">
          <div className="flex items-center gap-2 bg-transparent">
            <button
              type="button"
              disabled={meta.page <= 1}
              onClick={() => onPageChange(meta.page - 1)}
              className="h-10 rounded-2xl bg-white px-4 text-sm font-medium text-muted disabled:opacity-50"
            >
              ก่อนหน้า
            </button>
            <span className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white">
              {meta.page} / {meta.totalPages}
            </span>
            <button
              type="button"
              disabled={meta.page >= meta.totalPages}
              onClick={() => onPageChange(meta.page + 1)}
              className="h-10 rounded-2xl bg-white px-4 text-sm font-medium text-muted disabled:opacity-50"
            >
              ถัดไป
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
