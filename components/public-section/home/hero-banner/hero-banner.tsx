// components/public-section/home/hero-banner/hero-banner.tsx

'use client';

import { HeroBannerContent } from './hero-banner-content';
import { HeroBannerButtons } from './hero-banner-buttons';
import { HERO_BANNER } from './constants';
import { HeroBannerProps } from './types';

export const HeroBanner = ({ className = '' }: HeroBannerProps) => {
  return (
    <section
      className={`bg-primary rounded-3xl p-8 md:p-12 ${className}`}
    >
      <div className="max-w-xl">
        <HeroBannerContent
          title={HERO_BANNER.title}
          subtitle={HERO_BANNER.subtitle}
          description={HERO_BANNER.description}
        />

        <HeroBannerButtons buttons={HERO_BANNER.buttons} />
      </div>
    </section>
  );
};
