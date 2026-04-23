// components/public-section/home/events-search/constants.ts

import { EventSearchFormState } from './types';

export const EVENT_STATUS_OPTIONS = [
//   { label: 'ทุกสถานะ', value: '' },
  { label: 'Published', value: 'PUBLISHED' },
//   { label: 'Draft', value: 'DRAFT' },
//   { label: 'Cancelled', value: 'CANCELLED' },
] as const;

export const EVENT_SORT_BY_OPTIONS = [
  { label: 'วันเริ่มกิจกรรม', value: 'startTime' },
  { label: 'วันที่สร้าง', value: 'createdAt' },
  { label: 'วันที่อัปเดต', value: 'updatedAt' },
] as const;

export const EVENT_SORT_ORDER_OPTIONS = [
  { label: 'น้อยไปมาก (asc)', value: 'asc' },
  { label: 'มากไปน้อย (desc)', value: 'desc' },
] as const;

export const DEFAULT_EVENT_SEARCH_FORM: EventSearchFormState = {
  search: '',
  categoryId: '',
  status: '',
  startDate: '',
  endDate: '',
  sortBy: 'startTime',
  sortOrder: 'asc',
};
