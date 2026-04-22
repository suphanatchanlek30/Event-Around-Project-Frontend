"use client";

import { useState } from "react";
import { LocateFixed } from "lucide-react";

export function MapFilter() {
  const [radius, setRadius] = useState(5);

  return (
    <div className="absolute top-4 left-0 right-0 z-10 flex justify-center px-4">
      
      <div className="w-full max-w-[420px] bg-white/90 backdrop-blur-md shadow-lg rounded-2xl px-5 py-4 flex items-stretch">

        {/*left*/}
        <div className="flex-1 flex items-center justify-start">
          <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 whitespace-nowrap">
            <LocateFixed size={16} />
            ใช้ตำแหน่งของฉัน
          </button>
        </div>

        {/*divider*/}
        <div className="w-px bg-gray-200 mx-4" />

        {/*right*/}
        <div className="flex-1 flex items-center justify-end">
          <div className="flex items-center gap-2 text-sm whitespace-nowrap">
            <span className="text-gray-600">รัศมี</span>

            <select
              className="bg-transparent outline-none font-medium"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
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
    </div>
  );
}