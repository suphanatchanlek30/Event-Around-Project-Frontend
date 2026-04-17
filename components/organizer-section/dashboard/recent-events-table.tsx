import { FaHeart } from 'react-icons/fa';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { ORGANIZER_EVENTS } from '../constants';

const getStatusClassName = (status: string) => {
  if (status === 'เผยแพร่แล้ว') {
    return 'bg-emerald-100 text-emerald-700';
  }
  return 'bg-slate-200 text-slate-600';
};

export const RecentEventsTable = () => {
  return (
    <section className="rounded-2xl bg-surface border border-border shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">กิจกรรมล่าสุด</h2>
        <div className="flex items-center gap-2 text-muted">
          <button
            type="button"
            className="w-8 h-8 rounded-full hover:bg-surface-muted flex items-center justify-center"
            aria-label="ตัวกรอง"
          >
            <FiFilter />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full hover:bg-surface-muted flex items-center justify-center"
            aria-label="ค้นหา"
          >
            <FiSearch />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted">
              <th className="pb-2">ชื่ออีเวนต์</th>
              <th className="pb-2">สถานะ</th>
              <th className="pb-2">วันที่</th>
              <th className="pb-2">บันทึก</th>
              <th className="pb-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {ORGANIZER_EVENTS.map((event) => (
              <tr key={event.id} className="bg-surface-muted/60 rounded-xl">
                <td className="p-3 rounded-l-xl">
                  <p className="font-semibold text-foreground leading-tight">{event.title}</p>
                  <p className="text-sm text-muted mt-1">{event.location}</p>
                </td>
                <td className="p-3">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClassName(event.status)}`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="p-3 font-medium text-foreground">{event.date}</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold">
                    <FaHeart className="text-sm" />
                    {event.saves}
                  </span>
                </td>
                <td className="p-3 rounded-r-xl">
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

      <div className="mt-4 pt-4 border-t border-border text-center">
        <button type="button" className="text-sm font-semibold text-link hover:underline">
          ดูอีเวนต์ทั้งหมด
        </button>
      </div>
    </section>
  );
};
