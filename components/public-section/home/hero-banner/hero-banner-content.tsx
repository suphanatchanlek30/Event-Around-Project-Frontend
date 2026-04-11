// components/public-section/home/hero-banner/hero-banner-content.tsx

'use client';

import { HeroBannerContentProps } from './types';

export const HeroBannerContent = ({
  title,
  subtitle,
  description,
}: HeroBannerContentProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-4xl md:text-4xl font-bold text-primary-foreground leading-tight">
          {title}
        </h1>
        <h2 className="text-xl md:text-xl font-bold text-primary-foreground mt-2">
          {subtitle}
        </h2>
      </div>

      <p className="text-sm md:text-base text-primary-foreground font-normal leading-relaxed">
        {description}
      </p>
    </div>
  );
};
