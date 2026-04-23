"use client";

import { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa";

import {
  CategoryFilter,
  EventsSearchFilter,
  FeaturedEvents,
  HeroBanner,
  UpcomingEventsSection,
} from "@/components/public-section/home";
import { CategoryItem, EventSummary, getCategories, getUpcomingEvents } from "@/services";

type HomeCategoryItem = {
  id: string;
  label: string;
  icon: typeof FaBookOpen;
};

export default function Home() {
  const [categories, setCategories] = useState<HomeCategoryItem[]>([
    { id: "", label: "ทั้งหมด", icon: FaBookOpen },
  ]);
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState<EventSummary[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories({ includeInactive: false });
        const normalized = response.data.map((category: CategoryItem) => ({
          id: String(category.categoryId),
          label: category.name,
          icon: FaBookOpen,
        }));
        setCategories([{ id: "", label: "ทั้งหมด", icon: FaBookOpen }, ...normalized]);
      } catch {
        setCategories([{ id: "", label: "ทั้งหมด", icon: FaBookOpen }]);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadUpcoming = async () => {
      try {
        setIsLoadingEvents(true);
        const response = await getUpcomingEvents({
          page: 1,
          pageSize: 24,
          categoryId: activeCategoryId ? Number(activeCategoryId) : undefined,
          sortBy: "startTime",
          sortOrder: "asc",
        });
        setUpcomingEvents(response.data);
      } catch {
        setUpcomingEvents([]);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    loadUpcoming();
  }, [activeCategoryId]);

  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <HeroBanner className="w-full" />
        <EventsSearchFilter />
        <CategoryFilter
          categories={categories}
          activeCategoryId={activeCategoryId}
          onChange={setActiveCategoryId}
        />
        <FeaturedEvents events={upcomingEvents} isLoading={isLoadingEvents} />
        <UpcomingEventsSection events={upcomingEvents} isLoading={isLoadingEvents} />
      </div>
    </main>
  );
}