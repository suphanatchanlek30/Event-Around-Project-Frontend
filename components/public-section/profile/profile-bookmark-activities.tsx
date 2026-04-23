"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Bookmark } from "lucide-react";

import { SavedEventSummary, getSavedEvents, unsaveEvent } from "@/services";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("th-TH", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ProfileBookmarkActivities() {
    const [savedEvents, setSavedEvents] = useState<SavedEventSummary[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [processingId, setProcessingId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const loadSavedEvents = async (nextPage = page) => {
        try {
            setIsLoading(true);
            setErrorMessage("");
            const response = await getSavedEvents({
                page: nextPage,
                pageSize: 10,
                sortBy: "savedAt",
                sortOrder: "desc",
            });
            setSavedEvents(response.data);
            setTotalPages(response.meta?.totalPages || 1);
        } catch (error) {
            const status =
                typeof error === "object" &&
                error !== null &&
                "response" in error
                    ? (error as { response?: { status?: number } }).response?.status
                    : undefined;
            if (status === 401 || status === 403) {
                setErrorMessage("เฉพาะนักศึกษาที่ล็อกอินแล้วเท่านั้น");
            } else {
                setErrorMessage("โหลดรายการบันทึกไม่สำเร็จ");
            }
            setSavedEvents([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSavedEvents();
    }, [page]);

    const handleUnsave = async (eventId: number) => {
        try {
            setProcessingId(eventId);
            await unsaveEvent(eventId);
            await loadSavedEvents();
        } catch {
            setErrorMessage("ยกเลิกบันทึกไม่สำเร็จ");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="mt-8 w-full">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                    กิจกรรมที่บันทึกไว้
                </h2>

                <p className="text-sm text-gray-500">หน้า {page} / {totalPages}</p>
            </div>

            {errorMessage ? (
                <p className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {errorMessage}
                </p>
            ) : null}

            {/* List */}
            <div className="flex gap-4 overflow-x-auto pb-2">

                {isLoading ? (
                    <div className="rounded-xl bg-white px-4 py-6 text-sm text-gray-500 shadow-sm">
                        กำลังโหลดรายการบันทึก...
                    </div>
                ) : savedEvents.length === 0 ? (
                    <div className="rounded-xl bg-white px-4 py-6 text-sm text-gray-500 shadow-sm">
                        ยังไม่มีกิจกรรมที่บันทึกไว้
                    </div>
                ) : savedEvents.map((event) => (
                    <div
                        key={event.eventId}
                        className="relative min-w-55 bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                        {/* Bookmark icon */}
                        <button
                            type="button"
                            disabled={processingId === event.eventId}
                            onClick={() => handleUnsave(event.eventId)}
                            className="absolute top-2 right-2 bg-white/80 p-1 rounded-full shadow hover:scale-105 transition disabled:opacity-60"
                        >
                            <Bookmark size={16} className="text-indigo-600" />
                        </button>

                        {/* Image */}
                        {event.coverImageUrl ? (
                            <img
                                src={event.coverImageUrl}
                                alt={event.title}
                                className="h-32 w-full object-cover object-center"
                            />
                        ) : (
                            <div className="flex h-32 w-full items-center justify-center bg-slate-100 text-xs text-slate-500">
                                ไม่มีรูปหน้าปก
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-3 text-left">

                            {/*Date */}
                            <p className="text-xs text-medium text-indigo-600">
                                {formatDate(event.savedAt || event.startTime)}
                            </p>

                            {/*Title */}
                            <Link href={`/events/${event.eventId}`} className="mt-1 block font-semibold text-gray-800 text-sm leading-snug hover:underline">
                                {event.title}
                            </Link>

                            {/*Location */}
                            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={12} />
                                <span>{event.locationName || "ยังไม่ระบุสถานที่"}</span>
                            </div>

                        </div>
                    </div>
                ))}

            </div>

            <div className="mt-3 flex items-center justify-end gap-2">
                <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 disabled:opacity-50"
                >
                    ก่อนหน้า
                </button>
                <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 disabled:opacity-50"
                >
                    ถัดไป
                </button>
            </div>

        </div>
    );


}