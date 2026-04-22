// app/(public)/events/page.tsx

import MapWrapper from "@/components/public-section/map/map-wrapper";
import { MapFilter } from '@/components/public-section/map/map-filter';
import { MapCategoryFilter } from "@/components/public-section/map/map-category-filter";
import { MapCardList } from '@/components/public-section/map/map-card-list';

export default function MapPage() {
  return (
    <main className="fixed inset-0 overflow-hidden pt-16 pb-28">

      {/*map*/}
      <div className="absolute inset-0 z-0">
        <MapWrapper />
      </div>


      <div className="absolute top-16 left-0 right-0 z-10 flex flex-col items-end gap-2 px-4">
        {/*filter*/}
        <MapFilter />
        
        {/*category filter*/}
        <MapCategoryFilter />
      </div>
      
      {/*card*/}
    <div className="absolute bottom-20 left-0 w-full z-50 px-4">
        <MapCardList />
    </div>
    </main>
  );
}