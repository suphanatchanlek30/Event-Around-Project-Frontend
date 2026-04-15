// components/public-section/home/events-search/query.ts

import { EventFilterQuery, EventSearchFormState } from './types';

const toStartOfDayIso = (date: string) => `${date}T00:00:00Z`;
const toEndOfDayIso = (date: string) => `${date}T23:59:59Z`;

export const buildEventFilterQuery = (
  form: EventSearchFormState,
): EventFilterQuery => {
  const query: EventFilterQuery = {
    sortBy: form.sortBy,
    sortOrder: form.sortOrder,
  };

  if (form.search.trim()) {
    query.search = form.search.trim();
  }

  if (form.categoryId.trim()) {
    query.categoryId = form.categoryId.trim();
  }

  if (form.status) {
    query.status = form.status;
  }

  if (form.startDate) {
    query.startFrom = toStartOfDayIso(form.startDate);
  }

  if (form.endDate) {
    query.endTo = toEndOfDayIso(form.endDate);
  }

  return query;
};

export const toEventSearchParams = (query: EventFilterQuery) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (!value) {
      return;
    }

    params.set(key, value);
  });

  return params;
};

export const buildEventsApiUrl = (query: EventFilterQuery) => {
  const params = toEventSearchParams(query);
  const queryString = params.toString();

  return queryString
    ? `/api/v1/events?${queryString}`
    : '/api/v1/events';
};
