'use client';

import { useMemo, useState } from 'react';
import { FaCloudUploadAlt, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { FiCheckCircle, FiEye, FiXCircle } from 'react-icons/fi';
import { ADMIN_EVENTS } from '../constants';

const getStatusClassName = (status: string) => {
  if (status === 'PUBLISHED') {
    return 'bg-emerald-100 text-emerald-700';
  }
  if (status === 'PENDING_APPROVAL') {
    return 'bg-amber-100 text-amber-700';
  }
  if (status === 'DRAFT') {
    return 'bg-slate-200 text-slate-700';
  }
  return 'bg-rose-100 text-rose-700';
};

const getStatusLabel = (status: string) => {
  if (status === 'PUBLISHED') {
    return 'เผยแพร่แล้ว';
  }
  if (status === 'PENDING_APPROVAL') {
    return 'รออนุมัติ';
  }
  if (status === 'DRAFT') {
    return 'ฉบับร่าง';
  }
  return 'ยกเลิก';
};

const formatDate = (dateTime: string) => {
  return new Date(dateTime).toLocaleDateString('th-TH', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const AdminEventsPage = () => {
  const [title, setTitle] = useState('Annual Tech Symposium 2024');
  const [category, setCategory] = useState('Academic');
  const [shortDescription, setShortDescription] = useState(
    'เวทีแบ่งปันองค์ความรู้และแนวโน้มเทคโนโลยีสำหรับนักศึกษา',
  );
  const [description, setDescription] = useState(
    'กิจกรรมสัมมนาภาพรวมเทคโนโลยี AI และ Cloud พร้อมผู้บรรยายรับเชิญจากภาคอุตสาหกรรม',
  );
  const [location, setLocation] = useState('Main Campus Auditorium');
  const [startTime, setStartTime] = useState('2026-04-24T16:00');
  const [endTime, setEndTime] = useState('2026-04-24T19:00');

  const previewDate = useMemo(() => {
    if (!startTime) {
      return 'วันที่ยังไม่ระบุ';
    }

    const parsed = new Date(startTime);
    return parsed.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }, [startTime]);

  const previewTimeRange = useMemo(() => {
    if (!startTime || !endTime) {
      return 'เวลาไม่ระบุ';
    }

    const start = new Date(startTime).toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const end = new Date(endTime).toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return `${start} - ${end}`;
  }, [startTime, endTime]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 space-y-6">
      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">สร้างและจัดการอีเวนต์</h1>
        <p className="text-sm md:text-base text-muted mt-2">
          แบบฟอร์มสร้างอีเวนต์แบบคงที่สำหรับผู้ดูแล พร้อมพรีวิวการ์ดก่อนเผยแพร่
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_1fr] gap-5 mt-5">
          <div className="rounded-xl border border-border bg-surface-muted/40 p-4 md:p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">ชื่อกิจกรรม</span>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="เช่น Annual Tech Symposium 2024"
                  className="mt-1 w-full h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">หมวดหมู่</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-1 w-full h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
                >
                  <option>Academic</option>
                  <option>Workshop</option>
                  <option>Community</option>
                  <option>Hackathon</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">รูปหน้าปก</span>
                <button
                  type="button"
                  className="mt-1 w-full h-11 rounded-xl border border-dashed border-border bg-surface text-sm text-link font-medium inline-flex items-center justify-center gap-2 hover:bg-surface-muted"
                >
                  <FaCloudUploadAlt />
                  อัปโหลดรูปปก
                </button>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-foreground">คำอธิบายสั้น</span>
              <input
                type="text"
                value={shortDescription}
                onChange={(event) => setShortDescription(event.target.value)}
                className="mt-1 w-full h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">รายละเอียด</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-accent-soft"
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm font-medium text-foreground">เวลาเริ่ม</span>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  className="mt-1 w-full h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">เวลาสิ้นสุด</span>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  className="mt-1 w-full h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-foreground">สถานที่</span>
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="mt-1 w-full h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
              />
            </label>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                className="h-10 px-4 rounded-xl bg-surface-muted text-muted text-sm font-semibold"
              >
                บันทึกเป็นฉบับร่าง
              </button>
              <button
                type="button"
                className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95"
              >
                เผยแพร่กิจกรรม
              </button>
            </div>
          </div>

          <aside className="space-y-3">
            <h2 className="text-base md:text-lg font-semibold text-foreground">Live Preview</h2>
            <article className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-indigo-800 via-purple-700 to-violet-600" />
              <div className="p-4 space-y-2">
                <span className="inline-flex px-2 py-1 rounded-full text-[11px] font-semibold bg-indigo-100 text-indigo-700">
                  {category}
                </span>
                <h3 className="text-lg font-semibold text-foreground leading-tight">
                  {title || 'ชื่อกิจกรรม'}
                </h3>
                <p className="text-sm text-muted line-clamp-2">
                  {shortDescription || 'คำอธิบายสั้นของกิจกรรม'}
                </p>

                <div className="pt-1 space-y-1 text-sm text-muted">
                  <p className="inline-flex items-center gap-2">
                    <FaRegClock className="text-xs" />
                    {previewDate} | {previewTimeRange}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <FaMapMarkerAlt className="text-xs" />
                    {location || 'ยังไม่ระบุสถานที่'}
                  </p>
                </div>
              </div>
            </article>

            <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-3">
              <p className="text-xs text-indigo-700">
                โหมดพรีวิวนี้ใช้ตรวจสอบรูปแบบการ์ดก่อนส่งคำสั่งสร้างหรือเผยแพร่
              </p>
            </div>
          </aside>
        </div>
      </div>

      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-foreground mb-4">รายการอีเวนต์ทั้งหมด</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-[860px] w-full">
            <thead className="bg-surface-muted/70">
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">ชื่อกิจกรรม</th>
                <th className="px-4 py-3">ผู้จัด</th>
                <th className="px-4 py-3">หมวดหมู่</th>
                <th className="px-4 py-3">วันที่</th>
                <th className="px-4 py-3">สถานะ</th>
                <th className="px-4 py-3">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_EVENTS.map((event) => (
                <tr key={event.eventId} className="border-t border-border text-sm">
                  <td className="px-4 py-4 font-semibold text-foreground">{event.title}</td>
                  <td className="px-4 py-4 text-muted">{event.organizerFullName}</td>
                  <td className="px-4 py-4 text-foreground">{event.categoryName}</td>
                  <td className="px-4 py-4 text-muted">{formatDate(event.startTime)}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClassName(event.status)}`}
                    >
                      {getStatusLabel(event.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100"
                      >
                        <FiEye className="text-sm" />
                        ดู
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100"
                      >
                        <FiCheckCircle className="text-sm" />
                        Publish
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold hover:bg-rose-100"
                      >
                        <FiXCircle className="text-sm" />
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
