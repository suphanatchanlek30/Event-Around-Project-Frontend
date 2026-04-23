"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaCloudUploadAlt, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

import {
  CategoryItem,
  EventStatus,
  cancelEvent,
  createEvent,
  deleteEvent,
  getCategories,
  getEventDetail,
  getMyEvents,
  updateEvent,
} from "@/services";
import { uploadImageToCloudinary } from "@/services/cloudinaryService";

type EventFormState = {
  title: string;
  shortDescription: string;
  description: string;
  locationName: string;
  latitude: string;
  longitude: string;
  startTime: string;
  endTime: string;
  categoryId: string;
  coverImageUrl: string;
  status: "DRAFT" | "PUBLISHED";
};

const INITIAL_FORM: EventFormState = {
  title: "",
  shortDescription: "",
  description: "",
  locationName: "",
  latitude: "",
  longitude: "",
  startTime: "",
  endTime: "",
  categoryId: "",
  coverImageUrl: "",
  status: "DRAFT",
};

const formatDate = (dateTime: string) => {
  return new Date(dateTime).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const OrganizerEventsPage = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [events, setEvents] = useState<
    {
      eventId: number;
      title: string;
      status: EventStatus;
      locationName?: string;
      startTime: string;
      endTime: string;
      savedCount?: number;
    }[]
  >([]);

  const [form, setForm] = useState<EventFormState>(INITIAL_FORM);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [search, setSearch] = useState("");

  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch {
      setCategories([]);
    }
  };

  const loadMyEvents = async () => {
    try {
      setIsLoadingEvents(true);
      setErrorMessage("");
      const response = await getMyEvents({
        page: 1,
        pageSize: 50,
        search: search || undefined,
        status: (statusFilter || undefined) as EventStatus | undefined,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      setEvents(response.data);
    } catch {
      setErrorMessage("โหลดรายการอีเวนต์ไม่สำเร็จ");
      setEvents([]);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadMyEvents();
  }, [statusFilter]);

  const handleFormChange = (name: keyof EventFormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditingEventId(null);
  };

  const handleCoverChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setIsUploadingCover(true);
      setErrorMessage("");
      const uploaded = await uploadImageToCloudinary(file, "events/covers");
      setForm((prev) => ({ ...prev, coverImageUrl: uploaded.url }));
    } catch {
      setErrorMessage("อัปโหลดรูปหน้าปกไม่สำเร็จ");
    } finally {
      setIsUploadingCover(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim() || !form.locationName.trim() || !form.categoryId) {
      setErrorMessage("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      if (editingEventId) {
        const response = await updateEvent(editingEventId, {
          title: form.title.trim(),
          shortDescription: form.shortDescription.trim(),
          description: form.description.trim(),
          locationName: form.locationName.trim(),
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
          startTime: form.startTime,
          endTime: form.endTime,
          categoryId: Number(form.categoryId),
          coverImageUrl: form.coverImageUrl || undefined,
          status: form.status,
        });
        setSuccessMessage(response.message || "แก้ไขกิจกรรมสำเร็จ");
      } else {
        const response = await createEvent({
          title: form.title.trim(),
          shortDescription: form.shortDescription.trim(),
          description: form.description.trim(),
          locationName: form.locationName.trim(),
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
          startTime: form.startTime,
          endTime: form.endTime,
          categoryId: Number(form.categoryId),
          coverImageUrl: form.coverImageUrl || undefined,
          status: form.status,
        });
        setSuccessMessage(response.message || "สร้างกิจกรรมสำเร็จ");
      }

      resetForm();
      await loadMyEvents();
    } catch (error) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as { response?: { data?: { message?: string } } }).response?.data?.message
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : "บันทึกกิจกรรมไม่สำเร็จ";
      setErrorMessage(message || "บันทึกกิจกรรมไม่สำเร็จ");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (eventId: number) => {
    try {
      const response = await getEventDetail(eventId);
      const item = response.data;

      setEditingEventId(eventId);
      setForm({
        title: item.title || "",
        shortDescription: item.shortDescription || "",
        description: item.description || "",
        locationName: item.locationName || "",
        latitude: item.latitude ? String(item.latitude) : "",
        longitude: item.longitude ? String(item.longitude) : "",
        startTime: item.startTime ? item.startTime.slice(0, 16) : "",
        endTime: item.endTime ? item.endTime.slice(0, 16) : "",
        categoryId: item.category?.categoryId ? String(item.category.categoryId) : "",
        coverImageUrl: item.coverImageUrl || "",
        status: item.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
      });
      setErrorMessage("");
      setSuccessMessage("");
    } catch {
      setErrorMessage("ดึงรายละเอียดกิจกรรมไม่สำเร็จ");
    }
  };

  const handleDelete = async (eventId: number) => {
    if (!confirm("ยืนยันการลบกิจกรรมนี้ใช่หรือไม่")) {
      return;
    }

    try {
      const response = await deleteEvent(eventId);
      setSuccessMessage(response.message || "ลบกิจกรรมสำเร็จ");
      await loadMyEvents();
    } catch {
      setErrorMessage("ลบกิจกรรมไม่สำเร็จ");
    }
  };

  const handleCancel = async (eventId: number) => {
    const reason = window.prompt("ระบุเหตุผลการยกเลิกกิจกรรม");
    if (!reason?.trim()) {
      return;
    }

    try {
      const response = await cancelEvent(eventId, { reason: reason.trim() });
      setSuccessMessage(response.message || "ยกเลิกกิจกรรมสำเร็จ");
      await loadMyEvents();
    } catch {
      setErrorMessage("ยกเลิกกิจกรรมไม่สำเร็จ");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 space-y-6">
      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">จัดการอีเวนต์ของฉัน</h1>
        <p className="text-sm md:text-base text-muted mt-2">
          สร้าง แก้ไข ลบ และยกเลิกกิจกรรมสำหรับบัญชีผู้จัดกิจกรรม
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 rounded-xl border border-border bg-surface-muted/40 p-4 md:p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={form.title}
              onChange={(event) => handleFormChange("title", event.target.value)}
              placeholder="ชื่อกิจกรรม"
              className="h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            />
            <select
              value={form.categoryId}
              onChange={(event) => handleFormChange("categoryId", event.target.value)}
              className="h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            >
              <option value="">เลือกหมวดหมู่</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={form.shortDescription}
            onChange={(event) => handleFormChange("shortDescription", event.target.value)}
            placeholder="คำอธิบายสั้น"
            className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
          />

          <textarea
            value={form.description}
            onChange={(event) => handleFormChange("description", event.target.value)}
            rows={4}
            placeholder="รายละเอียดกิจกรรม"
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-accent-soft"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="datetime-local"
              value={form.startTime}
              onChange={(event) => handleFormChange("startTime", event.target.value)}
              className="h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            />
            <input
              type="datetime-local"
              value={form.endTime}
              onChange={(event) => handleFormChange("endTime", event.target.value)}
              className="h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={form.locationName}
              onChange={(event) => handleFormChange("locationName", event.target.value)}
              placeholder="สถานที่"
              className="h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            />
            <input
              type="number"
              step="any"
              value={form.latitude}
              onChange={(event) => handleFormChange("latitude", event.target.value)}
              placeholder="Latitude"
              className="h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            />
            <input
              type="number"
              step="any"
              value={form.longitude}
              onChange={(event) => handleFormChange("longitude", event.target.value)}
              placeholder="Longitude"
              className="h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="h-11 rounded-xl border border-dashed border-border bg-surface text-sm text-link font-medium inline-flex items-center justify-center gap-2 hover:bg-surface-muted cursor-pointer">
              <FaCloudUploadAlt />
              {isUploadingCover ? "กำลังอัปโหลด..." : "อัปโหลดรูปปก"}
              <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
            </label>
            <select
              value={form.status}
              onChange={(event) => handleFormChange("status", event.target.value as "DRAFT" | "PUBLISHED")}
              className="h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            >
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
          </div>

          {form.coverImageUrl ? (
            <p className="text-xs text-emerald-700">อัปโหลดรูปปกเรียบร้อยแล้ว</p>
          ) : null}

          {errorMessage ? <p className="text-sm text-rose-700">{errorMessage}</p> : null}
          {successMessage ? <p className="text-sm text-emerald-700">{successMessage}</p> : null}

          <div className="flex justify-end gap-2">
            <button type="button" onClick={resetForm} className="h-10 px-4 rounded-xl bg-surface-muted text-muted text-sm font-semibold">
              ล้างฟอร์ม
            </button>
            <button type="submit" disabled={isSubmitting} className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95 disabled:opacity-70">
              {isSubmitting ? "กำลังบันทึก..." : editingEventId ? "บันทึกการแก้ไข" : "สร้างกิจกรรม"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold text-foreground">อีเวนต์ของฉัน</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ค้นหาชื่อกิจกรรม"
              className="h-10 rounded-xl border border-border bg-surface px-3 text-sm outline-none"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-10 rounded-xl border border-border bg-surface px-3 text-sm outline-none"
            >
              <option value="">ทุกสถานะ</option>
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <button type="button" onClick={loadMyEvents} className="h-10 px-4 rounded-xl border border-border text-sm font-semibold">
              ค้นหา
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-190 w-full">
            <thead className="bg-surface-muted/70">
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">ชื่อกิจกรรม</th>
                <th className="px-4 py-3">สถานที่</th>
                <th className="px-4 py-3">สถานะ</th>
                <th className="px-4 py-3">วันที่</th>
                <th className="px-4 py-3">บันทึก</th>
                <th className="px-4 py-3">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingEvents ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted">กำลังโหลด...</td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted">ยังไม่มีรายการกิจกรรม</td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.eventId} className="border-t border-border text-sm">
                    <td className="px-4 py-4 font-semibold text-foreground">{event.title}</td>
                    <td className="px-4 py-4 text-muted inline-flex items-center gap-2">
                      <FaMapMarkerAlt className="text-xs" />
                      {event.locationName || "-"}
                    </td>
                    <td className="px-4 py-4">{event.status}</td>
                    <td className="px-4 py-4 text-foreground">{formatDate(event.startTime)}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold">
                        <FaHeart className="text-sm" />
                        {(event.savedCount || 0).toLocaleString("en-US")}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => handleEdit(event.eventId)} className="text-sm font-semibold text-link hover:underline">
                          แก้ไข
                        </button>
                        <button type="button" onClick={() => handleCancel(event.eventId)} className="text-sm font-semibold text-amber-600 hover:underline">
                          ยกเลิก
                        </button>
                        <button type="button" onClick={() => handleDelete(event.eventId)} className="text-sm font-semibold text-rose-600 hover:underline">
                          ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
