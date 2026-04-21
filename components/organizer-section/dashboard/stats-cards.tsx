import { FaCheckCircle, FaHeart, FaSignal, FaFileAlt } from 'react-icons/fa';
import { ORGANIZER_STATS } from '../constants';

const getToneClass = (tone: 'primary' | 'success' | 'muted') => {
  if (tone === 'success') {
    return 'bg-emerald-100 text-emerald-700';
  }
  if (tone === 'muted') {
    return 'bg-slate-100 text-slate-600';
  }
  return 'bg-indigo-100 text-indigo-600';
};

const getIcon = (id: string) => {
  if (id === 'published-events') {
    return <FaCheckCircle className="text-emerald-500" />;
  }
  if (id === 'draft-events') {
    return <FaFileAlt className="text-slate-400" />;
  }
  if (id === 'total-saves') {
    return <FaHeart className="text-indigo-500" />;
  }
  return <FaSignal className="text-indigo-500" />;
};

export const StatsCards = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
      {ORGANIZER_STATS.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl bg-surface border border-border p-4 md:p-5 shadow-sm"
        >
          <p className="text-xs md:text-sm font-medium uppercase tracking-wide text-muted mb-2">
            {item.label}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-4xl md:text-5xl font-bold text-foreground">{item.value}</p>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${getToneClass(item.tone)}`}
              >
                {item.badge}
              </span>
              <span className="text-base">{getIcon(item.id)}</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
