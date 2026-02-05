import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-hero pattern-african relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-6">
            <Heart className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Join the Ovaherero
            <br />
            Traditional Authority
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Be part of a community committed to preserving our heritage, supporting
            our people, and building a brighter future together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="gold" size="xl" asChild>
              <Link to="/membership">
                Register for Membership
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline-gold" size="xl" asChild>
              <Link to="/contributions">View Contributions</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-gold/20 rounded-full" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-gold/20 rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gold/10 rounded-full" />
    </section>
  );
}
