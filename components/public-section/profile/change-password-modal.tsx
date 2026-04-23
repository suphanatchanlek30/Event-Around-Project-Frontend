"use client";

import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

import { changePassword } from "@/services";

type Props = {
    onClose: () => void;
};

export default function ChangePasswordModal({ onClose }: Props) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError("รหัสผ่านใหม่ไม่ตรงกัน");
            return;
        }
        if (newPassword.length < 8) {
            setError("รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await changePassword({
                oldPassword,
                newPassword,
                confirmNewPassword,
            });
            if (response.success) {
                setSuccess("เปลี่ยนรหัสผ่านสำเร็จ");
                setTimeout(() => onClose(), 1200);
            }
        } catch (err: unknown) {
            const status = (err as { response?: { status?: number } })?.response?.status;
            if (status === 401) {
                setError("รหัสผ่านเดิมไม่ถูกต้อง");
            } else {
                setError("เปลี่ยนรหัสผ่านไม่สำเร็จ กรุณาลองใหม่");
            }
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
                    <h2 className="text-lg font-bold text-gray-800">เปลี่ยนรหัสผ่าน</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-gray-600"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Old Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            รหัสผ่านเดิม
                        </label>
                        <div className="relative">
                            <input
                                type={showOld ? "text" : "password"}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="กรอกรหัสผ่านเดิม"
                                className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOld((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            รหัสผ่านใหม่
                        </label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="กรอกรหัสผ่านใหม่ (อย่างน้อย 8 ตัวอักษร)"
                                className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ยืนยันรหัสผ่านใหม่
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                                className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Error / Success */}
                    {error && (
                        <p className="text-xs text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
                            {success}
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
                            disabled={isSubmitting}
                            className="flex-1 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition text-sm disabled:opacity-70"
                        >
                            {isSubmitting ? "กำลังบันทึก..." : "เปลี่ยนรหัสผ่าน"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
