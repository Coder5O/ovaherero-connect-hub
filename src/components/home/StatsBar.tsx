import { Calendar, Users, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: "250,000+", label: "Ovaherero People" },
  { icon: Calendar, value: "160+", label: "Years of Heritage" },
  { icon: Heart, value: "35", label: "Active Chapters" },
  { icon: Users, value: "5", label: "Strategic Pillars" },
];

export function StatsBar() {
  return (
    <div className="bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
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
  );
}
