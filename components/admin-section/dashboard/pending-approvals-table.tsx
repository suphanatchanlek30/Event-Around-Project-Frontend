"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

import { EventSummary, cancelEvent, getPublicEvents, publishEvent } from "@/services";

export const PendingApprovalsTable = () => {
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const loadPending = async () => {
    try {
      setIsLoading(true);
      const response = await getPublicEvents({
        page: 1,
        pageSize: 5,
        status: "DRAFT",
        sortBy: "startTime",
        sortOrder: "asc",
      });
      setEvents(response.data);
    } catch {
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  const handleApprove = async (eventId: number) => {
    try {
      setProcessingId(eventId);
      await publishEvent(eventId);
      await loadPending();
    } catch {
      // silently fail — user can see full error in /admin/approvals
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (eventId: number) => {
    const reason = window.prompt("ระบุเหตุผลการปฏิเสธ");
    if (!reason?.trim()) return;
    try {
      setProcessingId(eventId);
      await cancelEvent(eventId, { reason: reason.trim() });
      await loadPending();
    } catch {
      // silently fail
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <section className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-foreground">รายการรออนุมัติล่าสุด</h2>
        <Link href="/admin/approvals" className="text-sm font-semibold text-link hover:underline">
          ดูทั้งหมด
        </Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="min-w-180 w-full">
          <thead className="bg-surface-muted/70">
            <tr className="text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3">ชื่อกิจกรรม</th>
              <th className="px-4 py-3">ผู้จัด</th>
              <th className="px-4 py-3">หมวดหมู่</th>
              <th className="px-4 py-3">สถานะ</th>
              <th className="px-4 py-3">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted">กำลังโหลด...</td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted">ไม่มีรายการรออนุมัติ</td>
              </tr>
            ) : (
              events.map((item) => (
                <tr key={item.eventId} className="border-t border-border text-sm">
                  <td className="px-4 py-4 font-semibold text-foreground">{item.title}</td>
                  <td className="px-4 py-4 text-muted">{item.organizer?.fullName || "-"}</td>
                  <td className="px-4 py-4 text-foreground">{item.category?.name || "-"}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex px-2 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={processingId === item.eventId}
                        onClick={() => handleApprove(item.eventId)}
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold disabled:opacity-60"
                      >
                        <FiCheckCircle />
                        อนุมัติ
                      </button>
                      <button
                        type="button"
                        disabled={processingId === item.eventId}
                        onClick={() => handleReject(item.eventId)}
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-rose-600 text-white text-xs font-semibold disabled:opacity-60"
                      >
                        <FiXCircle />
                        ปฏิเสธ
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
