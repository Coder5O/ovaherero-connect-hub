import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, BookOpen, ChevronRight } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Events Calendar",
    description:
      "Stay updated with all OTA activities, meetings, and cultural celebrations.",
    link: "/events",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: DollarSign,
    title: "Contributions",
    description:
      "Track chapter contributions and see the collective impact of our community.",
    link: "/contributions",
    color: "bg-gold/10 text-gold-dark",
  },
  {
    icon: Users,
    title: "Membership",
    description:
      "Join our community and connect with Ovaherero members across all branches.",
    link: "/membership",
    color: "bg-accent/20 text-accent",
  },
  {
    icon: BookOpen,
    title: "Our Heritage",
    description:
      "Learn about our leadership, history, and the rich traditions of the Ovaherero people.",
    link: "/about",
    color: "bg-earth/10 text-earth",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Empowering Our Community
          </h2>
          <p className="text-muted-foreground">
            Discover resources and tools designed to strengthen our bonds and
            preserve our cultural heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow-elevated transition-all duration-300 border-transparent hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Learn more
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
