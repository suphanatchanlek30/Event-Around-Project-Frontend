// app/(public)/events/page.tsx

import EventSearch from "@/components/public-section/events/EventSearch";
import EventCard from "@/components/public-section/events/EventCard";

export default function EventsPage() {
  return (
    <div>

      <EventSearch />

      <div style={{ display: "flex", marginTop: "20px" }}>
        <EventCard />
        <EventCard />
        <EventCard />
      </div>

    </div>
    <div>Events page</div>
  );
}