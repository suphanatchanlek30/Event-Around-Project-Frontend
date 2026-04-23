// components/public-section/home/category-filter/types.ts

import { IconType } from 'react-icons';

export interface CategoryItem {
  id: string;
  label: string;
  icon: IconType;
}

export interface CategoryChipProps {
  item: CategoryItem;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export interface CategoryFilterProps {
  className?: string;
  categories: CategoryItem[];
  activeCategoryId: string;
  onChange: (id: string) => void;
}
