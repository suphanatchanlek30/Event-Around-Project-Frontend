// components/public-section/home/category-filter/constants.ts

import {
  FaBasketballBall,
  FaBookOpen,
  FaBriefcase,
  FaHandsHelping,
  FaMicrophone,
  FaTools,
} from 'react-icons/fa';
import { CategoryItem } from './types';

export const MOCK_CATEGORIES: CategoryItem[] = [
  {
    id: 'academic',
    label: 'วิชาการ',
    icon: FaBookOpen,
  },
  {
    id: 'workshop',
    label: 'เวิร์กช็อป',
    icon: FaTools,
  },
  {
    id: 'sports',
    label: 'กีฬา',
    icon: FaBasketballBall,
  },
  {
    id: 'volunteer',
    label: 'อาสา',
    icon: FaHandsHelping,
  },
  {
    id: 'career',
    label: 'อาชีพ',
    icon: FaBriefcase,
  },
  {
    id: 'entertainment',
    label: 'บันเทิง',
    icon: FaMicrophone,
  },
];
