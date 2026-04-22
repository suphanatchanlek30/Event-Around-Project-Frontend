"use client";

const mockEvents = [
  { id: 1, title: "Music Festival", place: "Bangkok Mall", type: "music" },
  { id: 2, title: "Food Market", place: "Siam Square", type: "food" },
  { id: 3, title: "Tech Meetup", place: "True Digital Park", type: "tech" },
  { id: 4, title: "Art Exhibition", place: "River City", type: "art" },
];

export function MapCardList() {
  return (
    <div className="w-full px-4 pb-4">
      
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">

        {mockEvents.map((event) => (
          <div
            key={event.id}
            className="min-w-[220px] bg-white rounded-2xl shadow-md p-3 flex-shrink-0"
          >
            <div className="text-sm font-semibold text-black">
              {event.title}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              {event.place}
            </div>

            <div className="text-xs mt-2 text-[#4338ca]">
              {event.type}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}