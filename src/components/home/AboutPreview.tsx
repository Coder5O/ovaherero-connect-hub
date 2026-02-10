import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-hero pattern-african overflow-hidden shadow-elevated" />
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
              Our Heritage
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              A Legacy of Leadership & Unity
            </h2>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                The Ovaherero Traditional Authority represents the governing body
                of the Ovaherero people, with roots tracing back to 1863. Our
                Chiefs Council operates under the leadership of the Paramount
                Chief, guiding our community through cultural preservation and
                modern development.
              </p>
              <p>
                Under the five strategic development pillars launched by Paramount
                Chief Prof. Mutjinde Katjiua, we strive for economic liberation,
                cultural preservation, and the unity of our people across all
                branches.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="lg" asChild>
                <Link to="/about">
                  Meet Our Leadership
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
