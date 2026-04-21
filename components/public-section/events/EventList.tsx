"use client";
import EventCard from "./EventCard";

export default function EventList() {
  const events = [1, 2, 3, 4, 5, 6];
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((_, idx) => (
          <EventCard key={idx} isSelected={idx === 0} />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex flex-col items-center mt-12 mb-8 md:mb-12">
        <button className="mb-6 px-10 py-3 rounded-2xl bg-white text-primary text-sm font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[#eef0f4] hover:shadow-md transition-shadow">
          โหลดกิจกรรมเพิ่ม
        </button>
        <div className="flex items-center gap-1.5 bg-transparent">
          <button className="w-10 h-10 rounded-2xl bg-primary text-white text-sm font-semibold shadow-[0_2px_8px_rgba(67,56,202,0.3)] flex items-center justify-center">1</button>
          <button className="w-10 h-10 rounded-2xl bg-transparent text-muted hover:bg-white hover:shadow-sm text-sm font-medium flex items-center justify-center transition-all">2</button>
          <button className="w-10 h-10 rounded-2xl bg-transparent text-muted hover:bg-white hover:shadow-sm text-sm font-medium flex items-center justify-center transition-all">3</button>
          <span className="mx-2 text-muted text-sm font-medium">...</span>
          <button className="w-10 h-10 rounded-2xl bg-transparent text-muted hover:bg-white hover:shadow-sm text-sm font-medium flex items-center justify-center transition-all">12</button>
          <button className="w-10 h-10 rounded-2xl bg-primary text-white text-xl flex items-center justify-center ml-2 shadow-[0_2px_8px_rgba(67,56,202,0.3)] hover:bg-primary/90 transition-colors pb-0.5">+</button>
        </div>
      </div>
    </div>
  );
}
