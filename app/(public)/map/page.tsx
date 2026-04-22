// app/(public)/events/page.tsx

import { MapSection } from '@/components/public-section/map/map-section';
import { MapFilter } from '@/components/public-section/map/map-filter';
import { MapCardList } from '@/components/public-section/map/map-card-list';

export default function MapPage() {
  return (
    <main className="relative w-full h-sreen overflow-hidden">
      <MapSection />
      <MapFilter />
      <MapCardList />
    </main>
  );
}