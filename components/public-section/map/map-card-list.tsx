"use client";

import { Calendar } from "lucide-react";

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
  {
    id: 3,
    title: "Tech Meetup",
    date: "พรุ่งนี้ เวลา 18:00 น.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72",
  }
];

export function MapCardList() {
  return (
    <div className="w-full px-4 pb-4">
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth">

        {mockEvents.map((event) => (
          <div
            key={event.id}
            className="min-w-[260px] snap-start bg-white rounded-2xl shadow-md overflow-hidden flex-shrink-0 active:scale-95 transition"
          >
            {/*image*/}
            <div className="h-28 w-full overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/*content*/}
            <div className="p-3 flex  flex-col">
              <div>
                <div className="text-sm font-semibold text-black">
                  {event.title}
                </div>

                {/*date*/}
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Calendar size={14} className="text black" />
                    {event.date}
                </div>
              </div>
              
              {/*button*/}
              <div className="mt-2 flex justify-end">
                <div className="text-xs text-[#4338ca] font-medium border border-[#4338ca] rounded-full px-3 py-1">
                  รายละเอียด
                </div>
              </div>
              
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}