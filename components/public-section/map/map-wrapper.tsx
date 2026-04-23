//prevent SSR crash

"use client";

import dynamic from "next/dynamic";
import type { MapEventSummary } from "@/services";

const MapSection = dynamic(
  () => import("./map-section").then((mod) => mod.MapSection),
  { ssr: false }
);

type MapWrapperProps = {
  center: [number, number];
  events: MapEventSummary[];
};

export default function MapWrapper({ center, events }: MapWrapperProps) {
  return (
    <div className="w-full h-full z-0 relative">
      <MapSection center={center} events={events} />
    </div>
  );
}