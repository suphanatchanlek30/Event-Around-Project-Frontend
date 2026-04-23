"use client";

import { LocateFixed, Search } from "lucide-react";

type MapFilterProps = {
  radiusKm: number;
  search: string;
  isLocating: boolean;
  onRadiusChange: (radius: number) => void;
  onSearchChange: (value: string) => void;
  onUseMyLocation: () => void;
};

export function MapFilter({
  radiusKm,
  search,
  isLocating,
  onRadiusChange,
  onSearchChange,
  onUseMyLocation,
}: MapFilterProps) {
  return (
    <div className="w-full rounded-3xl bg-white/95 p-3 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onUseMyLocation}
          disabled={isLocating}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-[#4338ca] px-4 text-sm font-medium text-white disabled:opacity-70"
        >
          <LocateFixed size={16} />
          {isLocating ? "กำลังระบุตำแหน่ง..." : "ใช้ตำแหน่งของฉัน"}
        </button>

        <div className="flex h-10 items-center gap-2 rounded-2xl border border-border px-3">
          <Search size={15} className="text-muted" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="ค้นหากิจกรรม"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="inline-flex h-10 items-center gap-2 rounded-2xl bg-surface-muted px-3 text-sm">
          <span className="text-muted">รัศมี</span>
          <select
            className="bg-transparent font-medium text-[#4338ca] outline-none"
            value={radiusKm}
            onChange={(event) => onRadiusChange(Number(event.target.value))}
          >
            <option value={1}>1 กม.</option>
            <option value={3}>3 กม.</option>
            <option value={5}>5 กม.</option>
            <option value={10}>10 กม.</option>
            <option value={20}>20 กม.</option>
          </select>
        </div>
      </div>
    </div>
  );
}