//prevent SSR crash

"use client";

import dynamic from "next/dynamic";

const MapSection = dynamic(
  () => import("./map-section").then((mod) => mod.MapSection),
  { ssr: false }
);

export default function MapWrapper() {
  return (
    <div className="w-full h-full z-0 relative">
      <MapSection />
    </div>
  );
}