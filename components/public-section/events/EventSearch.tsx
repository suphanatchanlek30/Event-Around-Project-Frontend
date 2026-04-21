"use client";
import { useState } from "react";


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
    <div className="w-full bg-surface p-4 rounded-2xl shadow mb-6">
      {/* Search */}
      <div className="flex items-center bg-surface-muted rounded-full px-4 py-2">
        <span className="mr-2 text-xl text-muted">🔍</span>
        <input
          className="flex-1 bg-transparent outline-none border-none text-base placeholder:text-muted"
          type="text"
          placeholder="Search events, workshops, or meetups..."
        />
        <button className="ml-2 bg-primary text-white rounded-full p-2 text-lg flex items-center justify-center">
          <span>⚙️</span>
        </button>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 mt-4">
        {['latest', 'nearby', 'upcoming'].map(tab => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-full font-medium border-none transition-colors ${activeTab === tab ? 'bg-primary text-white' : 'bg-[#eee] text-foreground'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mt-4 items-center">
        <button
          className="px-4 py-2 rounded-xl border border-[#ddd] bg-white text-sm"
          onClick={() => alert('เลือก Category')}
        >
          <span className="inline-flex items-center gap-1"> <span className="text-lg">🔽</span> Category</span>
        </button>
        <button
          className="px-4 py-2 rounded-xl border border-[#ddd] bg-white text-sm"
          onClick={() => alert('เลือก Date Range')}
        >
          <span className="inline-flex items-center gap-1"> <span className="text-lg">📅</span> Date Range</span>
        </button>
        <button
          className="px-4 py-2 rounded-xl border border-[#ddd] bg-white text-sm"
          onClick={() => alert('เลือก Distance')}
        >
          <span className="inline-flex items-center gap-1"> <span className="text-lg">📏</span> Distance</span>
        </button>
        <span
          className="ml-2 text-primary cursor-pointer text-sm font-medium"
          onClick={handleClear}
        >
          CLEAR ALL
        </span>
      </div>
    </div>
  );
}