// app/(public)/events/page.tsx

import MapWrapper from "@/components/public-section/map/map-wrapper";
import { MapFilter } from '@/components/public-section/map/map-filter';
import { MapCardList } from '@/components/public-section/map/map-card-list';

export default function MapPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden">

      {/*map*/}
      <div className="absolute inset-0 z-0">
        <MapWrapper />
      </div>

      {/*filter*/}
      <div className="absolute top-4 left-4 z-10">
        <MapFilter />
      </div>
      
      {/*card*/}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <MapCardList />
      </div>
    </main>
  );
}