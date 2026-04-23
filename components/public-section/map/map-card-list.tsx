"use client";

import { useState } from "react";
import MapCard from "./map-card";

type Event = {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  distance: string;
};

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Tech Talk: Future of AI in Design",
    date: "พรุ่งนี้ เวลา 18:00 น.",
    imageUrl:
      "https://i.pinimg.com/control1/736x/10/bc/bd/10bcbdc51fdacda178fbf70267e19251.jpg",
    distance: "0.8 กม.",
  },
  {
    id: 2,
    title: "Acoustic Garden Session",
    date: "พรุ่งนี้ เวลา 18:00 น.",
    imageUrl:
      "https://i.pinimg.com/736x/69/d4/f5/69d4f553a801270cc080e78402855353.jpg",
    distance: "1.2 กม.",
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