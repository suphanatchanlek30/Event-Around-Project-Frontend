"use client";

import { useState } from "react";
import MapCard from "./map-card";
import type { NearbyEventSummary } from "@/services";

type MapCardListProps = {
  events: NearbyEventSummary[];
  isLoading: boolean;
};

export function MapCardList({ events, isLoading }: MapCardListProps) {
  const [bookmarked, setBookmarked] = useState<number[]>([]);

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-full px-4 pb-6">
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth">
        {isLoading ? (
          <div className="rounded-2xl bg-white/95 px-4 py-6 text-sm text-muted shadow-md">
            กำลังโหลดกิจกรรมใกล้คุณ...
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl bg-white/95 px-4 py-6 text-sm text-muted shadow-md">
            ไม่พบกิจกรรมในตำแหน่งนี้
          </div>
        ) : (
          events.map((event) => (
            <MapCard
              key={event.eventId}
              event={event}
              isBookmarked={bookmarked.includes(event.eventId)}
              onToggleBookmark={toggleBookmark}
            />
          ))
        )}
      </div>
    </div>
  );
}