"use client";
import EventCard from "./EventCard";

export default function EventList() {
  // ตัวอย่าง mock data (ควรเปลี่ยนเป็น props/data จริงในอนาคต)
  const events = [1, 2];
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6">
        {events.map((_, idx) => (
          <EventCard key={idx} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex flex-col items-center mt-8">
        <button className="mb-2 px-6 py-2 rounded-full bg-surface-muted text-primary font-semibold border border-primary/20">โหลดกิจกรรมเพิ่ม</button>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-primary text-white font-bold">1</button>
          <button className="w-8 h-8 rounded-full bg-surface text-primary">2</button>
          <button className="w-8 h-8 rounded-full bg-surface text-primary">3</button>
          <span className="mx-1 text-muted">...</span>
          <button className="w-8 h-8 rounded-full bg-surface text-primary">12</button>
          <button className="w-8 h-8 rounded-full bg-primary text-white text-xl flex items-center justify-center ml-2">+</button>
        </div>
      </div>
    </div>
  );
}
