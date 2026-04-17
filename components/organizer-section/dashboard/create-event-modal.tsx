'use client';

import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEventModal = ({ isOpen, onClose }: CreateEventModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/35"
        onClick={onClose}
        aria-label="ปิดหน้าต่าง"
      />
      <div className="relative w-full max-w-lg rounded-2xl bg-surface border border-border shadow-xl p-5 md:p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-muted hover:bg-border flex items-center justify-center"
          aria-label="ปิด"
        >
          <FaTimes className="text-muted" />
        </button>

        <h3 className="text-xl font-semibold text-foreground mb-2">สร้างอีเวนต์ใหม่</h3>
        <p className="text-sm text-muted mb-5">
          ตัวอย่างนี้เป็น popup สำหรับเริ่มสร้างอีเวนต์ ยังไม่เชื่อม API สามารถต่อกับ
          POST /api/v1/events ภายหลังได้
        </p>

        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-medium text-foreground">ชื่อกิจกรรม</span>
            <input
              type="text"
              placeholder="เช่น Python Workshop"
              className="mt-1 w-full h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-foreground">สถานที่</span>
            <input
              type="text"
              placeholder="เช่น SCI Building Room 501"
              className="mt-1 w-full h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground">วันเริ่มต้น</span>
              <input
                type="datetime-local"
                className="mt-1 w-full h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">วันสิ้นสุด</span>
              <input
                type="datetime-local"
                className="mt-1 w-full h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-foreground">สถานะ</span>
            <select className="mt-1 w-full h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft">
              <option>ฉบับร่าง</option>
              <option>เผยแพร่แล้ว</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-surface-muted"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95"
          >
            บันทึกกิจกรรม
          </button>
        </div>
      </div>
    </div>
  );
};
