"use client";

import { useState } from "react";

export function MapCategoryFilter() {
  const categories = ["ทั้งหมด", "ดนตรี", "กีฬา", "อาหาร", "เทคโนโลยี", "ศิลปะ"];
  const [active, setActive] = useState("ทั้งหมด");

  return (
    <div className="absolute top-25 left-0 w-full z-10">
      <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm whitespace-nowrap transition
              ${active === cat
                ? "bg-[#4338ca] text-white"
                : "bg-white text-gray-700"
              }`}
          >
            {cat}
          </button>
        ))}

      </div>
    </div>
  );
}