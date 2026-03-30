import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useScholarships } from "@/hooks/useScholarships";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Award, Clock, TrendingUp, Users } from "lucide-react";

const PIE_COLORS = [
  "hsl(168, 65%, 38%)",
  "hsl(38, 92%, 55%)",
  "hsl(262, 52%, 55%)",
  "hsl(200, 70%, 50%)",
  "hsl(340, 65%, 55%)",
  "hsl(150, 50%, 45%)",
];

export default function Dashboard() {
  const { scholarships, loading, categoryStats } = useScholarships();

  if (loading) return <><Navbar /><LoadingSpinner /></>;

  const activeCount = scholarships.filter((s) => new Date(s.deadline) >= new Date()).length;
  const avgScore = Math.round(scholarships.reduce((a, s) => a + (s.matchScore || 0), 0) / scholarships.length);

  const stats = [
    { label: "Total Scholarships", value: scholarships.length, icon: Award, color: "text-primary" },
    { label: "Active", value: activeCount, icon: Clock, color: "text-chart-2" },
    { label: "Categories", value: categoryStats.length, icon: Users, color: "text-chart-3" },
    { label: "Avg Match Score", value: `${avgScore}%`, icon: TrendingUp, color: "text-chart-4" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Dashboard</h1>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border bg-card p-5 card-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className={`mt-1 font-display text-2xl font-bold ${color}`}>{value}</p>
                </div>
                <div className={`rounded-lg bg-muted p-2.5 ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 card-shadow">
            <h2 className="mb-4 font-display text-lg font-semibold text-card-foreground">Scholarships by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryStats}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(168, 65%, 38%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border bg-card p-6 card-shadow">
            <h2 className="mb-4 font-display text-lg font-semibold text-card-foreground">Distribution by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryStats} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" nameKey="name" label>
                  {categoryStats.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
