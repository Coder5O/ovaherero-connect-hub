import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Search, Users, UserPlus, Filter, Loader2 } from "lucide-react";

const branches = [
  "Windhoek Central", "Okahandja", "Aminuis", "Okakarara",
  "Gobabis", "Otjiwarongo", "Ovitoto", "Otjinene",
];

export default function Membership() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("register");
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [members, setMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", age: "", gender: "", branch: "", address: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoadingMembers(true);
    const { data } = await supabase.from("members").select("*");
    if (data) setMembers(data);
    setLoadingMembers(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("members").insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      age: parseInt(formData.age),
      gender: formData.gender,
      branch: formData.branch,
      address: formData.address || null,
    });
    setSubmitting(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Registration Submitted",
        description: "Your membership application has been submitted for approval.",
      });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", age: "", gender: "", branch: "", address: "" });
    }
  };

  // Only approved members are returned by RLS
  const filteredMembers = members.filter((m) => {
    const name = `${m.first_name} ${m.last_name}`.toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase());
    const matchesBranch = branchFilter === "all" || m.branch === branchFilter;
    const matchesGender = genderFilter === "all" || m.gender === genderFilter;
    return matchesSearch && matchesBranch && matchesGender;
  });

  const membersByBranch = branches.map((branch) => ({
    branch,
    count: members.filter((m) => m.branch === branch).length,
    male: members.filter((m) => m.branch === branch && m.gender === "Male").length,
    female: members.filter((m) => m.branch === branch && m.gender === "Female").length,
  }));

  const totalActive = members.length;
  const totalMale = members.filter((m) => m.gender === "Male").length;
  const totalFemale = members.filter((m) => m.gender === "Female").length;

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-hero pattern-african">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-sm font-medium text-gold bg-gold/20 rounded-full mb-4">
              Membership
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Join the OTA Community
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Become a registered member of the Ovaherero Traditional Authority and
              connect with your heritage and community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gradient-hero text-primary-foreground">
              <CardContent className="p-6">
                <Users className="w-8 h-8 mb-2 opacity-80" />
                <p className="text-sm text-primary-foreground/80">Total Members</p>
                <p className="font-display text-3xl font-bold">{totalActive}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Male Members</p>
                <p className="font-display text-2xl font-bold text-foreground">{totalMale}</p>
                <p className="text-xs text-muted-foreground">
                  {totalActive > 0 ? Math.round((totalMale / totalActive) * 100) : 0}% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Female Members</p>
                <p className="font-display text-2xl font-bold text-foreground">{totalFemale}</p>
                <p className="text-xs text-muted-foreground">
                  {totalActive > 0 ? Math.round((totalFemale / totalActive) * 100) : 0}% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Branches</p>
                <p className="font-display text-2xl font-bold text-foreground">{branches.length}</p>
                <p className="text-xs text-muted-foreground">Across Namibia</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> Register
              </TabsTrigger>
              <TabsTrigger value="members" className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Members
              </TabsTrigger>
            </TabsList>

            {/* Registration Form */}
            <TabsContent value="register">
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">Membership Registration</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below to apply for OTA membership. Your application will be reviewed by an administrator.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" name="age" type="number" min="18" max="120" value={formData.age} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={formData.gender} onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}>
                          <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Select value={formData.branch} onValueChange={(value) => setFormData((prev) => ({ ...prev, branch: value }))}>
                        <SelectTrigger><SelectValue placeholder="Select your branch" /></SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Physical address" />
                    </div>
                    <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Members List */}
            <TabsContent value="members" className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Search members..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                    <div className="flex gap-2">
                      <Select value={branchFilter} onValueChange={setBranchFilter}>
                        <SelectTrigger className="w-[180px]">
                          <Filter className="w-4 h-4 mr-2" /><SelectValue placeholder="Branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Branches</SelectItem>
                          {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={genderFilter} onValueChange={setGenderFilter}>
                        <SelectTrigger className="w-[140px]"><SelectValue placeholder="Gender" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Genders</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {membersByBranch.slice(0, 4).map((branch) => (
                  <Card key={branch.branch}>
                    <CardContent className="p-4">
                      <p className="font-display font-semibold text-foreground truncate">{branch.branch}</p>
                      <p className="text-2xl font-bold text-primary">{branch.count}</p>
                      <p className="text-xs text-muted-foreground">{branch.male}M / {branch.female}F</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-xl">Member Directory</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingMembers ? (
                    <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Branch</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Gender</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">{member.first_name} {member.last_name}</TableCell>
                            <TableCell><Badge variant="secondary">{member.branch}</Badge></TableCell>
                            <TableCell>{member.age}</TableCell>
                            <TableCell>{member.gender}</TableCell>
                          </TableRow>
                        ))}
                        {filteredMembers.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                              No members found matching your filters.
                            </TableCell>
                          </TableRow>
                        )}
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
