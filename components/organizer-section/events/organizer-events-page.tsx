import { ORGANIZER_EVENTS } from '../constants';

const getStatusClassName = (status: string) => {
  if (status === 'เผยแพร่แล้ว') {
    return 'bg-emerald-100 text-emerald-700';
  }

  return 'bg-slate-200 text-slate-600';
};

export const OrganizerEventsPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8">
      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">รายการอีเวนต์</h1>
        <p className="text-sm md:text-base text-muted mt-2 mb-5">
          หน้าอีเวนต์สำหรับจัดการอีเวนต์ทั้งหมดของคุณ
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-[760px] w-full">
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
              {ORGANIZER_EVENTS.map((event) => (
                <tr key={event.id} className="border-t border-border text-sm">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-foreground leading-tight">{event.title}</p>
                  </td>
                  <td className="px-4 py-4 text-muted">{event.location}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClassName(event.status)}`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-medium text-foreground">{event.date}</td>
                  <td className="px-4 py-4 font-semibold text-link">{event.saves}</td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className="text-sm font-semibold text-link hover:underline"
                    >
                      ดูรายละเอียด
                    </button>
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
