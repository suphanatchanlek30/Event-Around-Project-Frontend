"use client";
import { useState } from "react";
import { Search, SlidersHorizontal, Shapes, Calendar, Ruler, X } from "lucide-react";

export default function EventSearch() {
  const [activeTab, setActiveTab] = useState("latest");
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    distance: "",
  });

  const handleClear = () => {
    setFilters({
      category: "",
      date: "",
      distance: "",
    });
  };

  return (
    <div className="w-full mb-8">
      {/* Top Row: Search and Tabs */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        {/* Search Bar */}
        <div className="flex items-center flex-1 bg-white rounded-full pl-5 pr-1.5 py-1.5 shadow-sm">
          <Search className="w-5 h-5 text-muted mr-3" />
          <input
            className="flex-1 bg-transparent outline-none border-none text-[15px] placeholder:text-muted h-10"
            type="text"
            placeholder="ค้นหากิจกรรม เวิร์กช็อป..."
          />
          <button className="bg-primary text-white rounded-full p-2.5 flex items-center justify-center hover:opacity-90 transition-opacity">
            <SlidersHorizontal className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 shrink-0 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          {[
            { id: 'latest', label: 'ล่าสุด' },
            { id: 'nearby', label: 'ใกล้คุณ' },
            { id: 'upcoming', label: 'กำลังจะถึง' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-[#eef0f4] text-muted hover:bg-[#e4e6eb]'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-muted hover:bg-[#e4e6eb] transition-colors text-[13px] font-medium text-foreground">
          <Shapes className="w-4 h-4 text-primary" />
          หมวดหมู่
          <span className="ml-1 text-muted text-[10px]">▼</span>
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-muted hover:bg-[#e4e6eb] transition-colors text-[13px] font-medium text-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          ช่วงวันที่
          <span className="ml-1 text-muted text-[10px]">▼</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-muted hover:bg-[#e4e6eb] transition-colors text-[13px] font-medium text-foreground">
          <Ruler className="w-4 h-4 text-primary" />
          Distance
          <span className="ml-1 text-muted text-[10px]">▼</span>
        </button>

        <button 
          onClick={handleClear}
          className="ml-auto flex items-center gap-1 text-primary text-[11px] font-bold tracking-wider hover:opacity-80 transition-opacity uppercase"
        >
          <X className="w-3.5 h-3.5" /> CLEAR ALL
        </button>
      </div>
    </div>
  );
}