import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { format, isSameDay, addMonths, subMonths } from "date-fns";

// Sample events data - will be replaced with real data from backend
const events = [
  {
    id: 1,
    title: "Annual Chiefs Council Meeting",
    date: new Date(2026, 1, 15),
    time: "09:00 AM",
    location: "Hosea Kutako Memorial, Aminuis",
    type: "meeting",
    description: "Annual gathering of all OTA chiefs and council members.",
  },
  {
    id: 2,
    title: "Ovaherero Day Commemoration",
    date: new Date(2026, 7, 23),
    time: "10:00 AM",
    location: "Okahandja, Namibia",
    type: "cultural",
    description: "Annual commemoration of the 1904 genocide and celebration of Ovaherero resilience.",
  },
  {
    id: 3,
    title: "Youth Cultural Workshop",
    date: new Date(2026, 2, 10),
    time: "02:00 PM",
    location: "Windhoek Cultural Center",
    type: "workshop",
    description: "Teaching traditional practices and Otjiherero language to youth.",
  },
  {
    id: 4,
    title: "Cattle Branding Ceremony",
    date: new Date(2026, 3, 5),
    time: "08:00 AM",
    location: "Okakarara",
    type: "cultural",
    description: "Traditional cattle branding and blessing ceremony.",
  },
  {
    id: 5,
    title: "Women's Traditional Dress Exhibition",
    date: new Date(2026, 4, 18),
    time: "11:00 AM",
    location: "National Museum, Windhoek",
    type: "cultural",
    description: "Showcase of the iconic ohorokova dress and its history.",
  },
];

const eventTypeColors: Record<string, string> = {
  meeting: "bg-primary/10 text-primary",
  cultural: "bg-gold/10 text-gold-dark",
  workshop: "bg-accent/20 text-accent",
};

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const eventDates = events.map((e) => e.date);
  
  const selectedDayEvents = selectedDate
    ? events.filter((e) => isSameDay(e.date, selectedDate))
    : [];

  const upcomingEvents = events
    .filter((e) => e.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-hero pattern-african">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-sm font-medium text-gold bg-gold/20 rounded-full mb-4">
              Events
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              OTA Events Calendar
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Stay connected with all Ovaherero Traditional Authority activities,
              cultural celebrations, and community gatherings.
            </p>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <Card className="lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-display text-xl">Calendar</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="rounded-md"
                  modifiers={{
                    event: eventDates,
                  }}
                  modifiersStyles={{
                    event: {
                      fontWeight: "bold",
                      backgroundColor: "hsl(var(--primary) / 0.1)",
                      color: "hsl(var(--primary))",
                    },
                  }}
                />
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-primary/20" />
                  <span>Events scheduled</span>
                </div>
              </CardContent>
            </Card>

            {/* Selected Day Events */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDayEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 border rounded-lg hover:shadow-soft transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {event.title}
                          </h3>
                          <Badge className={eventTypeColors[event.type]}>
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No events scheduled for this date.</p>
                    <p className="text-sm">Select a highlighted date to view events.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-elevated transition-shadow">
                <CardContent className="p-6">
                  <Badge className={`${eventTypeColors[event.type]} mb-3`}>
                    {event.type}
                  </Badge>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {event.description}
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-primary" />
                      {format(event.date, "MMMM d, yyyy")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {event.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
