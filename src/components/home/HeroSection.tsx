import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
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

      {/* Stats */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Users, value: "250,000+", label: "Ovaherero People" },
              { icon: Calendar, value: "160+", label: "Years of Heritage" },
              { icon: Heart, value: "50+", label: "Active Chapters" },
              { icon: Users, value: "5", label: "Strategic Pillars" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <p className="font-display font-bold text-lg md:text-xl text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
