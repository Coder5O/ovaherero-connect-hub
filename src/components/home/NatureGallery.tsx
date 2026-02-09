import namibiaDunes from "@/assets/namibia-dunes.jpg";
import namibiaSavanna from "@/assets/namibia-savanna.jpg";
import namibiaEtosha from "@/assets/namibia-etosha.jpg";

const images = [
  { src: namibiaDunes, alt: "Sossusvlei sand dunes in the Namib Desert", title: "Namib Desert" },
  { src: namibiaSavanna, alt: "Namibian savanna at golden hour with acacia trees", title: "Savanna Sunset" },
  { src: namibiaEtosha, alt: "Elephants at Etosha National Park waterhole", title: "Etosha Wildlife" },
];

export function NatureGallery() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium text-gold bg-gold/20 rounded-full mb-4">
            Our Homeland
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Beauty of Namibia
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From the ancient dunes of the Namib Desert to the wildlife-rich plains of Etosha, our homeland is a land of breathtaking natural beauty.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img.title} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 font-display text-lg font-semibold text-white">
                {img.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
