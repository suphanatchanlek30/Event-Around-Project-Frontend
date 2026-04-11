// components/public-section/home/hero-banner/hero-banner-buttons.tsx

'use client';

import Link from 'next/link';
import { FaPaperPlane, FaMap } from 'react-icons/fa';
import { HeroBannerButtonsProps } from './types';

const BUTTON_ICONS = {
  find: FaPaperPlane,
  map: FaMap,
};

export const HeroBannerButtons = ({ buttons }: HeroBannerButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 pt-6 items-center">
      {buttons.map((button) => {
        const IconComponent =
          BUTTON_ICONS[button.icon as keyof typeof BUTTON_ICONS];
        const isPrimary = button.variant === 'primary';

        return (
          <Link
            key={button.href}
            href={button.href}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              isPrimary
                ? 'bg-primary-foreground text-primary hover:shadow-lg'
                : 'border-glow text-primary-foreground hover:bg-primary-foreground/10'
            }`}
          >
            {IconComponent && <IconComponent className="w-4 h-4" />}
            <span>{button.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
