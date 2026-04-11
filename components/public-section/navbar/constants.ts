// components/public-section/navbar/constants.ts

import {
  FaHome,
  FaCalendar,
  FaMapMarkerAlt,
  FaUser,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

export const NAV_ITEMS = [
  {
    label: 'หน้าหลัก',
    href: '/',
  },
  {
    label: 'กิจกรรม',
    href: '/events',
  },
  {
    label: 'แผนที่',
    href: '/map',
  },
  {
    label: 'โปรไฟล์',
    href: '/profile',
  },
];

export const MOBILE_NAV_ICONS: Array<{ icon: IconType; label: string }> = [
  { icon: FaHome, label: 'หน้าหลัก' },
  { icon: FaCalendar, label: 'กิจกรรม' },
  { icon: FaMapMarkerAlt, label: 'แผนที่' },
  { icon: FaUser, label: 'โปรไฟล์' },
];

export const NAVBAR_HEIGHT = 'h-16';
export const NAVBAR_PADDING = 'px-4 md:px-6 lg:px-8';
