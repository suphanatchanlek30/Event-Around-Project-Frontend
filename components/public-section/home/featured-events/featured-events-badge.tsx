// components/public-section/home/featured-events/featured-events-badge.tsx

interface FeaturedEventsBadgeProps {
  label: string;
}

export const FeaturedEventsBadge = ({ label }: FeaturedEventsBadgeProps) => {
  return (
    <span className="inline-flex w-fit self-start items-center rounded-full border border-primary/20 bg-primary text-primary-foreground px-2.5 py-1 text-[11px] font-semibold tracking-wide">
      {label}
    </span>
  );
};
