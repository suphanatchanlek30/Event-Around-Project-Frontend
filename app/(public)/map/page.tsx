"use client";

import { useEffect, useMemo, useState } from "react";

import { MapCardList } from "@/components/public-section/map/map-card-list";
import { MapCategoryFilter } from "@/components/public-section/map/map-category-filter";
import { MapFilter } from "@/components/public-section/map/map-filter";
import MapWrapper from "@/components/public-section/map/map-wrapper";
import {
  CategoryItem,
  NearbyEventSummary,
  MapEventSummary,
  getCategories,
  getMapEvents,
  getNearbyEvents,
} from "@/services";

const DEFAULT_CENTER: [number, number] = [13.7563, 100.5018];

export default function MapPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [mapEvents, setMapEvents] = useState<MapEventSummary[]>([]);
  const [nearbyEvents, setNearbyEvents] = useState<NearbyEventSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);

  const [search, setSearch] = useState("");
  const [radiusKm, setRadiusKm] = useState(5);
  const [activeCategoryId, setActiveCategoryId] = useState<number | undefined>();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories({ includeInactive: false });
        setCategories(response.data);
      } catch {
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadMapEvents = async () => {
      const latitude = location?.latitude ?? DEFAULT_CENTER[0];
      const longitude = location?.longitude ?? DEFAULT_CENTER[1];

      try {
        setIsLoading(true);
        const [mapResponse, nearbyResponse] = await Promise.allSettled([
          getMapEvents({
            latitude,
            longitude,
            radiusKm,
            categoryId: activeCategoryId,
            search: search || undefined,
          }),
          getNearbyEvents({
            latitude,
            longitude,
            radiusKm,
            categoryId: activeCategoryId,
            search: search || undefined,
            page: 1,
            pageSize: 20,
            sortBy: "distance",
            sortOrder: "asc",
          }),
        ]);

        setMapEvents(mapResponse.status === "fulfilled" ? mapResponse.value.data : []);
        setNearbyEvents(nearbyResponse.status === "fulfilled" ? nearbyResponse.value.data : []);
      } catch {
        setMapEvents([]);
        setNearbyEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadMapEvents();
  }, [search, radiusKm, activeCategoryId, location?.latitude, location?.longitude]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const mapCenter = useMemo<[number, number]>(() => {
    if (location) {
      return [location.latitude, location.longitude];
    }

    const firstWithCoords = mapEvents.find(
      (event) => typeof event.latitude === "number" && typeof event.longitude === "number",
    );
    if (firstWithCoords?.latitude && firstWithCoords?.longitude) {
      return [firstWithCoords.latitude, firstWithCoords.longitude];
    }

    const firstNearbyWithCoords = nearbyEvents.find(
      (event) => typeof event.latitude === "number" && typeof event.longitude === "number",
    );
    if (firstNearbyWithCoords?.latitude && firstNearbyWithCoords?.longitude) {
      return [firstNearbyWithCoords.latitude, firstNearbyWithCoords.longitude];
    }

    return DEFAULT_CENTER;
  }, [mapEvents, nearbyEvents, location]);

  return (
    <main className="fixed inset-0 overflow-hidden pt-16 pb-28">
      <div className="absolute inset-0 z-0">
        <MapWrapper center={mapCenter} events={mapEvents} />
      </div>

      <div className="absolute top-18 left-0 right-0 z-10 px-4">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2">
          <MapFilter
            radiusKm={radiusKm}
            search={search}
            isLocating={isLocating}
            onRadiusChange={setRadiusKm}
            onSearchChange={setSearch}
            onUseMyLocation={handleUseMyLocation}
          />
          <MapCategoryFilter
            categories={categories}
            activeCategoryId={activeCategoryId}
            onChange={setActiveCategoryId}
          />
        </div>
      </div>

      <div className="absolute bottom-15 left-0 w-full z-40">
        <MapCardList events={nearbyEvents} isLoading={isLoading} />
      </div>
    </main>
  );
}