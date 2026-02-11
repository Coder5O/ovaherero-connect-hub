import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const chapters = [
  { name: "Windhoek Central", lat: -22.5609, lng: 17.0658 },
  { name: "Okahandja", lat: -21.9833, lng: 16.9167 },
  { name: "Okakarara", lat: -20.5833, lng: 17.4333 },
  { name: "Gobabis", lat: -22.45, lng: 18.9667 },
  { name: "Otjiwarongo", lat: -20.4636, lng: 16.6478 },
  { name: "Aminuis", lat: -23.7333, lng: 19.1167 },
  { name: "Ovitoto", lat: -21.75, lng: 16.85 },
  { name: "Otjinene", lat: -21.45, lng: 18.85 },
  { name: "Omaruru", lat: -21.4333, lng: 15.9333 },
  { name: "Karibib", lat: -21.9333, lng: 15.85 },
  { name: "Outjo", lat: -20.1167, lng: 16.15 },
  { name: "Kalkfeld", lat: -20.8833, lng: 16.2 },
  { name: "Grootfontein", lat: -19.5667, lng: 18.1167 },
  { name: "Tsumeb", lat: -19.2333, lng: 17.7167 },
  { name: "Otavi", lat: -19.65, lng: 17.3333 },
  { name: "Waterberg", lat: -20.5, lng: 17.25 },
  { name: "Epukiro", lat: -22.35, lng: 19.5 },
  { name: "Eiseb", lat: -21.6, lng: 19.8 },
  { name: "Tallismanus", lat: -23.25, lng: 19.05 },
  { name: "Leonardville", lat: -22.7, lng: 18.75 },
  { name: "Witvlei", lat: -22.4, lng: 18.5 },
  { name: "Steinhausen", lat: -22.3, lng: 18.35 },
  { name: "Hochfeld", lat: -21.1, lng: 16.7 },
  { name: "Wilhelmstal", lat: -22.05, lng: 16.95 },
  { name: "Usakos", lat: -21.9833, lng: 15.6 },
  { name: "Swakopmund", lat: -22.6833, lng: 14.5333 },
  { name: "Walvis Bay", lat: -22.9575, lng: 14.5053 },
  { name: "Rehoboth", lat: -23.3167, lng: 17.0833 },
  { name: "Mariental", lat: -24.6333, lng: 17.9667 },
  { name: "Opuwo", lat: -18.0611, lng: 13.8389 },
  { name: "Kamanjab", lat: -19.6333, lng: 14.8333 },
  { name: "Khorixas", lat: -20.3667, lng: 14.9667 },
  { name: "Fransfontein", lat: -20.1333, lng: 14.6 },
  { name: "Sesfontein", lat: -19.1333, lng: 13.6167 },
  { name: "Otjimbingwe", lat: -22.35, lng: 16.1333 },
];

// Custom gold marker icon
const createIcon = () =>
  L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;background:#D4A843;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

export function ChaptersMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [-21.5, 17.0],
      zoom: 6,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    L.control.attribution({ position: "bottomright" }).addTo(map);

    const icon = createIcon();

    chapters.forEach((ch) => {
      L.marker([ch.lat, ch.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:inherit;text-align:center;padding:2px 4px">
            <strong style="font-size:13px">${ch.name}</strong><br/>
            <span style="font-size:11px;color:#666">OTA Chapter</span>
          </div>`
        );
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <section className="relative bg-background">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
              35 Chapters Across Namibia
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Click a marker to see the chapter name
            </p>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium text-gold bg-gold/15 rounded-full">
            Nationwide
          </span>
        </div>
        <div
          ref={mapRef}
          className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-soft border border-border"
        />
      </div>
    </section>
  );
}
