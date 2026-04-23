"use client";

import { useEffect, useState } from "react";

import { getCategories, getPublicEvents } from "@/services";

type StatItem = {
  id: string;
  label: string;
  value: string;
  tone: "primary" | "success" | "warning" | "muted";
};

const getToneClass = (tone: "primary" | "success" | "warning" | "muted") => {
  if (tone === "success") return "bg-emerald-100 text-emerald-700";
  if (tone === "warning") return "bg-amber-100 text-amber-700";
  if (tone === "muted") return "bg-slate-100 text-slate-700";
  return "bg-indigo-100 text-indigo-700";
};

export const AdminStatsCards = () => {
  const [stats, setStats] = useState<StatItem[]>([
    { id: "all-events", label: "กิจกรรมทั้งหมด", value: "-", tone: "primary" },
    { id: "pending-approvals", label: "รออนุมัติ", value: "-", tone: "warning" },
    { id: "active-categories", label: "หมวดหมู่ที่ใช้งาน", value: "-", tone: "success" },
    { id: "published", label: "เผยแพร่แล้ว", value: "-", tone: "muted" },
  ]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [allEvents, pending, published, cats] = await Promise.allSettled([
          getPublicEvents({ page: 1, pageSize: 1 }),
          getPublicEvents({ page: 1, pageSize: 1, status: "DRAFT" }),
          getPublicEvents({ page: 1, pageSize: 1, status: "PUBLISHED" }),
          getCategories({ includeInactive: false }),
        ]);

        setStats([
          {
            id: "all-events",
            label: "กิจกรรมทั้งหมด",
            value: allEvents.status === "fulfilled" ? String(allEvents.value.meta?.totalItems ?? "-") : "-",
            tone: "primary",
          },
          {
            id: "pending-approvals",
            label: "รออนุมัติ",
            value: pending.status === "fulfilled" ? String(pending.value.meta?.totalItems ?? "-") : "-",
            tone: "warning",
          },
          {
            id: "active-categories",
            label: "หมวดหมู่ที่ใช้งาน",
            value: cats.status === "fulfilled" ? String(cats.value.data.length) : "-",
            tone: "success",
          },
          {
            id: "published",
            label: "เผยแพร่แล้ว",
            value: published.status === "fulfilled" ? String(published.value.meta?.totalItems ?? "-") : "-",
            tone: "muted",
          },
        ]);
      } catch {
        // keep defaults
      }
    };

    loadStats();
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
      {stats.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl bg-surface border border-border p-4 md:p-5 shadow-sm"
        >
          <p className="text-xs uppercase tracking-wide font-semibold text-muted">{item.label}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-4xl font-bold text-foreground">{item.value}</p>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getToneClass(item.tone)}`}>
              อัปเดตล่าสุด
            </span>
          </div>
        </article>
      ))}
    </section>
  );
};
