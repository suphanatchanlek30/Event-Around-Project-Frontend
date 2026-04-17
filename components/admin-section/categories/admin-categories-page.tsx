import { ADMIN_CATEGORIES } from '../constants';

export const AdminCategoriesPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8">
      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">จัดการหมวดหมู่</h1>
            <p className="text-sm md:text-base text-muted mt-2">
              เพิ่ม แก้ไข และปิดใช้งานหมวดหมู่กิจกรรม
            </p>
          </div>
          <button
            type="button"
            className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95"
          >
            เพิ่มหมวดหมู่ใหม่
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-[780px] w-full">
            <thead className="bg-surface-muted/70">
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">หมวดหมู่</th>
                <th className="px-4 py-3">คำอธิบาย</th>
                <th className="px-4 py-3">สถานะ</th>
                <th className="px-4 py-3">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_CATEGORIES.map((item) => (
                <tr key={item.categoryId} className="border-t border-border text-sm">
                  <td className="px-4 py-4 font-semibold text-foreground">{item.name}</td>
                  <td className="px-4 py-4 text-muted">{item.description}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        item.isActive
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.isActive ? 'ใช้งาน' : 'ปิดใช้งาน'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-3">
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
