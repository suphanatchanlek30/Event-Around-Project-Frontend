import {
  OrganizerCategoryItem,
  OrganizerEventItem,
  OrganizerImportItem,
  OrganizerNavItem,
  OrganizerStatItem,
} from './types';

export const ORGANIZER_NAV_ITEMS: OrganizerNavItem[] = [
  { label: 'แดชบอร์ด', href: '/organizer' },
  { label: 'อีเวนต์', href: '/organizer/events' },
  { label: 'หมวดหมู่', href: '/organizer/categories' },
  { label: 'นำเข้า', href: '/organizer/imports' },
];

export const ORGANIZER_STATS: OrganizerStatItem[] = [
  {
    id: 'total-events',
    label: 'กิจกรรมทั้งหมด',
    value: '24',
    badge: '+12%',
    tone: 'primary',
  },
  {
    id: 'published-events',
    label: 'เผยแพร่แล้ว',
    value: '18',
    badge: 'พร้อมใช้งาน',
    tone: 'success',
  },
  {
    id: 'draft-events',
    label: 'ฉบับร่าง',
    value: '06',
    badge: 'รอตรวจ',
    tone: 'muted',
  },
  {
    id: 'total-saves',
    label: 'ยอดบันทึกทั้งหมด',
    value: '1.2k',
    badge: 'ใหม่',
    tone: 'primary',
  },
];

export const ORGANIZER_EVENTS: OrganizerEventItem[] = [
  {
    eventId: 1001,
    title: 'Tech Summit 2024',
    locationName: 'หอประชุมวิทยาเขตหลัก',
    startTime: '2026-04-24T16:00:00+07:00',
    endTime: '2026-04-24T19:00:00+07:00',
    savedCount: 432,
    categoryId: 1,
    categoryName: 'Academic',
    status: 'PUBLISHED',
  },
  {
    eventId: 1002,
    title: 'Summer Fest: Night Edition',
    locationName: 'ลานกิจกรรม North Field',
    startTime: '2026-05-12T18:00:00+07:00',
    endTime: '2026-05-12T22:00:00+07:00',
    savedCount: 0,
    categoryId: 3,
    categoryName: 'Community',
    status: 'DRAFT',
  },
  {
    eventId: 1003,
    title: 'Open Mic Poetry Night',
    locationName: 'Student Lounge',
    startTime: '2026-06-30T18:30:00+07:00',
    endTime: '2026-06-30T21:00:00+07:00',
    savedCount: 128,
    categoryId: 2,
    categoryName: 'Workshop',
    status: 'PUBLISHED',
  },
];

export const ORGANIZER_CATEGORIES: OrganizerCategoryItem[] = [
  {
    categoryId: 1,
    name: 'Academic',
    description: 'กิจกรรมเชิงวิชาการและเสริมทักษะ',
    isActive: true,
  },
  {
    categoryId: 2,
    name: 'Workshop',
    description: 'กิจกรรมลงมือปฏิบัติแบบเป็นขั้นตอน',
    isActive: true,
  },
  {
    categoryId: 3,
    name: 'Community',
    description: 'กิจกรรมเพื่อชุมชนและการมีส่วนร่วม',
    isActive: false,
  },
];

export const ORGANIZER_IMPORTS: OrganizerImportItem[] = [
  {
    importLogId: 11,
    source: 'JSON',
    totalRecords: 20,
    successRecords: 19,
    failedRecords: 1,
    createdAt: '16 เม.ย. 2026, 13:20',
    status: 'PARTIAL_SUCCESS',
  },
  {
    importLogId: 10,
    source: 'CSV',
    totalRecords: 10,
    successRecords: 10,
    failedRecords: 0,
    createdAt: '15 เม.ย. 2026, 09:00',
    status: 'SUCCESS',
  },
  {
    importLogId: 9,
    source: 'CSV',
    totalRecords: 30,
    successRecords: 0,
    failedRecords: 0,
    createdAt: '14 เม.ย. 2026, 18:45',
    status: 'PROCESSING',
  },
];
