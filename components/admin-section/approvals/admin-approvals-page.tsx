import { ADMIN_APPROVALS } from '../constants';

export const AdminApprovalsPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8">
      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">อีเวนต์รออนุมัติ</h1>
        <p className="text-sm md:text-base text-muted mt-2 mb-5">
          ตรวจสอบความครบถ้วนของข้อมูลก่อนอนุมัติให้เผยแพร่
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-[780px] w-full">
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
      </div>
    </section>
  );
};
