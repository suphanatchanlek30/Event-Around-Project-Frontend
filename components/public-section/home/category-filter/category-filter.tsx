// components/public-section/home/category-filter/category-filter.tsx

'use client';

import { useEffect, useState } from 'react';
import { FaBookOpen } from 'react-icons/fa';

import { getCategories } from '@/services';
import { MOCK_CATEGORIES } from './constants';
import { CategoryChip } from './category-chip';
import { CategoryFilterProps, CategoryItem } from './types';

export const CategoryFilter = ({ className = '' }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<CategoryItem[]>(MOCK_CATEGORIES);
  const [activeCategoryId, setActiveCategoryId] = useState(MOCK_CATEGORIES[0]?.id ?? '');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();
        const normalized = response.data.map((category) => ({
          id: String(category.categoryId),
          label: category.name,
          icon: FaBookOpen,
        }));

        if (normalized.length > 0) {
          setCategories(normalized);
          setActiveCategoryId(normalized[0].id);
        }
      } catch {
        setCategories(MOCK_CATEGORIES);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className={`mt-4 md:mt-5 ${className}`}>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-foreground">เมนูลัด</h3>

        <div className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
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
