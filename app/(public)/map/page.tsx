// app/(public)/events/page.tsx

import MapWrapper from "@/components/public-section/map/map-wrapper";
import { MapFilter } from '@/components/public-section/map/map-filter';
import { MapCardList } from '@/components/public-section/map/map-card-list';

export default function MapPage() {
  return (
    <main className="relative w-full h-sreen overflow-hidden">
      <MapWrapper />
      <MapFilter />
      <MapCardList />
    </main>
  );
}