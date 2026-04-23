"use client";

import { useEffect, useState } from "react";

import { getMe, getStoredUser } from "@/services";
import type { AuthUser } from "@/services/authService";
import EditProfileModal from "@/components/public-section/profile/edit-profile-modal";

export default function ProfileAccount() {
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [profileError, setProfileError] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "STUDENT" as AuthUser["role"],
        account:
            "https://i.pinimg.com/control1/1200x/5d/5a/93/5d5a93d474d9ed4ce1866527be582334.jpg",
        institution: "Event Around Community",
    });

    const handleProfileUpdated = (updated: AuthUser) => {
        setUser((prev) => ({
            ...prev,
            name: updated.fullName,
            email: updated.email,
            role: updated.role,
            account:
                updated.profileImageUrl ??
                "https://i.pinimg.com/control1/1200x/5d/5a/93/5d5a93d474d9ed4ce1866527be582334.jpg",
        }));
    };

    const stats = {
        joinedCount: 8,
        bookmarkCount: 5,
        groupCount: 4,
    };

    const handleEdit = () => {
        setShowEditModal(true);
    };

    useEffect(() => {
        // Hydration-safe: populate from localStorage first, then fetch fresh data
        const storedUser = getStoredUser();
        if (storedUser) {
            setUser((prev) => ({
                ...prev,
                name: storedUser.fullName,
                email: storedUser.email,
                role: storedUser.role,
                account: storedUser.profileImageUrl ?? prev.account,
            }));
        }

        const loadProfile = async () => {
            try {
                setProfileError("");
                const response = await getMe();

                if (response.success) {
                    setUser((prev) => ({
                        ...prev,
                        name: response.data.fullName,
                        email: response.data.email,
                        role: response.data.role,
                        account:
                            response.data.profileImageUrl ?? prev.account,
                    }));
                }
            } catch {
                setProfileError("ไม่สามารถดึงข้อมูลผู้ใช้ได้ในขณะนี้");
            } finally {
                setIsLoadingProfile(false);
            }
        };

        loadProfile();
    }, []);

    return (
        <>
        <div className="w-full">

            {/* Account */}
            <div className="flex flex-col items-center text-center">

                <img
                    src={user.account}
                    className="w-24 h-24 rounded-full object-cover border"
                />

                <h1 className="mt-3 text-xl font-bold text-gray-800">
                    {user.name}
                </h1>

                <p className="text-gray-500 text-sm">
                    {user.institution}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                    {user.email} | {user.role}
                </p>

                {isLoadingProfile ? (
                    <p className="mt-2 text-xs text-gray-500">กำลังโหลดโปรไฟล์...</p>
                ) : null}

                {profileError ? (
                    <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">
                        {profileError}
                    </p>
                ) : null}

                {/*button*/}
                <div className="mt-6 flex gap-3 w-full justify-center">
                    <button
                        className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
                        onClick={handleEdit}
                    >
                        แก้ไขโปรไฟล์
                    </button>
                </div>
                
                {/* stats */}
                <div className="mt-6 flex gap-3 w-full">

                    <div className="flex-1 bg-white rounded-xl p-5 text-center shadow-sm">
                        <p className="text-indigo-600 font-bold text-xl">
                            {stats.joinedCount}
                        </p>
                        <p className="text-sm font-medium">เข้าร่วมแล้ว</p>
                    </div>

                    <div className="flex-1 bg-white rounded-xl p-5 text-center shadow-sm">
                        <p className="text-indigo-600 font-bold text-xl">
                            {stats.bookmarkCount}
                        </p>
                        <p className="text-sm font-medium">บันทึกไว้</p>
                    </div>

                    <div className="flex-1 bg-white rounded-xl p-5 text-center shadow-sm">
                        <p className="text-indigo-600 font-bold text-xl">
                            {stats.groupCount}
                        </p>
                        <p className="text-sm font-medium">กลุ่ม</p>
                    </div>

                </div>

            </div>
        </div>

        {showEditModal && (
            <EditProfileModal
                user={{ name: user.name, email: user.email, account: user.account }}
                onClose={() => setShowEditModal(false)}
                onUpdated={handleProfileUpdated}
            />
        )}
        </>
    );
}