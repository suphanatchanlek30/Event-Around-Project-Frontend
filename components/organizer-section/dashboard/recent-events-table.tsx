"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiFilter, FiSearch } from "react-icons/fi";

import { EventSummary, getMyEvents } from "@/services";

const getStatusClassName = (status: string) => {
  if (status === "PUBLISHED") return "bg-emerald-100 text-emerald-700";
  if (status === "CANCELLED") return "bg-rose-100 text-rose-700";
  return "bg-slate-200 text-slate-600";
};

const getStatusLabel = (status: string) => {
  if (status === "PUBLISHED") return "เผยแพร่แล้ว";
  if (status === "CANCELLED") return "ยกเลิก";
  return "ฉบับร่าง";
};

const formatDate = (dateTime: string) => {
  return new Date(dateTime).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const RecentEventsTable = () => {
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setIsLoading(true);
        const response = await getMyEvents({
          page: 1,
          pageSize: 5,
          sortBy: "startTime",
          sortOrder: "desc",
        });
        setEvents(response.data);
      } catch {
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecent();
  }, []);

  return (
    <section className="rounded-2xl bg-surface border border-border shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">กิจกรรมล่าสุด</h2>
        <div className="flex items-center gap-2 text-muted">
          <button
            type="button"
            className="w-8 h-8 rounded-full hover:bg-surface-muted flex items-center justify-center"
            aria-label="ตัวกรอง"
          >
            <FiFilter />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full hover:bg-surface-muted flex items-center justify-center"
            aria-label="ค้นหา"
          >
            <FiSearch />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-190 w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted">
              <th className="pb-2">ชื่ออีเวนต์</th>
              <th className="pb-2">สถานะ</th>
              <th className="pb-2">วันที่</th>
              <th className="pb-2">บันทึก</th>
              <th className="pb-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-sm text-muted">
                  กำลังโหลด...
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-sm text-muted">
                  ยังไม่มีกิจกรรม
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.eventId} className="bg-surface-muted/60 rounded-xl">
                  <td className="p-3 rounded-l-xl">
                    <p className="font-semibold text-foreground leading-tight">{event.title}</p>
                    <p className="text-sm text-muted mt-1">{event.locationName ?? "—"}</p>
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClassName(event.status)}`}
                    >
                      {getStatusLabel(event.status)}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-foreground">{formatDate(event.startTime)}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold">
                      <FaHeart className="text-sm" />
                      {(event.savedCount ?? 0).toLocaleString("en-US")}
                    </span>
                  </td>
                  <td className="p-3 rounded-r-xl">
                    <Link
                      href={`/organizer/events`}
                      className="text-sm font-semibold text-link hover:underline"
                    >
                      ดูรายละเอียด
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-border text-center">
        <Link href="/organizer/events" className="text-sm font-semibold text-link hover:underline">
          ดูอีเวนต์ทั้งหมด
        </Link>
      </div>
    </section>
  );
};

