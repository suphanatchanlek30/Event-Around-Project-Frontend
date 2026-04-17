import { ORGANIZER_CATEGORIES } from '../constants';

export const OrganizerCategoriesPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8">
      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">หมวดหมู่กิจกรรม</h1>
            <p className="text-sm md:text-base text-muted mt-2">
              จัดการหมวดหมู่สำหรับใช้ตอนสร้างอีเวนต์ในระบบ
            </p>
          </div>
          <button
            type="button"
            className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95"
          >
            เพิ่มหมวดหมู่
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-[720px] w-full">
            <thead className="bg-surface-muted/70">
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">หมวดหมู่</th>
                <th className="px-4 py-3">คำอธิบาย</th>
                <th className="px-4 py-3">สถานะ</th>
                <th className="px-4 py-3">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {ORGANIZER_CATEGORIES.map((category) => (
                <tr key={category.categoryId} className="border-t border-border text-sm">
                  <td className="px-4 py-4 font-semibold text-foreground">{category.name}</td>
                  <td className="px-4 py-4 text-muted">{category.description}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        category.isActive
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {category.isActive ? 'ใช้งาน' : 'ปิดใช้งาน'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button type="button" className="text-sm font-semibold text-link hover:underline">
                        แก้ไข
                      </button>
                      <button type="button" className="text-sm font-semibold text-rose-600 hover:underline">
                        ปิดใช้งาน
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
