import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ChevronLeft, DollarSign, Truck, Package } from "lucide-react";

// Sample contributions data - will be replaced with real data from backend
const chaptersData = [
  {
    id: 1,
    name: "Windhoek Central",
    percentage: 25,
    total: 125000,
    money: 80000,
    livestock: 30000,
    equipment: 15000,
    color: "#8B2323",
  },
  {
    id: 2,
    name: "Okahandja",
    percentage: 20,
    total: 100000,
    money: 50000,
    livestock: 40000,
    equipment: 10000,
    color: "#D4A574",
  },
  {
    id: 3,
    name: "Aminuis",
    percentage: 18,
    total: 90000,
    money: 40000,
    livestock: 45000,
    equipment: 5000,
    color: "#5D4E37",
  },
  {
    id: 4,
    name: "Okakarara",
    percentage: 15,
    total: 75000,
    money: 35000,
    livestock: 30000,
    equipment: 10000,
    color: "#A0522D",
  },
  {
    id: 5,
    name: "Gobabis",
    percentage: 12,
    total: 60000,
    money: 30000,
    livestock: 20000,
    equipment: 10000,
    color: "#CD853F",
  },
  {
    id: 6,
    name: "Otjiwarongo",
    percentage: 10,
    total: 50000,
    money: 25000,
    livestock: 15000,
    equipment: 10000,
    color: "#8B4513",
  },
];

const totalContributions = chaptersData.reduce((sum, c) => sum + c.total, 0);

const contributionTypes = [
  { name: "Money", value: chaptersData.reduce((sum, c) => sum + c.money, 0), icon: DollarSign, color: "#8B2323" },
  { name: "Livestock", value: chaptersData.reduce((sum, c) => sum + c.livestock, 0), icon: Truck, color: "#D4A574" },
  { name: "Equipment", value: chaptersData.reduce((sum, c) => sum + c.equipment, 0), icon: Package, color: "#5D4E37" },
];

export default function Contributions() {
  const [selectedChapter, setSelectedChapter] = useState<typeof chaptersData[0] | null>(null);

  const pieData = chaptersData.map((c) => ({
    name: c.name,
    value: c.percentage,
    color: c.color,
  }));

  const selectedChapterBreakdown = selectedChapter
    ? [
        { name: "Money", value: selectedChapter.money, color: "#8B2323" },
        { name: "Livestock", value: selectedChapter.livestock, color: "#D4A574" },
        { name: "Equipment", value: selectedChapter.equipment, color: "#5D4E37" },
      ]
    : [];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-hero pattern-african">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-sm font-medium text-gold bg-gold/20 rounded-full mb-4">
              Contributions
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Chapter Contributions
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Track and celebrate the contributions from all OTA chapters. Together,
              we build a stronger community.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-hero text-primary-foreground">
              <CardContent className="p-6">
                <p className="text-sm text-primary-foreground/80 mb-1">Total Contributions</p>
                <p className="font-display text-3xl font-bold">
                  N${totalContributions.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            {contributionTypes.map((type) => (
              <Card key={type.name}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${type.color}20` }}
                  >
                    <type.icon className="w-6 h-6" style={{ color: type.color }} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{type.name}</p>
                    <p className="font-display text-xl font-bold text-foreground">
                      N${type.value.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedChapter ? (
            /* Chapter Detail View */
            <div className="animate-fade-in">
              <Button
                variant="ghost"
                onClick={() => setSelectedChapter(null)}
                className="mb-6"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to all chapters
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">
                      {selectedChapter.name} Chapter
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">
                          Share of Total Contributions
                        </span>
                        <span className="font-semibold">{selectedChapter.percentage}%</span>
                      </div>
                      <Progress value={selectedChapter.percentage} className="h-3" />
                    </div>
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground mb-1">Total Contributed</p>
                      <p className="font-display text-4xl font-bold text-foreground">
                        N${selectedChapter.total.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-xl">
                      Contribution Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={selectedChapterBreakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {selectedChapterBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value: number) => `N$${value.toLocaleString()}`}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {selectedChapterBreakdown.map((item) => (
                        <div key={item.name} className="text-center">
                          <p className="text-sm text-muted-foreground">{item.name}</p>
                          <p className="font-semibold">N${item.value.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            /* Overview View */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-xl">
                    Contributions by Chapter (%)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                          labelLine={false}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-xl">
                    Contributions by Amount
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chaptersData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(v) => `N$${v / 1000}k`} />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Tooltip formatter={(value: number) => `N$${value.toLocaleString()}`} />
                        <Bar dataKey="total" fill="#8B2323" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Chapters List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="font-display text-xl">
                    All Chapters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chaptersData.map((chapter) => (
                      <button
                        key={chapter.id}
                        onClick={() => setSelectedChapter(chapter)}
                        className="p-4 border rounded-lg text-left hover:shadow-elevated hover:border-primary/20 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                            {chapter.name}
                          </h3>
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: chapter.color }}
                          />
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Contribution</span>
                            <span className="font-medium">{chapter.percentage}%</span>
                          </div>
                          <Progress value={chapter.percentage} className="h-2" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Total: N${chapter.total.toLocaleString()}
                        </p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
