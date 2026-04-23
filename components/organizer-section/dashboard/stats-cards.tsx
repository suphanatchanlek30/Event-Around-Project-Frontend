"use client";

import { useEffect, useState } from "react";
import { FaBan, FaCheckCircle, FaFileAlt, FaHeart, FaSignal } from "react-icons/fa";

import { OrganizerDashboardSummary, getOrganizerDashboard } from "@/services";

type StatCard = {
  id: string;
  label: string;
  value: number | null;
  tone: "primary" | "success" | "muted" | "danger";
  hint: string;
};

const getToneClass = (tone: StatCard["tone"]) => {
  if (tone === "danger") return "bg-rose-100 text-rose-700";
  if (tone === "success") return "bg-emerald-100 text-emerald-700";
  if (tone === "muted") return "bg-slate-100 text-slate-600";
  return "bg-indigo-100 text-indigo-600";
};

const getIcon = (id: string) => {
  if (id === "published") return <FaCheckCircle className="text-emerald-500" />;
  if (id === "draft") return <FaFileAlt className="text-slate-400" />;
  if (id === "cancelled") return <FaBan className="text-rose-500" />;
  if (id === "saved") return <FaHeart className="text-indigo-500" />;
  return <FaSignal className="text-indigo-500" />;
};

const STAT_DEFS: Omit<StatCard, "value">[] = [
  { id: "total", label: "กิจกรรมทั้งหมด", tone: "primary", hint: "ภาพรวมทั้งหมด" },
  { id: "published", label: "เผยแพร่แล้ว", tone: "success", hint: "พร้อมเข้าชม" },
  { id: "draft", label: "ฉบับร่าง", tone: "muted", hint: "ยังไม่เผยแพร่" },
  { id: "cancelled", label: "ยกเลิกแล้ว", tone: "danger", hint: "ปิดกิจกรรม" },
  { id: "saved", label: "ยอดบันทึกทั้งหมด", tone: "primary", hint: "ความสนใจรวม" },
];

export const StatsCards = () => {
  const [stats, setStats] = useState<OrganizerDashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [statMap, setStatMap] = useState<Record<string, number | null>>({
    total: null,
    published: null,
    draft: null,
    cancelled: null,
    saved: null,
  });

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const response = await getOrganizerDashboard();
        setStats(response.data);
        setStatMap({
          total: response.data.totalEvents,
          published: response.data.publishedEvents,
          draft: response.data.draftEvents,
          cancelled: response.data.cancelledEvents,
          saved: response.data.totalSavedCount,
        });
      } catch (error) {
        const status =
          typeof error === "object" &&
          error !== null &&
          "response" in error
            ? (error as { response?: { status?: number } }).response?.status
            : undefined;
        if (status === 401 || status === 403) {
          setErrorMessage("ไม่มีสิทธิ์เข้าถึงข้อมูลแดชบอร์ดผู้จัดกิจกรรม");
        } else {
          setErrorMessage("โหลดสรุปแดชบอร์ดไม่สำเร็จ");
        }
        setStats(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  return (
    <section className="space-y-3">
      {errorMessage ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {errorMessage}
        </p>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 md:gap-4">
      {STAT_DEFS.map((def) => (
        <article
          key={def.id}
          className="rounded-2xl bg-surface border border-border p-4 md:p-5 shadow-sm min-h-34"
        >
          <p className="text-xs md:text-sm font-medium uppercase tracking-wide text-muted mb-2">
            {def.label}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-4xl md:text-5xl font-bold text-foreground">
              {isLoading ? "…" : statMap[def.id] === null ? "—" : statMap[def.id]}
            </p>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getToneClass(def.tone)}`}>
                {def.hint}
              </span>
              <span className="text-base">{getIcon(def.id)}</span>
            </div>
          </div>
        </article>
      ))}
      </div>
    </section>
  );
};
