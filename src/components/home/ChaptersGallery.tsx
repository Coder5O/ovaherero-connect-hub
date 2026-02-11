import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import chapterWindhoek from "@/assets/chapter-windhoek.jpg";
import chapterOkahandja from "@/assets/chapter-okahandja.jpg";
import chapterOkakarara from "@/assets/chapter-okakarara.jpg";
import chapterGobabis from "@/assets/chapter-gobabis.jpg";
import chapterOtjiwarongo from "@/assets/chapter-otjiwarongo.jpg";
import chapterAminuis from "@/assets/chapter-aminuis.jpg";

const chapters = [
  { name: "Windhoek Central", image: chapterWindhoek, region: "Khomas Region" },
  { name: "Okahandja", image: chapterOkahandja, region: "Otjozondjupa Region" },
  { name: "Okakarara", image: chapterOkakarara, region: "Otjozondjupa Region" },
  { name: "Gobabis", image: chapterGobabis, region: "Omaheke Region" },
  { name: "Otjiwarongo", image: chapterOtjiwarongo, region: "Otjozondjupa Region" },
  { name: "Aminuis", image: chapterAminuis, region: "Omaheke Region" },
];

export function ChaptersGallery() {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 text-sm font-medium text-gold bg-gold/20 rounded-full mb-3">
            Our Chapters
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Across Namibia
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            The Ovaherero Traditional Authority has active chapters in communities throughout Namibia, each preserving our heritage locally.
          </p>
        </div>

        {/* Chapter Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {chapters.map((ch) => (
            <div key={ch.name} className="group relative overflow-hidden rounded-xl aspect-[16/10]">
              <img
                src={ch.image}
                alt={`${ch.name} chapter, ${ch.region}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="font-display text-base font-semibold text-white">{ch.name}</p>
                <p className="flex items-center gap-1 text-xs text-white/80">
                  <MapPin className="w-3 h-3" />
                  {ch.region}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Explore all 35 chapters on the interactive map above
        </p>
      </div>
    </section>
  );
}
