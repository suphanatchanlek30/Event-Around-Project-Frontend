// components/public-section/home/events-search/types.ts

export type EventStatus = 'PUBLISHED' | 'DRAFT' | 'CANCELLED';
export type EventSortBy = 'startTime' | 'createdAt' | 'updatedAt';
export type SortOrder = 'asc' | 'desc';

export interface EventFilterQuery {
  search?: string;
  categoryId?: string;
  status?: EventStatus;
  startFrom?: string;
  endTo?: string;
  sortBy?: EventSortBy;
  sortOrder?: SortOrder;
}

export interface EventSearchFormState {
  search: string;
  categoryId: string;
  status: '' | EventStatus;
  startDate: string;
  endDate: string;
  sortBy: EventSortBy;
  sortOrder: SortOrder;
}
