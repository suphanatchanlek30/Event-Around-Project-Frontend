import Link from 'next/link';
import { ADMIN_APPROVALS } from '../constants';

export const PendingApprovalsTable = () => {
  return (
    <section className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-foreground">รายการรออนุมัติล่าสุด</h2>
        <Link href="/admin/approvals" className="text-sm font-semibold text-link hover:underline">
          ดูทั้งหมด
        </Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="min-w-[720px] w-full">
          <thead className="bg-surface-muted/70">
            <tr className="text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3">ชื่อกิจกรรม</th>
              <th className="px-4 py-3">ผู้จัด</th>
              <th className="px-4 py-3">หมวดหมู่</th>
              <th className="px-4 py-3">เวลาส่งคำขอ</th>
              <th className="px-4 py-3">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {ADMIN_APPROVALS.map((item) => (
              <tr key={item.eventId} className="border-t border-border text-sm">
                <td className="px-4 py-4 font-semibold text-foreground">{item.title}</td>
                <td className="px-4 py-4 text-muted">{item.organizerFullName}</td>
                <td className="px-4 py-4 text-foreground">{item.categoryName}</td>
                <td className="px-4 py-4 text-muted">{item.submittedAt}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="h-8 px-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                    >
                      อนุมัติ
                    </button>
                    <button
                      type="button"
                      className="h-8 px-3 rounded-lg bg-rose-600 text-white text-xs font-semibold"
                    >
                      ไม่อนุมัติ
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
