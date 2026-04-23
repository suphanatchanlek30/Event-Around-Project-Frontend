"use client";

import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";

import { updateMe } from "@/services";
import { uploadImageToCloudinary } from "@/services";
import type { AuthUser } from "@/services/authService";

type Props = {
    user: {
        name: string;
        email: string;
        account: string;
    };
    onClose: () => void;
    onUpdated: (updated: AuthUser) => void;
};

export default function EditProfileModal({ user, onClose, onUpdated }: Props) {
    const [fullName, setFullName] = useState(user.name);
    const [imageUrl, setImageUrl] = useState(user.account);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => fileInputRef.current?.click();

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            setIsUploadingImage(true);
            setError("");
            const result = await uploadImageToCloudinary(file, "profiles");
            setImageUrl(result.url);
        } catch {
            setError("อัปโหลดรูปไม่สำเร็จ กรุณาลองใหม่");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim()) {
            setError("กรุณากรอกชื่อ-นามสกุล");
            return;
        }
        try {
            setIsSubmitting(true);
            setError("");
            const response = await updateMe({
                fullName: fullName.trim(),
                profileImageUrl: imageUrl,
            });
            if (response.success) {
                onUpdated(response.data);
                onClose();
            }
        } catch {
            setError("บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800">แก้ไขโปรไฟล์</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-gray-600"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24">
                            <img
                                src={imageUrl}
                                alt="profile preview"
                                className="w-24 h-24 rounded-full object-cover border-2 border-indigo-100"
                            />
                            <button
                                type="button"
                                onClick={handleImageClick}
                                disabled={isUploadingImage}
                                className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-700 transition disabled:opacity-70"
                            >
                                {isUploadingImage ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Camera size={14} className="text-white" />
                                )}
                            </button>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <p className="mt-2 text-xs text-gray-400">
                            {isUploadingImage ? "กำลังอัปโหลด..." : "กดที่ไอคอนกล้องเพื่อเปลี่ยนรูป"}
                        </p>
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ชื่อ-นามสกุล
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="กรอกชื่อ-นามสกุล"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            อีเมล
                        </label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full px-4 py-2.5 border border-gray-100 rounded-xl text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-gray-400">ไม่สามารถเปลี่ยนอีเมลได้</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-xs text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">
                            {error}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition text-sm"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || isUploadingImage}
                            className="flex-1 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition text-sm disabled:opacity-70"
                        >
                            {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
