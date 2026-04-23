"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type EventLocationMapProps = {
  latitude: number;
  longitude: number;
  title: string;
  locationName: string;
};

export default function EventLocationMap({
  latitude,
  longitude,
  title,
  locationName,
}: EventLocationMapProps) {
  return (
    <div className="mt-6 h-36 overflow-hidden rounded-2xl border border-[#eef0f4]">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        zoomControl={false}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{title}</p>
              <p className="text-xs text-slate-600">{locationName}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
