"use client";

import { ChevronRight, PartyPopper, Globe } from "lucide-react";

export default function ProfileMyActivities() {
    const activities = [
        {
            id: 1,
            title: "Campus Startup Pitch",
            date: "เข้าร่วมเมื่อ 12 ต.ค. 2023",
            icon: <PartyPopper className="text-indigo-600" size={20} />,
        },
        {
            id: 2,
            title: "Intramural Finals",
            date: "เข้าร่วมเมื่อ 5 ต.ค. 2023",
            icon: <Globe className="text-indigo-600" size={20} />,
        },
    ];

    return (
        <div className="mt-8 w-full">

            {/* Header */}
            <h2 className="text-lg font-bold text-gray-800 mb-4 text-left">
                กิจกรรมของฉัน
            </h2>

            {/* List */}
            <div className="flex flex-col gap-4">

                {activities.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between bg-gray-100 rounded-2xl p-4 hover:bg-gray-200 transition cursor-pointer"
                    >

                        {/* Left */}
                        <div className="flex items-center gap-4">

                            {/* Icon box */}
                            <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-xl">
                                {item.icon}
                            </div>

                            {/* Text */}
                            <div className="flex flex-col">
                                <p className="font-semibold text-gray-800 text-left">
                                    {item.title}
                                </p>
                                <p className="text-sm font-medium text-gray-500 text-left">
                                    {item.date}
                                </p>
                            </div>

                        </div>

                        {/* Right arrow */}
                        <ChevronRight className="text-gray-400" size={20} />

                    </div>
                ))}

            </div>
        </div>
    );
}