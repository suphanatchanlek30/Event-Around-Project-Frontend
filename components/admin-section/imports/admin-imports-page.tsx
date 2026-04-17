import { ADMIN_IMPORTS } from '../constants';

const getStatusClassName = (status: string) => {
  if (status === 'SUCCESS') {
    return 'bg-emerald-100 text-emerald-700';
  }
  if (status === 'PARTIAL_SUCCESS') {
    return 'bg-amber-100 text-amber-700';
  }
  return 'bg-indigo-100 text-indigo-700';
};

const getStatusLabel = (status: string) => {
  if (status === 'SUCCESS') {
    return 'สำเร็จ';
  }
  if (status === 'PARTIAL_SUCCESS') {
    return 'มีข้อผิดพลาด';
  }
  return 'กำลังประมวลผล';
};

export const AdminImportsPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 space-y-5">
      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">นำเข้าข้อมูลระบบ</h1>
            <p className="text-sm md:text-base text-muted mt-2">
              จัดการนำเข้าข้อมูลกิจกรรมจำนวนมากในรูปแบบ CSV และ JSON
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="h-10 px-4 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-surface-muted"
            >
              นำเข้า CSV
            </button>
            <button
              type="button"
              className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95"
            >
              นำเข้า JSON
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-foreground mb-4">ประวัติการนำเข้า</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-[860px] w-full">
            <thead className="bg-surface-muted/70">
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Import ID</th>
                <th className="px-4 py-3">ประเภท</th>
                <th className="px-4 py-3">ทั้งหมด</th>
                <th className="px-4 py-3">สำเร็จ</th>
                <th className="px-4 py-3">ล้มเหลว</th>
                <th className="px-4 py-3">สถานะ</th>
                <th className="px-4 py-3">เวลา</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_IMPORTS.map((item) => (
                <tr key={item.importLogId} className="border-t border-border text-sm">
                  <td className="px-4 py-4 font-semibold text-foreground">#{item.importLogId}</td>
                  <td className="px-4 py-4 text-muted">{item.source}</td>
                  <td className="px-4 py-4 text-foreground">{item.totalRecords}</td>
                  <td className="px-4 py-4 text-emerald-700 font-semibold">{item.successRecords}</td>
                  <td className="px-4 py-4 text-rose-600 font-semibold">{item.failedRecords}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClassName(item.status)}`}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted">{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
