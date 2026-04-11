// components/public-section/home/hero-banner/types.ts

export interface HeroBannerButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
  icon: string;
}

export interface HeroBannerContent {
  title: string;
  subtitle: string;
  description: string;
  buttons: HeroBannerButton[];
}

export interface HeroBannerProps {
  className?: string;
}

export interface HeroBannerButtonsProps {
  buttons: HeroBannerButton[];
}

export interface HeroBannerContentProps {
  title: string;
  subtitle: string;
  description: string;
}
