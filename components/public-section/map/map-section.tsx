"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import L from "leaflet";
import type { MapEventSummary } from "@/services";

//fix bug
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type MapSectionProps = {
  center: [number, number];
  events: MapEventSummary[];
};

const RecenterMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  map.setView(center, map.getZoom(), { animate: true });

  return null;
};

export function MapSection({ center, events }: MapSectionProps) {
  return (
    <div className="w-full h-full relative z-0">

      <style jsx global>{`
      .leaflet-control-zoom {
        display: none !important;
      }
    `}</style>

      <MapContainer
        center={center}
        zoom={13}
        zoomControl={false}
        className="w-full h-full z-0"
        doubleClickZoom={false}
        scrollWheelZoom={false}
        dragging={true}
        touchZoom={true}
      >
        <RecenterMap center={center} />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {events
          .filter((event) => typeof event.latitude === "number" && typeof event.longitude === "number")
          .map((event) => (
            <Marker
              key={event.eventId}
              position={[event.latitude as number, event.longitude as number]}
            >
              <Popup>
                <div className="w-50">
                  {event.coverImageUrl ? (
                    <img
                      src={event.coverImageUrl}
                      alt={event.title}
                      className="mb-2 h-24 w-full rounded-md object-cover object-center"
                    />
                  ) : null}
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-xs text-slate-600 mt-1">{event.locationName || "ยังไม่ระบุสถานที่"}</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}