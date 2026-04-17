import { OrganizerEventItem, OrganizerNavItem, OrganizerStatItem } from './types';

export const ORGANIZER_NAV_ITEMS: OrganizerNavItem[] = [
  { label: 'แดชบอร์ด', href: '/organizer' },
  { label: 'อีเวนต์', href: '/organizer/events' },
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
    id: 1001,
    title: 'Tech Summit 2024',
    location: 'หอประชุมวิทยาเขตหลัก',
    date: '24 ต.ค. 2024',
    saves: 432,
    status: 'เผยแพร่แล้ว',
  },
  {
    id: 1002,
    title: 'Summer Fest: Night Edition',
    location: 'ลานกิจกรรม North Field',
    date: '12 ส.ค. 2024',
    saves: 0,
    status: 'ฉบับร่าง',
  },
  {
    id: 1003,
    title: 'Open Mic Poetry Night',
    location: 'Student Lounge',
    date: '30 ก.ย. 2024',
    saves: 128,
    status: 'เผยแพร่แล้ว',
  },
];
