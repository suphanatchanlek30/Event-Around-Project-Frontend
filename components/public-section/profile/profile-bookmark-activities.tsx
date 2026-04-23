"use client";

export default function ProfileBookmarkActivities() {
    //mock data
    const savedEvents = [
        {
            id: 1,
            title: "AI in Design Hackathon",
            date: "24 ต.ค. 10:00น.",
            location: "Bangkok",
            image: "https://i.pinimg.com/736x/d0/27/91/d02791d236c8b809fcdd18d6b1bf99cf.jpg",
        },
        {
            id: 2,
            title: "UX/UI Workshop",
            date: "20 May 2026",
            location: "Thammasat University",
            image: "https://i.pinimg.com/1200x/a7/e3/9e/a7e39e194e30e161e0f669efe2baa866.jpg",
        },
        {
            id: 3,
            title: "Startup Pitch Day",
            date: "28 May 2026",
            location: "Online",
            image: "https://i.pinimg.com/736x/42/ae/ff/42aefffa3ba7650a0bee7c614f8f37d5.jpg",
        },
    ];

    return (
        <div className="mt-8 w-full">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    กิจกรรมที่บันทึกไว้
                </h2>

                <button className="text-sm font-medium text-indigo-600 hover:underline">
                    ดูทั้งหมด
                </button>
            </div>

            {/* List */}
            <div className="flex gap-4 overflow-x-auto pb-2">

                {savedEvents.map((event) => (
                    <div
                        key={event.id}
                        className="min-w-[220px] bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
                    >
                        {/* Image */}
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-32 object-cover"
                        />

                        {/* Content */}
                        <div className="p-3">
                            <h3 className="font-semibold text-gray-800 text-sm truncate">
                                {event.title}
                            </h3>

                            <p className="text-xs text-gray-500">
                                {event.date}
                            </p>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );


}