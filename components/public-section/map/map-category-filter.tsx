"use client";

import type { CategoryItem } from "@/services";

type MapCategoryFilterProps = {
  categories: CategoryItem[];
  activeCategoryId?: number;
  onChange: (categoryId?: number) => void;
};

export function MapCategoryFilter({
  categories,
  activeCategoryId,
  onChange,
}: MapCategoryFilterProps) {
  return (
    <div className="w-full">
      <div className="flex gap-2 overflow-x-auto rounded-2xl bg-white/95 p-2 shadow-md backdrop-blur-sm">
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
            activeCategoryId === undefined ? "bg-[#4338ca] text-white" : "bg-surface text-foreground"
          }`}
        >
          ทั้งหมด
        </button>
        {categories.map((category) => (
          <button
            key={category.categoryId}
            type="button"
            onClick={() => onChange(category.categoryId)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
              activeCategoryId === category.categoryId
                ? "bg-[#4338ca] text-white"
                : "bg-surface text-foreground"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}