"use client";


"use client";
import { useRouter } from "next/navigation";

export default function EventCard() {
  const router = useRouter();
  return (
    <div
      className="w-[340px] bg-white rounded-2xl overflow-hidden shadow-lg mr-6 cursor-pointer border border-transparent hover:border-primary transition-all"
      onClick={() => router.push("/events/1")}
    >
      {/* Image & badge */}
      <div className="h-40 bg-gradient-to-br from-[#1e1e2f] to-[#3a3a5a] relative flex items-start justify-between p-4">
        <span className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-xl font-semibold z-10">UPCOMING</span>
        <button
          className="absolute top-4 right-4 bg-white border-none rounded-full p-2 shadow hover:bg-primary hover:text-white transition-colors z-10"
          onClick={e => { e.stopPropagation(); /* TODO: handle favorite */ }}
        >
          <span className="text-lg">♡</span>
        </button>
      </div>
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1">Global Tech Summit 2024</h3>
        <p className="text-sm text-muted mb-3 line-clamp-2">
          Join the most influential minds in tech for a day of innovation, networking, and future-forward thinking.
        </p>
        <div className="flex items-center text-xs text-muted mb-2 gap-2">
          <span className="flex items-center gap-1"><span className="text-base">📍</span> Innovation Hub, Downtown</span>
          <span className="flex items-center gap-1"><span className="text-base">⏰</span> 09:00 - 17:00</span>
        </div>
        <div className="flex items-center text-xs text-muted gap-2">
          <span>0.8 km</span>
          <span>24 ต.ค.</span>
        </div>
      </div>
    </div>
  );
}