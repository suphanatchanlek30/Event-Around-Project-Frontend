// app/(public)/events/page.tsx


import EventSearch from "@/components/public-section/events/EventSearch";
import EventList from "@/components/public-section/events/EventList";

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <EventSearch />
      <EventList />
    </div>
  );
}