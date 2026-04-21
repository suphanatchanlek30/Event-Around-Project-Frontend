import {
  AdminApprovalItem,
  AdminCategoryItem,
  AdminEventItem,
  AdminImportItem,
  AdminNavItem,
  AdminStatItem,
} from './types';

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: 'แดชบอร์ด', href: '/admin' },
  { label: 'อีเวนต์', href: '/admin/events' },
  { label: 'รออนุมัติ', href: '/admin/approvals' },
  { label: 'หมวดหมู่', href: '/admin/categories' },
  { label: 'นำเข้า', href: '/admin/imports' },
];

export const ADMIN_STATS: AdminStatItem[] = [
  { id: 'all-events', label: 'กิจกรรมทั้งหมด', value: '128', tone: 'primary' },
  { id: 'pending-approvals', label: 'รออนุมัติ', value: '12', tone: 'warning' },
  { id: 'active-categories', label: 'หมวดหมู่ที่ใช้งาน', value: '14', tone: 'success' },
  { id: 'imports-today', label: 'นำเข้าวันนี้', value: '5', tone: 'muted' },
];

export const ADMIN_EVENTS: AdminEventItem[] = [
  {
    eventId: 3001,
    title: 'Python Workshop',
    organizerFullName: 'Computer Science Club',
    categoryId: 2,
    categoryName: 'Workshop',
    startTime: '2026-04-10T09:00:00+07:00',
    endTime: '2026-04-10T12:00:00+07:00',
    locationName: 'SCI Building Room 501',
    savedCount: 17,
    status: 'PUBLISHED',
  },
  {
    eventId: 3002,
    title: 'Hackathon Intro',
    organizerFullName: 'Engineering Student Union',
    categoryId: 4,
    categoryName: 'Hackathon',
    startTime: '2026-05-01T09:00:00+07:00',
    endTime: '2026-05-01T12:00:00+07:00',
    locationName: 'Innovation Hall',
    savedCount: 5,
    status: 'PENDING_APPROVAL',
  },
  {
    eventId: 3003,
    title: 'Open House 2026',
    organizerFullName: 'Student Affairs Office',
    categoryId: 1,
    categoryName: 'Academic',
    startTime: '2026-05-20T08:00:00+07:00',
    endTime: '2026-05-20T16:00:00+07:00',
    locationName: 'Main Hall',
    savedCount: 0,
    status: 'DRAFT',
  },
  {
    eventId: 3004,
    title: 'Green Campus Day',
    organizerFullName: 'Eco Club',
    categoryId: 3,
    categoryName: 'Community',
    startTime: '2026-06-12T09:00:00+07:00',
    endTime: '2026-06-12T13:00:00+07:00',
    locationName: 'Green Zone',
    savedCount: 2,
    status: 'CANCELLED',
  },
];

export const ADMIN_APPROVALS: AdminApprovalItem[] = [
  {
    eventId: 4001,
    title: 'AI for Campus Seminar',
    organizerFullName: 'AI Innovation Group',
    submittedAt: '17 เม.ย. 2026 08:45',
    categoryId: 1,
    categoryName: 'Academic',
  },
  {
    eventId: 4002,
    title: 'Startup Weekend Bootcamp',
    organizerFullName: 'Entrepreneur Club',
    submittedAt: '16 เม.ย. 2026 14:10',
    categoryId: 2,
    categoryName: 'Workshop',
  },
  {
    eventId: 4003,
    title: 'Night Run Charity',
    organizerFullName: 'Sports Association',
    submittedAt: '15 เม.ย. 2026 19:35',
    categoryId: 3,
    categoryName: 'Community',
  },
];

export const ADMIN_CATEGORIES: AdminCategoryItem[] = [
  {
    categoryId: 1,
    name: 'Academic',
    description: 'กิจกรรมเชิงวิชาการและเสริมทักษะ',
    isActive: true,
  },
  {
    categoryId: 2,
    name: 'Workshop',
    description: 'กิจกรรมฝึกปฏิบัติแบบลงมือทำ',
    isActive: true,
  },
  {
    categoryId: 3,
    name: 'Community',
    description: 'กิจกรรมเพื่อชุมชนและสังคม',
    isActive: false,
  },
  {
    categoryId: 4,
    name: 'Hackathon',
    description: 'กิจกรรมแข่งขันพัฒนาโปรแกรม',
    isActive: true,
  },
];

export const ADMIN_IMPORTS: AdminImportItem[] = [
  {
    importLogId: 91,
    source: 'CSV',
    totalRecords: 120,
    successRecords: 118,
    failedRecords: 2,
    createdAt: '17 เม.ย. 2026 10:00',
    status: 'PARTIAL_SUCCESS',
  },
  {
    importLogId: 90,
    source: 'JSON',
    totalRecords: 30,
    successRecords: 30,
    failedRecords: 0,
    createdAt: '16 เม.ย. 2026 09:30',
    status: 'SUCCESS',
  },
  {
    importLogId: 89,
    source: 'CSV',
    totalRecords: 200,
    successRecords: 0,
    failedRecords: 0,
    createdAt: '16 เม.ย. 2026 08:45',
    status: 'PROCESSING',
  },
];
