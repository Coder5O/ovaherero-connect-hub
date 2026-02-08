import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield, Users, CalendarDays, CheckCircle, XCircle, Plus, Edit, Trash2,
  Loader2, LogOut, Clock,
} from "lucide-react";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

const branches = [
  "Windhoek Central", "Okahandja", "Aminuis", "Okakarara",
  "Gobabis", "Otjiwarongo", "Ovitoto", "Otjinene",
];

const eventCategories = ["meeting", "cultural", "workshop", "general"];

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [members, setMembers] = useState<Tables<"members">[]>([]);
  const [events, setEvents] = useState<Tables<"events">[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Tables<"events"> | null>(null);
  const [eventForm, setEventForm] = useState({
    title: "", description: "", event_date: "", event_time: "", location: "", category: "general",
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login", { replace: true });
    }
  }, [loading, user, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    setLoadingData(true);
    const [membersRes, eventsRes] = await Promise.all([
      supabase.from("members").select("*").order("created_at", { ascending: false }),
      supabase.from("events").select("*").order("event_date", { ascending: true }),
    ]);
    if (membersRes.data) setMembers(membersRes.data);
    if (eventsRes.data) setEvents(eventsRes.data);
    setLoadingData(false);
  };

  const updateMemberStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("members").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Member ${status}` });
      setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    }
  };

  const handleEventSubmit = async () => {
    if (!eventForm.title || !eventForm.event_date) {
      toast({ title: "Error", description: "Title and date are required", variant: "destructive" });
      return;
    }

    if (editingEvent) {
      const { error } = await supabase.from("events").update(eventForm).eq("id", editingEvent.id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Event Updated" });
        setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? { ...e, ...eventForm } : e)));
      }
    } else {
      const { data, error } = await supabase.from("events").insert({ ...eventForm, created_by: user!.id }).select().single();
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else if (data) {
        toast({ title: "Event Created" });
        setEvents((prev) => [data, ...prev]);
      }
    }
    resetEventForm();
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Event Deleted" });
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const resetEventForm = () => {
    setEventDialogOpen(false);
    setEditingEvent(null);
    setEventForm({ title: "", description: "", event_date: "", event_time: "", location: "", category: "general" });
  };

  const openEditEvent = (event: Tables<"events">) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description || "",
      event_date: event.event_date,
      event_time: event.event_time || "",
      location: event.location || "",
      category: event.category,
    });
    setEventDialogOpen(true);
  };

  const pendingMembers = members.filter((m) => m.status === "pending");
  const approvedMembers = members.filter((m) => m.status === "approved");

  if (loading || (!user && loading)) {
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
      <section className="py-12 md:py-16 bg-gradient-hero pattern-african">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium text-gold bg-gold/20 rounded-full mb-4">
                <Shield className="w-3 h-3 inline mr-1" />
                Admin Dashboard
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                Administration Panel
              </h1>
            </div>
            <Button variant="outline" onClick={() => { signOut(); navigate("/"); }} className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-hero text-primary-foreground">
              <CardContent className="p-5">
                <Clock className="w-6 h-6 mb-1 opacity-80" />
                <p className="text-sm opacity-80">Pending</p>
                <p className="font-display text-2xl font-bold">{pendingMembers.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <Users className="w-6 h-6 mb-1 text-primary" />
                <p className="text-sm text-muted-foreground">Approved Members</p>
                <p className="font-display text-2xl font-bold">{approvedMembers.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <CalendarDays className="w-6 h-6 mb-1 text-primary" />
                <p className="text-sm text-muted-foreground">Events</p>
                <p className="font-display text-2xl font-bold">{events.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Total Applications</p>
                <p className="font-display text-2xl font-bold">{members.length}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pending ({pendingMembers.length})
              </TabsTrigger>
              <TabsTrigger value="members" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Members
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Events
              </TabsTrigger>
            </TabsList>

            {/* Pending Applications */}
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Pending Membership Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingData ? (
                    <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
                  ) : pendingMembers.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No pending applications.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Branch</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Gender</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingMembers.map((m) => (
                          <TableRow key={m.id}>
                            <TableCell className="font-medium">{m.first_name} {m.last_name}</TableCell>
                            <TableCell>{m.email}</TableCell>
                            <TableCell>{m.phone}</TableCell>
                            <TableCell><Badge variant="secondary">{m.branch}</Badge></TableCell>
                            <TableCell>{m.age}</TableCell>
                            <TableCell>{m.gender}</TableCell>
                            <TableCell className="text-sm">{format(new Date(m.created_at), "MMM d, yyyy")}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="default" onClick={() => updateMemberStatus(m.id, "approved")}>
                                  <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => updateMemberStatus(m.id, "rejected")}>
                                  <XCircle className="w-4 h-4 mr-1" /> Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* All Members */}
            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">All Members</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingData ? (
                    <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Branch</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Gender</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members.map((m) => (
                          <TableRow key={m.id}>
                            <TableCell className="font-medium">{m.first_name} {m.last_name}</TableCell>
                            <TableCell><Badge variant="secondary">{m.branch}</Badge></TableCell>
                            <TableCell>{m.age}</TableCell>
                            <TableCell>{m.gender}</TableCell>
                            <TableCell>
                              <Badge variant={m.status === "approved" ? "default" : m.status === "pending" ? "secondary" : "destructive"}>
                                {m.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Management */}
            <TabsContent value="events">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-display">Manage Events</CardTitle>
                  <Dialog open={eventDialogOpen} onOpenChange={(open) => { if (!open) resetEventForm(); else setEventDialogOpen(true); }}>
                    <DialogTrigger asChild>
                      <Button variant="gold" onClick={() => setEventDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" /> Add Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="font-display">
                          {editingEvent ? "Edit Event" : "Create New Event"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input value={eventForm.title} onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Input value={eventForm.description} onChange={(e) => setEventForm((p) => ({ ...p, description: e.target.value }))} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Date</Label>
                            <Input type="date" value={eventForm.event_date} onChange={(e) => setEventForm((p) => ({ ...p, event_date: e.target.value }))} />
                          </div>
                          <div className="space-y-2">
                            <Label>Time</Label>
                            <Input value={eventForm.event_time} onChange={(e) => setEventForm((p) => ({ ...p, event_time: e.target.value }))} placeholder="e.g. 09:00 AM" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input value={eventForm.location} onChange={(e) => setEventForm((p) => ({ ...p, location: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select value={eventForm.category} onValueChange={(v) => setEventForm((p) => ({ ...p, category: v }))}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {eventCategories.map((c) => (
                                <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full" variant="gold" onClick={handleEventSubmit}>
                          {editingEvent ? "Update Event" : "Create Event"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {loadingData ? (
                    <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
                  ) : events.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No events yet. Create one above.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events.map((e) => (
                          <TableRow key={e.id}>
                            <TableCell className="font-medium">{e.title}</TableCell>
                            <TableCell>{format(new Date(e.event_date), "MMM d, yyyy")}</TableCell>
                            <TableCell>{e.location || "—"}</TableCell>
                            <TableCell><Badge variant="secondary">{e.category}</Badge></TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => openEditEvent(e)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => deleteEvent(e.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
