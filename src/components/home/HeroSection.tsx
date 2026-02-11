import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Namibian savanna landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth/90 via-earth/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gold">
              Est. 1863 • Namibia
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
            Ovaherero
            <br />
            <span className="text-gradient-gold">Traditional Authority</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Preserving our heritage, uniting our people, and building a
            prosperous future for the Ovaherero nation across Namibia and
            beyond.
          </p>

          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="gold" size="xl" asChild>
              <Link to="/membership">
                Become a Member
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline-gold" size="xl" asChild>
              <Link to="/about">Learn Our History</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
