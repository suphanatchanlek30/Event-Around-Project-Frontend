"use client";

import { Calendar, Bookmark } from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  distance: string;
};

type Props = {
  event: Event;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
};

export default function MapCard({
  event,
  isBookmarked,
  onToggleBookmark,
}: Props) {
  return (
    <div className="min-w-[260px] w-[260px] snap-start bg-white rounded-2xl shadow-md overflow-hidden flex-shrink-0 transition">

      {/* image */}
      <div className="h-28 w-full overflow-hidden relative">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-2 left-2 bg-white text-[#4338ca] text-[10px] px-2 py-1 rounded-full font-semibold">
          ห่างออกไป {event.distance}
        </div>
      </div>

      {/* content */}
      <div className="p-3 flex flex-col min-h-[120px]">

        {/* title + bookmark */}
        <div className="grid grid-cols-[1fr_auto] gap-2 items-start w-full min-w-0">

          <div className="text-sm font-semibold text-black leading-snug min-w-0 break-words">
            {event.title}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(event.id);
            }}
            className="p-1 rounded-full hover:bg-gray-100 transition shrink-0"
          >
            <Bookmark
              size={16}
              className={
                isBookmarked
                  ? "text-[#4338ca] fill-[#4338ca]"
                  : "text-[#4338ca]"
              }
            />
          </button>

        </div>

        {/* date */}
        <div className="text-xs text-gray-500 mt-1 flex items-center gap-1 ">
          <Calendar size={14} className="text-black" />
          {event.date}
        </div>

        {/* button */}
        <div className="mt-auto flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("open detail", event.id);
            }}
            className="text-xs bg-[#4338ca] text-white font-medium rounded-full px-3 py-1 hover:bg-[#372fb0] transition-colors"
          >
            รายละเอียด
          </button>
        </div>

      </div>
    </div>
  );
}