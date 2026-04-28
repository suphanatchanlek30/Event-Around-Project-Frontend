"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Heart, MapPin, MonitorPlay, Share2 } from "lucide-react";

import { formatThaiDateTime } from "@/lib/thai-datetime";
import {
  EventDetail as EventDetailData,
  checkSavedEvent,
  getEventDetail,
  saveEvent,
  unsaveEvent,
} from "@/services";

const EventLocationMap = dynamic(() => import("@/components/public-section/events/EventLocationMap"), {
  ssr: false,
});

type EventDetailProps = {
  eventId: number;
};

const formatDate = (dateString: string) => {
  return formatThaiDateTime(dateString, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (dateString: string) => {
  return formatThaiDateTime(dateString, {
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
  const [isSaving, setIsSaving] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState("");

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

  useEffect(() => {
    const syncSavedStatus = async () => {
      try {
        const response = await checkSavedEvent(eventId);
        setEvent((prev) => (prev ? { ...prev, isSaved: response.data.isSaved } : prev));
      } catch {
        // saved check is available for student only; ignore when not applicable
      }
    };

    syncSavedStatus();
  }, [eventId]);

  const handleToggleSave = async () => {
    if (!event || isSaving) {
      return;
    }

    try {
      setIsSaving(true);
      setSaveFeedback("");

      if (event.isSaved) {
        await unsaveEvent(event.eventId);
        setEvent((prev) =>
          prev
            ? {
                ...prev,
                isSaved: false,
                savedCount: Math.max((prev.savedCount ?? 0) - 1, 0),
              }
            : prev,
        );
        setSaveFeedback("ยกเลิกบันทึกกิจกรรมแล้ว");
      } else {
        await saveEvent({ eventId: event.eventId });
        setEvent((prev) =>
          prev
            ? {
                ...prev,
                isSaved: true,
                savedCount: (prev.savedCount ?? 0) + 1,
              }
            : prev,
        );
        setSaveFeedback("บันทึกกิจกรรมเรียบร้อยแล้ว");
      }
    } catch (error) {
      const status =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (error as { response?: { status?: number } }).response?.status
          : undefined;
      if (status === 401 || status === 403) {
        setSaveFeedback("เฉพาะบัญชีนักศึกษาที่ล็อกอินแล้วเท่านั้น");
      } else {
        setSaveFeedback("บันทึกกิจกรรมไม่สำเร็จ");
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center text-muted">กำลังโหลดรายละเอียดกิจกรรม...</div>;
  }

  if (!event) {
    return <div className="p-10 text-center text-rose-600">{errorMessage || "ไม่พบกิจกรรม"}</div>;
  }

  const hasCoordinates =
    typeof event.latitude === "number" && Number.isFinite(event.latitude) &&
    typeof event.longitude === "number" && Number.isFinite(event.longitude);
  const googleMapsUrl = hasCoordinates
    ? `https://www.google.com/maps?q=${event.latitude},${event.longitude}`
    : "";

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
            <button
              type="button"
              disabled={isSaving}
              onClick={handleToggleSave}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-70"
            >
              <Heart className={`w-4 h-4 ${event.isSaved ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        {event.coverImageUrl ? (
          <img
            src={event.coverImageUrl}
            alt={event.title}
            className="h-full w-full object-cover object-center"
          />
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
                {event.status === "CANCELLED" && event.cancelReason ? (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-rose-700">
                    เหตุผลการยกเลิก: {event.cancelReason}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-full lg:w-[320px] shrink-0">
              <div className="bg-[#f8f9fa] rounded-3xl p-6 border border-[#eef0f4]">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleToggleSave}
                  className="w-full py-3.5 bg-primary hover:bg-primary/90 transition-colors text-white rounded-2xl text-[15px] font-bold mb-3 shadow-[0_4px_12px_rgba(67,56,202,0.2)] disabled:opacity-70"
                >
                  {isSaving ? "กำลังบันทึก..." : event.isSaved ? "ยกเลิกบันทึกกิจกรรม" : "บันทึกกิจกรรมนี้"}
                </button>
                <div className="text-center text-[11px] text-muted font-medium mb-6">มีผู้สนใจ {event.savedCount || 0} คน</div>
                {saveFeedback ? <p className="mb-4 text-center text-xs text-muted">{saveFeedback}</p> : null}

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
                      {hasCoordinates ? (
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex rounded-lg border border-indigo-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-50"
                        >
                          เปิดใน Google Maps
                        </a>
                      ) : (
                        <span className="mt-2 inline-flex text-[11px] text-slate-400">ยังไม่มีพิกัดแผนที่</span>
                      )}
                    </div>
                  </div>
                </div>

                {hasCoordinates ? (
                  <EventLocationMap
                    latitude={event.latitude as number}
                    longitude={event.longitude as number}
                    title={event.title}
                    locationName={event.locationName}
                  />
                ) : (
                  <div className="mt-6 flex h-36 items-center justify-center rounded-2xl border border-[#eef0f4] bg-surface-muted text-xs text-muted">
                    ไม่มีพิกัดสำหรับแสดงแผนที่
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
