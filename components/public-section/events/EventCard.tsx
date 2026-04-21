"use client";
import { useRouter } from "next/navigation";
import { Heart, MapPin, Clock } from "lucide-react";

export default function EventCard({ isSelected = false }: { isSelected?: boolean }) {
  const router = useRouter();
  
  return (
    <div
      className={`w-full bg-white rounded-3xl overflow-hidden shadow-sm cursor-pointer transition-all flex flex-col h-full 
        ${isSelected ? 'border-[1.5px] border-primary border-dashed' : 'border-[1.5px] border-transparent hover:border-primary/20'}
      `}
      onClick={() => router.push("/events/1")}
    >
      {/* Image Container */}
      <div className="h-[200px] bg-linear-to-b from-[#1c1c28] to-[#12121a] relative flex items-start justify-between p-4 shrink-0">
        
        {/* Mock Graphic from Image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-90 overflow-hidden pointer-events-none">
           <div className="w-full flex justify-center translate-y-3">
             <div className="relative w-3/4 max-w-[200px] h-16 border-b-[1.5px] border-l-[1.5px] border-r-[1.5px] border-[#2dd4bf]/20 flex items-center justify-center">
                <div className="absolute top-0 w-[110%] h-[1.5px] bg-[#2dd4bf]/30"></div>
                <div className="absolute -top-6 w-[80%] h-8 bg-[#3b82f6]/20 skew-x-45 blur-sm"></div>
                <h2 className="text-[#38bdf8] text-[17px] font-light tracking-[0.2em] z-10">TECH <span className="font-bold opacity-80">CONFERENCE</span></h2>
             </div>
           </div>
           <div className="text-[#0ea5e9] mt-6 flex items-center gap-1.5 z-10"><span className="text-lg opacity-80">⚙️</span> <span className="text-lg font-light tracking-wide">safe wonk</span></div>
        </div>

        <span className="bg-primary text-white text-[11px] px-3.5 py-1.5 rounded-full font-semibold z-10 shadow-sm">
          กำลังจะมาถึง
        </span>
        <button
          className="bg-white/10 backdrop-blur-md rounded-full p-2.5 hover:bg-white/20 transition-colors z-10"
          onClick={e => { e.stopPropagation(); /* handle favorite */ }}
        >
          <Heart className="w-[18px] h-[18px] text-white" />
        </button>

        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white text-[11px] font-medium z-10">
          <Clock className="w-[14px] h-[14px]" />
          จะเริ่มในอีก 2 ชั่วโมง
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <h3 className="text-[17px] font-medium text-[#1a1b26] mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">Global Tech Summit 2024</h3>
        <p className="text-[13px] text-muted mb-4 line-clamp-2 leading-relaxed">
          Join the most influential minds in tech for a day of innovation, networking, and future-forward thinking.
        </p>
        
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-center justify-between text-[12px] text-muted">
            <span className="flex items-center gap-1.5 truncate"><MapPin className="w-4 h-4 text-primary shrink-0" /> Innovation Hub, Downtown</span>
            <span className="shrink-0 text-[11px] font-medium">0.8 km</span>
          </div>
          <div className="flex items-center text-[12px] text-muted mt-0.5">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary shrink-0" /> 24 ต.ค. • 09:00 AM - 05:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}