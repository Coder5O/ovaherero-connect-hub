import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { format, isSameDay, addMonths, subMonths, parseISO } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const eventTypeColors: Record<string, string> = {
  meeting: "bg-primary/10 text-primary",
  cultural: "bg-gold/10 text-gold-dark",
  workshop: "bg-accent/20 text-accent",
  general: "bg-secondary text-secondary-foreground",
};

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Tables<"events">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from("events").select("*").order("event_date", { ascending: true });
      if (data) setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const eventDates = events.map((e) => parseISO(e.event_date));

  const selectedDayEvents = selectedDate
    ? events.filter((e) => isSameDay(parseISO(e.event_date), selectedDate))
    : [];

  const upcomingEvents = events
    .filter((e) => parseISO(e.event_date) >= new Date())
    .slice(0, 5);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

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
            <Card className="lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-display text-xl">Calendar</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
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
                  modifiers={{ event: eventDates }}
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
                      <div key={event.id} className="p-4 border rounded-lg hover:shadow-soft transition-shadow">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-display text-lg font-semibold text-foreground">{event.title}</h3>
                          <Badge className={eventTypeColors[event.category] || eventTypeColors.general}>{event.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          {event.event_time && (
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{event.event_time}</span>
                          )}
                          {event.location && (
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{event.location}</span>
                          )}
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
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">Upcoming Events</h2>
          {upcomingEvents.length === 0 ? (
            <p className="text-muted-foreground">No upcoming events. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-elevated transition-shadow">
                  <CardContent className="p-6">
                    <Badge className={`${eventTypeColors[event.category] || eventTypeColors.general} mb-3`}>{event.category}</Badge>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-primary" />
                        {format(parseISO(event.event_date), "MMMM d, yyyy")}
                      </div>
                      {event.event_time && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />{event.event_time}
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />{event.location}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
