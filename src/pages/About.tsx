import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, BookOpen, Shield } from "lucide-react";

// Placeholder leadership data - can be updated with real data later
const leadershipTeam = [
  {
    name: "Prof. Mutjinde Katjiua",
    title: "Paramount Chief (Ombara Otjitambi)",
    description:
      "Leading the OTA with vision for economic liberation and cultural preservation through the five strategic development pillars.",
    image: null,
  },
  {
    name: "Chief Hosea Kutako Memorial",
    title: "Historical Paramount Chief (1870-1970)",
    description:
      "Legendary leader who petitioned the United Nations for Namibian independence and preserved the unity of the Ovaherero people.",
    image: null,
  },
];

const councilMembers = [
  { name: "Council Member 1", title: "Area Chief - Ovitoto", branch: "Central" },
  { name: "Council Member 2", title: "Area Chief - Aminuis", branch: "Eastern" },
  { name: "Council Member 3", title: "Area Chief - Okakarara", branch: "Northern" },
  { name: "Council Member 4", title: "Area Chief - Gobabis", branch: "Omaheke" },
];

const strategicPillars = [
  {
    icon: Shield,
    title: "Constitutional Democracy",
    description: "Transform OTA into a constitutional democracy with clear governance structures.",
  },
  {
    icon: Users,
    title: "Cattle Enterprise",
    description: "Establish an OTA cattle enterprise to strengthen our pastoral heritage and economy.",
  },
  {
    icon: Award,
    title: "Genocide Negotiations",
    description: "Restart and advance negotiations for recognition and reparations for the 1904 genocide.",
  },
  {
    icon: BookOpen,
    title: "Centralised Leadership",
    description: "Ensure unified and centralised leadership across all Ovaherero communities.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero pattern-african">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-sm font-medium text-gold bg-gold/20 rounded-full mb-4">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Our Leadership & Heritage
            </h1>
            <p className="text-lg text-primary-foreground/90">
              The Ovaherero Traditional Authority represents the unified voice of the
              Ovaherero people, with a Chiefs Council established in 1863. Learn about
              our leadership structure and the rich history that guides us.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Our History
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Ovaherero people, also known as Herero, are a Bantu ethnic group
                  with a vibrant history originating from southern Africa. With an
                  estimated population of 250,000 in Namibia, the Ovaherero have
                  maintained their cultural identity despite significant historical
                  challenges.
                </p>
                <p>
                  The tragic events of 1904-1908 saw the German colonial forces commit
                  genocide against our people, reducing our population by 80%. Despite
                  this, survivors fled to neighboring Botswana and Angola, preserving
                  our traditions and eventually returning to rebuild our community.
                </p>
                <p>
                  Today, under the leadership of Paramount Chief Prof. Mutjinde Katjiua,
                  the Ovaherero Traditional Authority continues to advocate for
                  recognition, reparations, and the economic empowerment of our people.
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Cultural Heritage
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Ovaherero are traditionally pastoralists, with cattle holding
                  central importance in our culture, economy, and spiritual practices.
                  Our cattle represent wealth, social status, and are integral to
                  ceremonies and marriages.
                </p>
                <p>
                  Ovaherero women are known worldwide for the distinctive ohorokova
                  dress—Victorian-style garments adopted during colonial times and
                  transformed into powerful symbols of cultural identity and resilience.
                  The distinctive horn-shaped headpieces represent cattle horns,
                  honoring our pastoral heritage.
                </p>
                <p>
                  We speak Otjiherero, a Bantu language that connects us to our
                  ancestors and unites Ovaherero communities across Namibia, Botswana,
                  and Angola.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Five Strategic Development Pillars
            </h2>
            <p className="text-muted-foreground">
              Our roadmap for economic liberation and cultural preservation,
              launched by Paramount Chief Prof. Mutjinde Katjiua.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strategicPillars.map((pillar, index) => (
              <Card key={pillar.title} className="text-center hover:shadow-elevated transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <pillar.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Leadership
            </h2>
            <p className="text-muted-foreground">
              The Chiefs Council leads the Ovaherero Traditional Authority with wisdom
              and dedication to our people's wellbeing.
            </p>
          </div>

          {/* Paramount Chief */}
          <div className="max-w-3xl mx-auto mb-16">
            {leadershipTeam.map((leader) => (
              <Card key={leader.name} className="overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-display font-bold text-primary-foreground">
                      {leader.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-gold font-medium mb-4">{leader.title}</p>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    {leader.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Council Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {councilMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary mb-1">{member.title}</p>
                  <p className="text-xs text-muted-foreground">{member.branch} Region</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
