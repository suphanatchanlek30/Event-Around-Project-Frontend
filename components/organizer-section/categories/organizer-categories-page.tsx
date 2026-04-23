"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import {
  CategoryItem,
  createCategory,
  deactivateCategory,
  getCategories,
  getCategoryDetail,
  updateCategory,
} from "@/services";

const INITIAL_FORM = {
  name: "",
  description: "",
};

export const OrganizerCategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [includeInactive, setIncludeInactive] = useState(true);
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submitLabel = useMemo(() => {
    return editingCategoryId ? "บันทึกการแก้ไข" : "เพิ่มหมวดหมู่";
  }, [editingCategoryId]);

  const loadCategories = async (nextIncludeInactive = includeInactive) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await getCategories({ includeInactive: nextIncludeInactive });
      setCategories(response.data);
    } catch {
      setErrorMessage("ดึงหมวดหมู่ไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setFormValues(INITIAL_FORM);
    setEditingCategoryId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.name.trim()) {
      setErrorMessage("กรุณากรอกชื่อหมวดหมู่");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      if (editingCategoryId) {
        const response = await updateCategory(editingCategoryId, {
          name: formValues.name.trim(),
          description: formValues.description.trim(),
        });
        setSuccessMessage(response.message || "แก้ไขหมวดหมู่สำเร็จ");
      } else {
        const response = await createCategory({
          name: formValues.name.trim(),
          description: formValues.description.trim(),
        });
        setSuccessMessage(response.message || "สร้างหมวดหมู่สำเร็จ");
      }

      resetForm();
      await loadCategories();
    } catch (error) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as { response?: { data?: { message?: string } } }).response?.data?.message
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : "บันทึกหมวดหมู่ไม่สำเร็จ";
      setErrorMessage(message || "บันทึกหมวดหมู่ไม่สำเร็จ");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (categoryId: number) => {
    try {
      setErrorMessage("");
      const response = await getCategoryDetail(categoryId);
      setEditingCategoryId(categoryId);
      setFormValues({
        name: response.data.name,
        description: response.data.description,
      });
    } catch {
      setErrorMessage("ดึงรายละเอียดหมวดหมู่ไม่สำเร็จ");
    }
  };

  const handleDeactivate = async (categoryId: number) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      const response = await deactivateCategory(categoryId);
      setSuccessMessage(response.message || "ปิดใช้งานหมวดหมู่สำเร็จ");
      await loadCategories();
    } catch {
      setErrorMessage("ปิดใช้งานหมวดหมู่ไม่สำเร็จ");
    }
  };

  const handleToggleIncludeInactive = async () => {
    const nextValue = !includeInactive;
    setIncludeInactive(nextValue);
    await loadCategories(nextValue);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8">
      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">หมวดหมู่กิจกรรม</h1>
            <p className="text-sm md:text-base text-muted mt-2">
              จัดการหมวดหมู่สำหรับใช้ตอนสร้างอีเวนต์ในระบบ
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggleIncludeInactive}
            className="h-10 px-4 rounded-xl border border-border text-sm font-semibold hover:bg-surface-muted"
          >
            {includeInactive ? "ซ่อนหมวดที่ปิดใช้งาน" : "แสดงหมวดที่ปิดใช้งาน"}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] gap-3 rounded-xl border border-border p-3"
        >
          <input
            type="text"
            placeholder="ชื่อหมวดหมู่"
            value={formValues.name}
            onChange={(event) =>
              setFormValues((prev) => ({ ...prev, name: event.target.value }))
            }
            className="h-10 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary"
          />
          <input
            type="text"
            placeholder="คำอธิบาย"
            value={formValues.description}
            onChange={(event) =>
              setFormValues((prev) => ({ ...prev, description: event.target.value }))
            }
            className="h-10 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-70"
          >
            {isSubmitting ? "กำลังบันทึก..." : submitLabel}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="h-10 px-4 rounded-lg border border-border text-sm font-semibold"
          >
            ล้างฟอร์ม
          </button>
        </form>

        {errorMessage ? (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>
        ) : null}
        {successMessage ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{successMessage}</p>
        ) : null}

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-180 w-full">
            <thead className="bg-surface-muted/70">
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">หมวดหมู่</th>
                <th className="px-4 py-3">คำอธิบาย</th>
                <th className="px-4 py-3">สถานะ</th>
                <th className="px-4 py-3">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted">
                    กำลังโหลดหมวดหมู่...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted">
                    ยังไม่มีข้อมูลหมวดหมู่
                  </td>
                </tr>
              ) : (
                categories.map((item) => (
                  <tr key={item.categoryId} className="border-t border-border text-sm">
                    <td className="px-4 py-4 font-semibold text-foreground">{item.name}</td>
                    <td className="px-4 py-4 text-muted">{item.description || "-"}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {item.isActive ? "ใช้งาน" : "ปิดใช้งาน"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleEdit(item.categoryId)}
                          className="text-sm font-semibold text-link hover:underline"
                        >
                          แก้ไข
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeactivate(item.categoryId)}
                          disabled={!item.isActive}
                          className="text-sm font-semibold text-rose-600 hover:underline disabled:opacity-40"
                        >
                          ปิดใช้งาน
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
