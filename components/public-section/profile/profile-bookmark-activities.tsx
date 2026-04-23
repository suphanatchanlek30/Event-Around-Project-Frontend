"use client";

import { MapPin, Bookmark } from "lucide-react";

export default function ProfileBookmarkActivities() {
    //mock data
    const savedEvents = [
        {
            id: 1,
            title: "AI in Design Hackathon",
            date: "24 ต.ค. 10:00 น.",
            location: "Thammasat University",
            image: "https://i.pinimg.com/736x/d0/27/91/d02791d236c8b809fcdd18d6b1bf99cf.jpg",
        },
        {
            id: 2,
            title: "Jazz Night under Stars",
            date: "8 ต.ค. 10:00 น.",
            location: "Thammasat University",
            image: "https://i.pinimg.com/1200x/a7/e3/9e/a7e39e194e30e161e0f669efe2baa866.jpg",
        },

    ];

    return (
        <div className="mt-8 w-full">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
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
                        className="relative min-w-[220px] bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
                    >
                        {/* Bookmark icon */}
                        <button className="absolute top-2 right-2 bg-white/80 p-1 rounded-full shadow hover:scale-105 transition">
                            <Bookmark size={16} className="text-indigo-600" />
                        </button>

                        {/* Image */}
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-32 object-cover"
                        />

                        {/* Content */}
                        <div className="p-3 text-left">

                            {/*Date */}
                            <p className="text-xs text-medium text-indigo-600">
                                {event.date}
                            </p>

                            {/*Title */}
                            <h3 className="mt-1 font-semibold text-gray-800 text-sm leading-snug">
                                {event.title}
                            </h3>

                            {/*Location */}
                            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={12} />
                                <span>{event.location}</span>
                            </div>

                        </div>
                    </div>
                ))}

            </div>

        </div>
    );


}