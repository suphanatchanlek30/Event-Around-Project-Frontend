"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Heart, MapPin, MonitorPlay, Share2 } from "lucide-react";

import { EventDetail as EventDetailData, getEventDetail } from "@/services";

type EventDetailProps = {
  eventId: number;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function EventDetail({ eventId }: EventDetailProps) {
  const router = useRouter();
  const [event, setEvent] = useState<EventDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDetail = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const response = await getEventDetail(eventId);
        setEvent(response.data);
      } catch {
        setErrorMessage("ไม่สามารถโหลดรายละเอียดกิจกรรมได้");
      } finally {
        setIsLoading(false);
      }
    };

    loadDetail();
  }, [eventId]);

  if (isLoading) {
    return <div className="p-10 text-center text-muted">กำลังโหลดรายละเอียดกิจกรรม...</div>;
  }

  if (!event) {
    return <div className="p-10 text-center text-rose-600">{errorMessage || "ไม่พบกิจกรรม"}</div>;
  }

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pb-24 md:pb-0">
      <div className="h-75 md:h-100 bg-linear-to-b from-[#1c1c28] to-[#12121a] relative flex items-center justify-center">
        <div className="absolute top-4 w-full px-4 flex justify-between items-center z-20">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Heart className={`w-4 h-4 ${event.isSaved ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        {event.coverImageUrl ? (
          <img src={event.coverImageUrl} alt={event.title} className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/70">ไม่มีรูปหน้าปก</div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-8 z-10">
        <div className="bg-white rounded-t-3xl md:rounded-3xl p-6 md:p-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-lg min-h-125">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary text-white px-3.5 py-1.5 rounded-full text-[11px] font-semibold">
                  {event.category?.name || "ทั่วไป"}
                </span>
                <span className="bg-surface-muted text-foreground px-3.5 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {event.status}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#1a1b26] leading-snug">{event.title}</h1>

              <div className="bg-surface-muted rounded-2xl p-4 flex items-center gap-4 mb-8 w-fit pr-8">
                <div className="w-10 h-10 bg-[#1e293b] rounded-xl flex items-center justify-center text-white">
                  <MonitorPlay className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-[11px] text-muted font-medium mb-0.5">ผู้จัดงาน</div>
                  <div className="text-sm font-bold text-foreground">{event.organizer?.fullName || "Event Around"}</div>
                </div>
              </div>

              <div className="space-y-4 text-[14px] text-muted leading-relaxed font-medium">
                <p>{event.shortDescription || ""}</p>
                <p>{event.description}</p>
              </div>
            </div>

            <div className="w-full lg:w-[320px] shrink-0">
              <div className="bg-[#f8f9fa] rounded-3xl p-6 border border-[#eef0f4]">
                <button className="w-full py-3.5 bg-primary hover:bg-primary/90 transition-colors text-white rounded-2xl text-[15px] font-bold mb-3 shadow-[0_4px_12px_rgba(67,56,202,0.2)]">
                  ลงทะเบียนตอนนี้
                </button>
                <div className="text-center text-[11px] text-muted font-medium mb-6">มีผู้สนใจ {event.savedCount || 0} คน</div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#eef0f4] flex items-center justify-center shrink-0 shadow-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-foreground mb-0.5">{formatDate(event.startTime)}</div>
                      <div className="text-[11px] text-muted leading-snug">{formatTime(event.startTime)} - {formatTime(event.endTime)} น.</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#eef0f4] flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-foreground mb-0.5">{event.locationName}</div>
                      <div className="text-[11px] text-muted leading-snug">Lat {event.latitude || "-"}, Lng {event.longitude || "-"}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-30 bg-linear-to-br from-[#e0e7ff] to-[#f3f4f6] rounded-2xl relative overflow-hidden flex items-center justify-center border border-[#eef0f4]">
                  <div className="absolute inset-0 bg-[#e5e7eb] opacity-50" />
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center z-10 shadow-lg shadow-red-500/30">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
