"use client";
import { ArrowLeft, Share2, Heart, Calendar, MapPin, MonitorPlay } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventDetail() {
  const router = useRouter();

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pb-24 md:pb-0">
      {/* Cover Image */}
      <div className="h-[300px] md:h-[400px] bg-linear-to-b from-[#1c1c28] to-[#12121a] relative flex items-center justify-center">
        {/* Top Navbar Actions */}
        <div className="absolute top-4 w-full px-4 flex justify-between items-center z-20">
           <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <ArrowLeft className="w-5 h-5" />
           </button>
           <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                 <Share2 className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                 <Heart className="w-4 h-4" />
              </button>
           </div>
        </div>

        {/* Mock Graphic */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-90 overflow-hidden pointer-events-none">
           <div className="w-full flex justify-center translate-y-3">
             <div className="relative w-3/4 max-w-[300px] h-24 border-b-[1.5px] border-l-[1.5px] border-r-[1.5px] border-[#2dd4bf]/20 flex items-center justify-center">
                <div className="absolute top-0 w-[110%] h-[1.5px] bg-[#2dd4bf]/30"></div>
                <div className="absolute -top-8 w-[80%] h-12 bg-[#3b82f6]/20 skew-x-45 blur-sm"></div>
                <h2 className="text-[#38bdf8] text-2xl font-light tracking-[0.2em] z-10">TECH <span className="font-bold opacity-80">CONFERENCE</span></h2>
             </div>
           </div>
           <div className="text-[#0ea5e9] mt-8 flex items-center gap-1.5 z-10"><span className="text-xl opacity-80">⚙️</span> <span className="text-xl font-light tracking-wide">safe wonk</span></div>
        </div>
      </div>

      {/* Content Card (Overlapping) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-8 z-10">
        <div className="bg-white rounded-t-3xl md:rounded-3xl p-6 md:p-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-lg min-h-[500px]">
          
          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT COLUMN */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary text-white px-3.5 py-1.5 rounded-full text-[11px] font-semibold">เทคโนโลยี</span>
                <span className="bg-surface-muted text-foreground px-3.5 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  เผยแพร่แล้ว
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#1a1b26] leading-snug">AI Frontiers 2024: Beyond the Hype</h1>
              
              {/* Organizer Profile */}
              <div className="bg-surface-muted rounded-2xl p-4 flex items-center gap-4 mb-8 w-fit pr-8">
                <div className="w-10 h-10 bg-[#1e293b] rounded-xl flex items-center justify-center text-white">
                  <MonitorPlay className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-[11px] text-muted font-medium mb-0.5">ผู้จัดงาน</div>
                  <div className="text-sm font-bold text-foreground">Dr. Sarah Chen</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 text-[14px] text-muted leading-relaxed font-medium">
                <p>
                  ร่วมสัมผัสประสบการณ์ตลอดทั้งวันในการสำรวจอนาคตของปัญญาประดิษฐ์ (AI) ปีนี้เราจะก้าวข้ามคำฮิตและกระแสต่างๆ เพื่อเจาะลึกการใช้งานจริง ประเด็นด้านจริยธรรม และนวัตกรรมใหม่ของ Generative AI และ Machine Learning ทั้งในแวดวงการศึกษาและอุตสาหกรรม
                </p>
                <p>
                  ภายในงานพบกับวิทยากรหลักจาก Silicon Valley เวิร์กช็อปเชิงปฏิบัติสำหรับนักศึกษา และกิจกรรมสร้างเครือข่าย ไม่ว่าคุณจะเป็นนักพัฒนาที่มีประสบการณ์ หรือเพิ่งเริ่มสนใจ AI งานนี้จะเปิดมุมมองใหม่สู่โลกดิจิทัลแห่งอนาคต
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN (Info Box) */}
            <div className="w-full lg:w-[320px] shrink-0">
              <div className="bg-[#f8f9fa] rounded-3xl p-6 border border-[#eef0f4]">
                <button className="w-full py-3.5 bg-primary hover:bg-primary/90 transition-colors text-white rounded-2xl text-[15px] font-bold mb-3 shadow-[0_4px_12px_rgba(67,56,202,0.2)]">
                  ลงทะเบียนตอนนี้
                </button>
                <div className="text-center text-[11px] text-muted font-medium mb-6">มีผู้เข้าร่วมแล้ว 42 คน</div>
                
                <div className="space-y-6">
                  {/* Date */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#eef0f4] flex items-center justify-center shrink-0 shadow-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-foreground mb-0.5">24 ตุลาคม 2024</div>
                      <div className="text-[11px] text-muted leading-snug">วันพฤหัสบดี, เวลา<br/>09:00 - 17:00 น.</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#eef0f4] flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-foreground mb-0.5">Innovation Hub</div>
                      <div className="text-[11px] text-muted leading-snug">North Campus, ห้อง<br/>402</div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-6 h-[120px] bg-linear-to-br from-[#e0e7ff] to-[#f3f4f6] rounded-2xl relative overflow-hidden flex items-center justify-center border border-[#eef0f4]">
                  {/* Mock Map pin */}
                  <div className="absolute inset-0 bg-[#e5e7eb] opacity-50"></div>
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center z-10 shadow-lg shadow-red-500/30">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
