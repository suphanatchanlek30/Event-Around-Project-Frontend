"use client";

type Event = {
  id: number;
  title: string;
  location: string;
  category: string;
  imageUrl: string;
};

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Tech Talk: Future of AI in Design",
    location: "Bangkok Mall",
    category: "music",
    imageUrl:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  },
  {
    id: 2,
    title: "Food Market",
    location: "Siam Square",
    category: "food",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
  {
    id: 3,
    title: "Tech Meetup",
    location: "True Digital Park",
    category: "tech",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72",
  }
];

export function MapCardList() {
  return (
    <div className="w-full px-4 pb-4">
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth">

        {mockEvents.map((event) => (
          <div
            key={event.id}
            className="min-w-[260px] snap-start bg-white rounded-2xl shadow-md overflow-hidden flex-shrink-0 active:scale-95 transition"
          >
            {/* image */}
            <div className="h-28 w-full overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* content */}
            <div className="p-3">
              <div className="text-sm font-semibold text-black">
                {event.title}
              </div>

              <div className="text-xs text-gray-500 mt-1">
                {event.location}
              </div>

              <div className="text-xs mt-2 inline-block px-2 py-1 rounded-full bg-[#4338ca]/10 text-[#4338ca]">
                {event.category}
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}