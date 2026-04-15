// components/public-section/home/category-filter/category-filter.tsx

'use client';

import { useState } from 'react';
import { MOCK_CATEGORIES } from './constants';
import { CategoryChip } from './category-chip';
import { CategoryFilterProps } from './types';

export const CategoryFilter = ({ className = '' }: CategoryFilterProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState(MOCK_CATEGORIES[0]?.id ?? '');

  return (
    <section className={`mt-4 md:mt-5 ${className}`}>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-foreground">เมนูลัด</h3>

        <div className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MOCK_CATEGORIES.map((category) => (
            <CategoryChip
              key={category.id}
              item={category}
              isActive={activeCategoryId === category.id}
              onSelect={setActiveCategoryId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
