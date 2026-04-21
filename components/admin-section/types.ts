export type AdminEventStatus =
  | 'PUBLISHED'
  | 'PENDING_APPROVAL'
  | 'DRAFT'
  | 'CANCELLED';

export type AdminImportStatus = 'SUCCESS' | 'PARTIAL_SUCCESS' | 'PROCESSING';

export interface AdminNavItem {
  label: string;
  href: string;
}

export interface AdminStatItem {
  id: string;
  label: string;
  value: string;
  tone: 'primary' | 'success' | 'warning' | 'muted';
}

export interface AdminEventItem {
  eventId: number;
  title: string;
  organizerFullName: string;
  categoryId: number;
  categoryName: string;
  startTime: string;
  endTime: string;
  locationName: string;
  savedCount: number;
  status: AdminEventStatus;
}

export interface AdminApprovalItem {
  eventId: number;
  title: string;
  organizerFullName: string;
  submittedAt: string;
  categoryId: number;
  categoryName: string;
}

export interface AdminCategoryItem {
  categoryId: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface AdminImportItem {
  importLogId: number;
  source: 'CSV' | 'JSON';
  totalRecords: number;
  successRecords: number;
  failedRecords: number;
  createdAt: string;
  status: AdminImportStatus;
}
