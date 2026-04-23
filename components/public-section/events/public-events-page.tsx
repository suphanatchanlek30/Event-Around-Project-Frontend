"use client";

import { useEffect, useState } from "react";

import {
  EventListMeta,
  EventSummary,
  getActiveEvents,
  getPublicEvents,
  getUpcomingEvents,
} from "@/services";

import EventList from "./EventList";
import EventSearch, { EventSearchFilters } from "./EventSearch";

const INITIAL_FILTERS: EventSearchFilters = {
  search: "",
  categoryId: undefined,
  tab: "latest",
};

export default function PublicEventsPage() {
  const [filters, setFilters] = useState<EventSearchFilters>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [meta, setMeta] = useState<EventListMeta>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);

        const params = {
          page,
          pageSize: 9,
          search: filters.search || undefined,
          categoryId: filters.categoryId,
          sortBy: "startTime",
          sortOrder: "asc" as const,
        };

        const response =
          filters.tab === "upcoming"
            ? await getUpcomingEvents(params)
            : filters.tab === "active"
              ? await getActiveEvents(params)
              : await getPublicEvents({
                  ...params,
                  status: "PUBLISHED",
                });

        setEvents(response.data);
        setMeta(response.meta);
      } catch {
        setEvents([]);
        setMeta(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [filters, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <EventSearch
        value={filters}
        onChange={(nextFilters) => {
          setPage(1);
          setFilters(nextFilters);
        }}
      />
      <EventList events={events} isLoading={isLoading} meta={meta} onPageChange={setPage} />
    </div>
  );
}
