"use client";

import { Calendar, Bookmark } from "lucide-react";
import Link from "next/link";

import type { MapEventSummary } from "@/services";

type Props = {
  event: MapEventSummary;
  isBookmarked: boolean;
  onToggleBookmark: (eventId: number) => void;
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("th-TH", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function MapCard({
  event,
  isBookmarked,
  onToggleBookmark,
}: Props) {
  return (
    <div className="min-w-65 w-65 snap-start bg-white rounded-2xl shadow-md overflow-hidden shrink-0 transition">

      <div className="h-28 w-full overflow-hidden relative">
        {event.coverImageUrl ? (
          <img
            src={event.coverImageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-indigo-100 to-cyan-100 text-xs font-semibold text-indigo-700">
            ไม่มีรูปหน้าปก
          </div>
        )}

        <div className="absolute top-2 left-2 bg-white text-[#4338ca] text-[10px] px-2 py-1 rounded-full font-semibold">
          ห่างออกไป {event.distanceKm ? `${event.distanceKm.toFixed(2)} กม.` : "-"}
        </div>
      </div>

      <div className="p-3 flex min-h-30 flex-col">
        <div className="grid grid-cols-[1fr_auto] gap-2 items-start w-full min-w-0">
          <div className="text-sm font-semibold text-black leading-snug min-w-0 wrap-break-word">
            {event.title}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(event.eventId);
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

        <div className="text-xs text-gray-500 mt-1 flex items-center gap-1 ">
          <Calendar size={14} className="text-black" />
          {formatDateTime(event.startTime)}
        </div>

        <div className="mt-1 text-xs text-gray-500 line-clamp-1">
          {event.locationName || "ยังไม่ระบุสถานที่"}
        </div>

        <div className="mt-auto flex justify-end">
          <Link
            href={`/events/${event.eventId}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-xs bg-[#4338ca] text-white font-medium rounded-full px-3 py-1 hover:bg-[#372fb0] transition-colors"
          >
            รายละเอียด
          </Link>
        </div>

      </div>
    </div>
  );
}