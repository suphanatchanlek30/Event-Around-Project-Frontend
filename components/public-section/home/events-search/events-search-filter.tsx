// components/public-section/home/events-search/events-search-filter.tsx

'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCrosshairs, FaSearch, FaSlidersH } from 'react-icons/fa';
import {
  DEFAULT_EVENT_SEARCH_FORM,
  EVENT_SORT_BY_OPTIONS,
  EVENT_SORT_ORDER_OPTIONS,
  EVENT_STATUS_OPTIONS,
} from './constants';
import { buildEventFilterQuery, toEventSearchParams } from './query';
import { EventSearchFormState } from './types';

export const EventsSearchFilter = () => {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [form, setForm] = useState<EventSearchFormState>(DEFAULT_EVENT_SEARCH_FORM);

  const hasAdvancedFilter = useMemo(() => {
    return Boolean(
      form.categoryId ||
        form.status ||
        form.startDate ||
        form.endDate ||
        form.sortBy !== 'startTime' ||
        form.sortOrder !== 'asc',
    );
  }, [form]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = buildEventFilterQuery(form);
    const params = toEventSearchParams(query);
    const queryString = params.toString();

    router.push(queryString ? `/events?${queryString}` : '/events');
  };

  const handleReset = () => {
    setForm(DEFAULT_EVENT_SEARCH_FORM);
    router.push('/events');
  };

  return (
    <section className="mt-5 md:mt-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-surface border border-border shadow-sm p-2.5 md:p-3"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex-1 flex items-center rounded-full bg-surface-muted px-3.5 py-2.5 md:py-3">
            <FaSearch className="w-4 h-4 text-muted mr-3" />
            <input
              value={form.search}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, search: event.target.value }))
              }
              placeholder="ค้นหากิจกรรม เวิร์กช็อป..."
              className="w-full bg-transparent outline-none text-foreground placeholder:text-muted text-sm md:text-base"
            />
          </div>

          <button
            type="button"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-sm text-primary font-medium hover:bg-accent-soft transition-colors"
          >
            <FaCrosshairs className="w-4 h-4" />
            Use current location
          </button>

          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="h-10 w-10 md:h-11 md:w-11 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center hover:brightness-95 transition"
            aria-label="Toggle filters"
          >
            <FaSlidersH className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>

        {isFilterOpen ? (
          <div className="mt-3.5 md:mt-4 border-t border-border pt-3.5 md:pt-4 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3">
              <label className="space-y-1.5">
                <span className="text-xs text-muted">Category ID</span>
                <input
                  type="number"
                  min={1}
                  value={form.categoryId}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, categoryId: event.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="เช่น 3"
                />
              </label>

              <label className="space-y-1.5">
                <span className="text-xs text-muted">Status</span>
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      status: event.target.value as EventSearchFormState['status'],
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  {EVENT_STATUS_OPTIONS.map((option) => (
                    <option key={option.value || 'all'} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1.5">
                <span className="text-xs text-muted">Sort By</span>
                <select
                  value={form.sortBy}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      sortBy: event.target.value as EventSearchFormState['sortBy'],
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  {EVENT_SORT_BY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1.5">
                <span className="text-xs text-muted">Sort Order</span>
                <select
                  value={form.sortOrder}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      sortOrder: event.target.value as EventSearchFormState['sortOrder'],
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  {EVENT_SORT_ORDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1.5">
                <span className="text-xs text-muted">Start Date</span>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, startDate: event.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>

              <label className="space-y-1.5">
                <span className="text-xs text-muted">End Date</span>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, endDate: event.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-lg border border-border text-sm font-medium text-muted hover:bg-surface-muted transition"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-95 transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {hasAdvancedFilter ? (
          <p className="mt-3 text-xs text-muted">
            กำลังใช้ตัวกรองเพิ่มเติมอยู่
          </p>
        ) : null}
      </form>
    </section>
  );
};
