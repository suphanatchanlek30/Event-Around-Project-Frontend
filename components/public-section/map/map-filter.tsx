"use client";

import { useState } from "react";
import { LocateFixed } from "lucide-react";

export function MapFilter() {
  const [radius, setRadius] = useState(5);

  return (
    <div className="absolute top-4 left-4 z-10 w-full max-w-[380px] px-4">
      
      <div className="w-full max-w-[320px] ml-auto bg-white/90 backdrop-blur-md shadow-lg rounded-4xl p-2 flex items-stretch gap-2">

        {/*left*/}
        <div className="flex-[1.5]">
          <button className="w-full h-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#4338ca] rounded-4xl py-2">
            <LocateFixed size={16} />
            ใช้ตำแหน่งของฉัน
          </button>
        </div>


        {/*right*/}
        <div className="flex-[1] flex items-center justify-center bg-gray-100 rounded-4xl py-2">
          <div className="flex items-center gap-2 text-sm whitespace-nowrap">
            <span className="text-black">รัศมี</span>

            <select
              className="bg-transparent outline-none font-medium text-[#4338ca]"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            >
              <option value={1} className="text-black">1 กม.</option>
              <option value={3} className="text-black">3 กม.</option>
              <option value={5} className="text-black">5 กม.</option>
              <option value={10} className="text-black">10 กม.</option>
              <option value={20} className="text-black">20 กม.</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}