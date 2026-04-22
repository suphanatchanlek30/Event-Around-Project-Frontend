"use client";

import { useState } from "react";
import MapCard from "./map-card";

type Event = {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
};

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Tech Talk: Future of AI in Design",
    date: "พรุ่งนี้ เวลา 18:00 น.",
    imageUrl:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  },
  {
    id: 2,
    title: "Food Market",
    date: "พรุ่งนี้ เวลา 18:00 น.",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
];

export function MapCardList() {
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

        {mockEvents.map((event) => (
          <MapCard
            key={event.id}
            event={event}
            isBookmarked={bookmarked.includes(event.id)}
            onToggleBookmark={toggleBookmark}
          />
        ))}

      </div>
    </div>
  );
}