// components/public-section/home/category-filter/category-chip.tsx

'use client';

import { CategoryChipProps } from './types';

export const CategoryChip = ({ item, isActive, onSelect }: CategoryChipProps) => {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`inline-flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
        isActive
          ? 'border-primary bg-primary text-primary-foreground shadow-sm'
          : 'border-border bg-surface-muted text-foreground hover:border-primary/30 hover:bg-surface'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{item.label}</span>
    </button>
  );
};
