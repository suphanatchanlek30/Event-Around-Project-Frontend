"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Clock, Heart, MapPin } from "lucide-react";

import { checkSavedEvent, saveEvent, unsaveEvent, type EventSummary } from "@/services";

type EventCardProps = {
  event: EventSummary;
  isSelected?: boolean;
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("th-TH", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function EventCard({ event, isSelected = false }: EventCardProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(Boolean(event.isSaved));
  const [isTogglingSave, setIsTogglingSave] = useState(false);

  useEffect(() => {
    const syncSavedStatus = async () => {
      try {
        const response = await checkSavedEvent(event.eventId);
        setIsSaved(response.data.isSaved);
      } catch {
        // not student or not logged in
      }
    };

    syncSavedStatus();
  }, [event.eventId]);

  const handleToggleSave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isTogglingSave) {
      return;
    }

    try {
      setIsTogglingSave(true);
      if (isSaved) {
        await unsaveEvent(event.eventId);
        setIsSaved(false);
      } else {
        await saveEvent({ eventId: event.eventId });
        setIsSaved(true);
      }
    } catch {
      // silent fail in card context
    } finally {
      setIsTogglingSave(false);
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-3xl overflow-hidden shadow-sm cursor-pointer transition-all flex flex-col h-full ${
        isSelected
          ? "border-[1.5px] border-primary border-dashed"
          : "border-[1.5px] border-transparent hover:border-primary/20"
      }`}
      onClick={() => router.push(`/events/${event.eventId}`)}
    >
      <div className="h-50 bg-linear-to-b from-[#1c1c28] to-[#12121a] relative flex items-start justify-between p-4 shrink-0">
        {event.coverImageUrl ? (
          <img
            src={event.coverImageUrl}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#1f2937] to-[#0f172a] px-4 text-center text-[#dbeafe]">
            <p className="line-clamp-2 text-sm font-semibold tracking-wide">{event.title}</p>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20" />

        <span className="bg-primary text-white text-[11px] px-3.5 py-1.5 rounded-full font-semibold z-10 shadow-sm">
          {event.status}
        </span>
        <button
          type="button"
          disabled={isTogglingSave}
          className="bg-white/10 backdrop-blur-md rounded-full p-2.5 hover:bg-white/20 transition-colors z-10"
          onClick={handleToggleSave}
        >
          <Heart className={`h-4.5 w-4.5 text-white ${isSaved ? "fill-current" : ""}`} />
        </button>

        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white text-[11px] font-medium z-10">
          <Clock className="h-3.5 w-3.5" />
          {event.organizer?.fullName || "Event Around"}
        </div>
      </div>

      <div className="p-5 flex flex-col grow">
        <h3 className="text-[17px] font-medium text-[#1a1b26] mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-[13px] text-muted mb-4 line-clamp-2 leading-relaxed">
          {event.shortDescription || "ดูกิจกรรมและรายละเอียดเพิ่มเติม"}
        </p>

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-center justify-between text-[12px] text-muted">
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              {event.locationName || "ยังไม่ระบุสถานที่"}
            </span>
            <span className="shrink-0 text-[11px] font-medium">{event.category?.name || "ทั่วไป"}</span>
          </div>
          <div className="flex items-center text-[12px] text-muted mt-0.5">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
