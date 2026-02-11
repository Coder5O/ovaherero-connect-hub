import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { chapters } from "@/data/chapters";

const createIcon = () =>
  L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;background:#D4A843;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.35);cursor:pointer"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

export function ChaptersMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const navigate = useNavigate();

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
      const marker = L.marker([ch.lat, ch.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:inherit;text-align:center;padding:2px 4px;cursor:pointer">
            <strong style="font-size:13px;color:#D4A843">${ch.name}</strong><br/>
            <span style="font-size:11px;color:#666">${ch.region}</span><br/>
            <span style="font-size:11px;color:#D4A843;text-decoration:underline">View Chapter →</span>
          </div>`
        );

      marker.on("popupopen", () => {
        const popup = marker.getPopup();
        if (popup) {
          const el = popup.getElement();
          if (el) {
            el.style.cursor = "pointer";
            el.addEventListener("click", () => navigate(`/chapters/${ch.slug}`));
          }
        }
      });

      marker.on("click", () => {
        marker.openPopup();
      });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [navigate]);

  return (
    <section className="relative bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
              35 Chapters Across Namibia
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Click a marker to view that chapter
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
