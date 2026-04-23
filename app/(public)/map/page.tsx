"use client";

import { useEffect, useMemo, useState } from "react";

import { MapCardList } from "@/components/public-section/map/map-card-list";
import { MapCategoryFilter } from "@/components/public-section/map/map-category-filter";
import { MapFilter } from "@/components/public-section/map/map-filter";
import MapWrapper from "@/components/public-section/map/map-wrapper";
import {
  CategoryItem,
  MapEventSummary,
  getCategories,
  getMapEvents,
} from "@/services";

const DEFAULT_CENTER: [number, number] = [13.7563, 100.5018];

export default function MapPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [events, setEvents] = useState<MapEventSummary[]>([]);
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
      try {
        setIsLoading(true);
        const response = await getMapEvents({
          latitude: location?.latitude,
          longitude: location?.longitude,
          radiusKm,
          categoryId: activeCategoryId,
          search: search || undefined,
        });
        setEvents(response.data);
      } catch {
        setEvents([]);
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

    const firstWithCoords = events.find(
      (event) => typeof event.latitude === "number" && typeof event.longitude === "number",
    );
    if (firstWithCoords?.latitude && firstWithCoords?.longitude) {
      return [firstWithCoords.latitude, firstWithCoords.longitude];
    }

    return DEFAULT_CENTER;
  }, [events, location]);

  return (
    <main className="fixed inset-0 overflow-hidden pt-16 pb-28">
      <div className="absolute inset-0 z-0">
        <MapWrapper center={mapCenter} events={events} />
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
        <MapCardList events={events} isLoading={isLoading} />
      </div>
    </main>
  );
}