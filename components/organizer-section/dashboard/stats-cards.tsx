"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaFileAlt, FaHeart, FaSignal } from "react-icons/fa";

import { EventStatus, getMyEvents } from "@/services";

type StatCard = {
  id: string;
  label: string;
  value: number | null;
  tone: "primary" | "success" | "warning" | "muted";
};

const getToneClass = (tone: StatCard["tone"]) => {
  if (tone === "success") return "bg-emerald-100 text-emerald-700";
  if (tone === "warning") return "bg-amber-100 text-amber-700";
  if (tone === "muted") return "bg-slate-100 text-slate-600";
  return "bg-indigo-100 text-indigo-600";
};

const getIcon = (id: string) => {
  if (id === "published") return <FaCheckCircle className="text-emerald-500" />;
  if (id === "draft") return <FaFileAlt className="text-slate-400" />;
  if (id === "pending") return <FaHeart className="text-amber-500" />;
  return <FaSignal className="text-indigo-500" />;
};

const STAT_DEFS: { id: string; label: string; status?: EventStatus; tone: StatCard["tone"] }[] = [
  { id: "total", label: "กิจกรรมทั้งหมด", tone: "primary" },
  { id: "published", label: "เผยแพร่แล้ว", status: "PUBLISHED", tone: "success" },
  { id: "draft", label: "ฉบับร่าง", status: "DRAFT", tone: "muted" },
  { id: "pending", label: "รอการอนุมัติ", status: "PENDING_APPROVAL", tone: "warning" },
];

export const StatsCards = () => {
  const [stats, setStats] = useState<Record<string, number | null>>({
    total: null,
    published: null,
    draft: null,
    pending: null,
  });

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.allSettled(
        STAT_DEFS.map((def) =>
          getMyEvents({ page: 1, pageSize: 1, status: def.status })
        )
      );

      setStats({
        total: results[0].status === "fulfilled" ? (results[0].value.meta?.totalItems ?? null) : null,
        published: results[1].status === "fulfilled" ? (results[1].value.meta?.totalItems ?? null) : null,
        draft: results[2].status === "fulfilled" ? (results[2].value.meta?.totalItems ?? null) : null,
        pending: results[3].status === "fulfilled" ? (results[3].value.meta?.totalItems ?? null) : null,
      });
    };

    fetchAll();
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
      {STAT_DEFS.map((def) => (
        <article
          key={def.id}
          className="rounded-2xl bg-surface border border-border p-4 md:p-5 shadow-sm"
        >
          <p className="text-xs md:text-sm font-medium uppercase tracking-wide text-muted mb-2">
            {def.label}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-4xl md:text-5xl font-bold text-foreground">
              {stats[def.id] === null ? "—" : stats[def.id]}
            </p>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getToneClass(def.tone)}`}>
                {def.tone === "success" ? "Active" : def.tone === "warning" ? "Pending" : def.id === "draft" ? "Draft" : "Total"}
              </span>
              <span className="text-base">{getIcon(def.id)}</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
