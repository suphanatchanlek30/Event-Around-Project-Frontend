export type OrganizerEventStatus = 'เผยแพร่แล้ว' | 'ฉบับร่าง';

export interface OrganizerStatItem {
  id: string;
  label: string;
  value: string;
  badge: string;
  tone: 'primary' | 'success' | 'muted';
}

export interface OrganizerEventItem {
  id: number;
  title: string;
  location: string;
  date: string;
  saves: number;
  status: OrganizerEventStatus;
}

export interface OrganizerNavItem {
  label: string;
  href: string;
}
