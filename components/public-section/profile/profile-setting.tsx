"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, LockKeyhole, HelpCircle, LogOut, ChevronRight } from "lucide-react";

import { logout, getStoredRefreshToken } from "@/services";
import ChangePasswordModal from "@/components/public-section/profile/change-password-modal";

export default function ProfileSetting() {
    const router = useRouter();
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout(getStoredRefreshToken());
            router.push("/login");
            router.refresh();
        } catch {
            setIsLoggingOut(false);
        }
    };

    const menu = [
        { title: "การแจ้งเตือน", icon: <Bell size={20} /> },
        {
            title: "เปลี่ยนรหัสผ่าน",
            icon: <LockKeyhole size={20} />,
            onClick: () => setShowChangePassword(true),
        },
        { title: "ช่วยเหลือและสนับสนุน", icon: <HelpCircle size={20} /> },
        {
            title: isLoggingOut ? "กำลังออกจากระบบ..." : "ออกจากระบบ",
            icon: <LogOut size={20} />,
            danger: true,
            onClick: handleLogout,
        },
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
                        onClick={item.onClick}
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

            {showChangePassword && (
                <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
            )}
        </div>
    );
}