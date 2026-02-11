import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { getChapterBySlug, chapters } from "@/data/chapters";
import { MapPin, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Map chapter slugs to available images (we have 6 chapter images)
import chapterWindhoek from "@/assets/chapter-windhoek.jpg";
import chapterOkahandja from "@/assets/chapter-okahandja.jpg";
import chapterOkakarara from "@/assets/chapter-okakarara.jpg";
import chapterGobabis from "@/assets/chapter-gobabis.jpg";
import chapterOtjiwarongo from "@/assets/chapter-otjiwarongo.jpg";
import chapterAminuis from "@/assets/chapter-aminuis.jpg";

const chapterImages: Record<string, string> = {
  "windhoek-central": chapterWindhoek,
  "okahandja": chapterOkahandja,
  "okakarara": chapterOkakarara,
  "gobabis": chapterGobabis,
  "otjiwarongo": chapterOtjiwarongo,
  "aminuis": chapterAminuis,
};

// Fallback image for chapters without dedicated photos
const fallbackImage = chapterWindhoek;

export default function ChapterDetail() {
  const { slug } = useParams<{ slug: string }>();
  const chapter = slug ? getChapterBySlug(slug) : undefined;

  if (!chapter) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Chapter Not Found</h1>
          <p className="text-muted-foreground mb-6">The chapter you're looking for doesn't exist.</p>
          <Button asChild variant="gold">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const image = chapterImages[chapter.slug] || fallbackImage;

  // Get nearby chapters (same region, excluding self)
  const nearby = chapters
    .filter((c) => c.region === chapter.region && c.slug !== chapter.slug)
    .slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[320px]">
        <img src={image} alt={chapter.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold/80 mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">{chapter.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-white/80">
            <MapPin className="w-4 h-4" />
            <span>{chapter.region}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-xl font-bold mb-3 text-foreground">About this Chapter</h2>
          <p className="text-muted-foreground leading-relaxed text-base">{chapter.description}</p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-muted/40 rounded-xl p-5">
              <MapPin className="w-5 h-5 text-gold mb-2" />
              <p className="text-sm font-medium text-foreground">Location</p>
              <p className="text-xs text-muted-foreground">{chapter.lat.toFixed(4)}°S, {chapter.lng.toFixed(4)}°E</p>
            </div>
            <div className="bg-muted/40 rounded-xl p-5">
              <Users className="w-5 h-5 text-gold mb-2" />
              <p className="text-sm font-medium text-foreground">Region</p>
              <p className="text-xs text-muted-foreground">{chapter.region}</p>
            </div>
          </div>
        </div>

        {/* Nearby Chapters */}
        {nearby.length > 0 && (
          <div className="mt-12">
            <h3 className="font-display text-lg font-bold mb-4 text-foreground">Other chapters in {chapter.region}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  to={`/chapters/${c.slug}`}
                  className="group bg-muted/30 hover:bg-muted/60 rounded-xl p-4 transition-colors"
                >
                  <p className="font-medium text-sm text-foreground group-hover:text-gold transition-colors">{c.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {c.region}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
