"use client";

import { Bell, LockKeyhole, HelpCircle, LogOut, ChevronRight } from "lucide-react";

export default function ProfileSetting() {
    const menu = [
        { title: "การแจ้งเตือน", icon: <Bell size={20} /> },
        { title: "ความเป็นส่วนตัวและความปลอดภัย", icon: < LockKeyhole size={20} /> },
        { title: "ช่วยเหลือและสนับสนุน", icon: <HelpCircle size={20} /> },
        { title: "ออกจากระบบ", icon: <LogOut size={20} />, danger: true },
    ];
    return (
        <div className="mt-8 w-full">

            {/* Title */}
            <h2 className="text-lg font-bold text-gray-800 mb-4 text-left">
                บัญชี
            </h2>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-200/60">

                {menu.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition ${
                            item.danger ? "text-red-500" : "text-gray-800"
                        }`}
                    >

                        {/* Left */}
                        <div className="flex items-center gap-3">

                            <div className={item.danger ? "text-red-500" : "text-black"}>
                                {item.icon}
                            </div>

                            <span className="font-medium">
                                {item.title}
                            </span>
                        </div>

                        {!item.danger && (
                            <ChevronRight size={18} className="text-gray-400" />
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
}