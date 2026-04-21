import { ADMIN_STATS } from '../constants';

const getToneClass = (tone: 'primary' | 'success' | 'warning' | 'muted') => {
  if (tone === 'success') {
    return 'bg-emerald-100 text-emerald-700';
  }
  if (tone === 'warning') {
    return 'bg-amber-100 text-amber-700';
  }
  if (tone === 'muted') {
    return 'bg-slate-100 text-slate-700';
  }
  return 'bg-indigo-100 text-indigo-700';
};

export const AdminStatsCards = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
      {ADMIN_STATS.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl bg-surface border border-border p-4 md:p-5 shadow-sm"
        >
          <p className="text-xs uppercase tracking-wide font-semibold text-muted">{item.label}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-4xl font-bold text-foreground">{item.value}</p>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getToneClass(item.tone)}`}>
              อัปเดตล่าสุด
            </span>
          </div>
        </article>
      ))}
    </section>
  );
};
