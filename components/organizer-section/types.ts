export type OrganizerEventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELLED';

export type OrganizerImportStatus = 'SUCCESS' | 'PARTIAL_SUCCESS' | 'PROCESSING';

export interface OrganizerStatItem {
  id: string;
  label: string;
  value: string;
  badge: string;
  tone: 'primary' | 'success' | 'muted';
}

export interface OrganizerEventItem {
  eventId: number;
  title: string;
  locationName: string;
  startTime: string;
  endTime: string;
  savedCount: number;
  categoryId: number;
  categoryName: string;
  status: OrganizerEventStatus;
}

export interface OrganizerNavItem {
  label: string;
  href: string;
}

export interface OrganizerCategoryItem {
  categoryId: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface OrganizerImportItem {
  importLogId: number;
  source: 'CSV' | 'JSON';
  totalRecords: number;
  successRecords: number;
  failedRecords: number;
  createdAt: string;
  status: OrganizerImportStatus;
}
