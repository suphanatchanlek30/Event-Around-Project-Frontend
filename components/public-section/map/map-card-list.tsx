"use client";

import { useEffect, useState } from "react";
import MapCard from "./map-card";
import { checkSavedEvent, saveEvent, unsaveEvent, type NearbyEventSummary } from "@/services";

type MapCardListProps = {
  events: NearbyEventSummary[];
  isLoading: boolean;
};

export function MapCardList({ events, isLoading }: MapCardListProps) {
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    const syncBookmarks = async () => {
      if (events.length === 0) {
        setBookmarked([]);
        return;
      }

      const checks = await Promise.allSettled(events.map((event) => checkSavedEvent(event.eventId)));
      const savedIds = checks
        .map((result, index) => (result.status === "fulfilled" && result.value.data.isSaved ? events[index].eventId : null))
        .filter((id): id is number => id !== null);
      setBookmarked(savedIds);
    };

    syncBookmarks();
  }, [events]);

  const toggleBookmark = async (eventId: number) => {
    if (processingId === eventId) {
      return;
    }

    try {
      setProcessingId(eventId);
      const currentlySaved = bookmarked.includes(eventId);

      if (currentlySaved) {
        await unsaveEvent(eventId);
        setBookmarked((prev) => prev.filter((id) => id !== eventId));
      } else {
        await saveEvent({ eventId });
        setBookmarked((prev) => [...prev, eventId]);
      }
    } catch {
      // ignore when role is not student or unauthenticated
    } finally {
      setProcessingId(null);
    }
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
              isProcessing={processingId === event.eventId}
              onToggleBookmark={toggleBookmark}
            />
          ))
        )}
      </div>
    </div>
  );
}