"use client";

import { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

import { EventSummary, cancelEvent, getPublicEvents, publishEvent } from "@/services";

const formatDate = (dateTime: string) =>
  new Date(dateTime).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const AdminApprovalsPage = () => {
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [processingId, setProcessingId] = useState<number | null>(null);

  const loadPendingEvents = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await getPublicEvents({
        page: 1,
        pageSize: 50,
        status: "DRAFT",
        sortBy: "startTime",
        sortOrder: "asc",
      });
      setEvents(response.data);
    } catch (error) {
      const msg =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (error as { response?: { data?: { message?: string }; status?: number } }).response?.data?.message ??
            `HTTP ${(error as { response?: { status?: number } }).response?.status ?? "error"}`
          : "โหลดรายการรออนุมัติไม่สำเร็จ";
      setErrorMessage(msg);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPendingEvents();
  }, []);

  const handleApprove = async (eventId: number) => {
    try {
      setProcessingId(eventId);
      setErrorMessage("");
      setSuccessMessage("");
      const response = await publishEvent(eventId);
      setSuccessMessage(response.message || "อนุมัติและเผยแพร่กิจกรรมสำเร็จ");
      await loadPendingEvents();
    } catch {
      setErrorMessage("อนุมัติกิจกรรมไม่สำเร็จ");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (eventId: number) => {
    const reason = window.prompt("ระบุเหตุผลการปฏิเสธกิจกรรม");
    if (!reason?.trim()) return;

    try {
      setProcessingId(eventId);
      setErrorMessage("");
      setSuccessMessage("");
      const response = await cancelEvent(eventId, { reason: reason.trim() });
      setSuccessMessage(response.message || "ปฏิเสธกิจกรรมสำเร็จ");
      await loadPendingEvents();
    } catch {
      setErrorMessage("ปฏิเสธกิจกรรมไม่สำเร็จ");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8">
      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">อีเวนต์รออนุมัติ</h1>
            <p className="text-sm md:text-base text-muted mt-1">
              ตรวจสอบข้อมูลก่อนอนุมัติให้เผยแพร่หรือปฏิเสธ
            </p>
          </div>
          <button
            type="button"
            onClick={loadPendingEvents}
            className="h-10 px-4 rounded-xl border border-border text-sm font-semibold self-start md:self-auto"
          >
            รีเฟรช
          </button>
        </div>

        {errorMessage ? <p className="mb-4 text-sm text-rose-700">{errorMessage}</p> : null}
        {successMessage ? <p className="mb-4 text-sm text-emerald-700">{successMessage}</p> : null}

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-200 w-full">
            <thead className="bg-surface-muted/70">
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">ชื่อกิจกรรม</th>
                <th className="px-4 py-3">ผู้จัด</th>
                <th className="px-4 py-3">หมวดหมู่</th>
                <th className="px-4 py-3">วันที่เริ่ม</th>
                <th className="px-4 py-3">สถานะ</th>
                <th className="px-4 py-3">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted">กำลังโหลด...</td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted">ไม่มีรายการรออนุมัติในขณะนี้</td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.eventId} className="border-t border-border text-sm">
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="h-14 w-22 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
                          {event.coverImageUrl ? (
                            <img
                              src={event.coverImageUrl}
                              alt={event.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-muted">
                              ไม่มีรูป
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{event.title}</p>
                          <p className="mt-1 line-clamp-2 text-xs text-muted">
                            {event.shortDescription || "ไม่มีคำอธิบายสั้น"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted">{event.organizer?.fullName || "-"}</td>
                    <td className="px-4 py-4 text-foreground">{event.category?.name || "-"}</td>
                    <td className="px-4 py-4 text-muted">{formatDate(event.startTime)}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex px-2 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-700">
                        {event.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={processingId === event.eventId}
                          onClick={() => handleApprove(event.eventId)}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold disabled:opacity-60"
                        >
                          <FiCheckCircle />
                          อนุมัติ
                        </button>
                        <button
                          type="button"
                          disabled={processingId === event.eventId}
                          onClick={() => handleReject(event.eventId)}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-rose-600 text-white text-xs font-semibold disabled:opacity-60"
                        >
                          <FiXCircle />
                          ไม่อนุมัติ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
