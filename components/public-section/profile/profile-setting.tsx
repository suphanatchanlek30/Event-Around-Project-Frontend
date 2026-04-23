"use client";

import { Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";

export default function ProfileSetting() {
    const menu = [
        {
            title: "การแจ้งเตือน",
            icon: <Bell size={20} />,
        },
        {
            title: "ความเป็นส่วนตัวและความปลอดภัย",
            icon: <Shield size={20} />,
        },
        {
            title: "ช่วยเหลือและสนับสนุน",
            icon: <HelpCircle size={20} />,
        },
        {
            title: "ออกจากระบบ",
            icon: <LogOut size={20} />,
            danger: true,
        },
    ];

    return (
        <div>
            setting
        </div>
    );
}