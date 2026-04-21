"use client";

export default function EventDetail() {
  return (
    <div className="max-w-4xl mx-auto px-2 md:px-0 py-8">
      {/* Cover */}
      <div className="h-72 rounded-2xl bg-gradient-to-b from-[#ddd] to-[#aaa] mb-8 relative overflow-hidden flex items-center justify-center">
        {/* สามารถใส่รูป event ได้ที่นี่ */}
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT */}
        <div className="flex-1">
          <div className="flex gap-2 mb-2">
            <span className="bg-primary text-white px-3 py-1 rounded-xl text-xs font-semibold">Technology</span>
            <span className="bg-[#eee] px-3 py-1 rounded-xl text-xs font-semibold">Published</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Frontiers 2024: Beyond the Hype</h1>
          <div className="mb-4 text-muted">Organized by <span className="font-semibold">Dr. Sarah Chen</span></div>
          <p className="text-muted leading-relaxed mb-4">
            Join us for an immersive day exploring the future of artificial intelligence. This year, we're moving past the buzzwords to real-world applications and ethical considerations. Hear from Silicon Valley experts, network with peers, and experience hands-on workshops. No prior AI experience required!
          </p>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-80 flex-shrink-0">
          <button className="w-full py-4 bg-primary text-white rounded-xl font-bold mb-4">Register Now</button>
          <div className="bg-surface-muted p-4 rounded-xl mb-4">
            <div className="mb-2 flex items-center gap-2"><span className="text-lg">📅</span> <span>October 24, 2024<br/>09:00 AM - 05:00 PM</span></div>
            <div className="mb-2 flex items-center gap-2"><span className="text-lg">📍</span> <span>Innovation Hub<br/>North Campus, Room 402</span></div>
          </div>
          <div className="h-40 bg-[#ddd] rounded-xl flex items-center justify-center">
            <span className="text-muted">[Map Placeholder]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
