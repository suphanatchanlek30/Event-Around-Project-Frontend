// app/(public)/events/page.tsx


import EventSearch from "@/components/public-section/events/EventSearch";
import EventList from "@/components/public-section/events/EventList";

export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto px-2 md:px-0 py-8">
      <EventSearch />
      <EventList />
    </div>
  );
}