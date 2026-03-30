import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Filter, GraduationCap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const features = [
  { icon: Search, title: "Smart Search", desc: "Find scholarships matching your profile with intelligent filtering." },
  { icon: BarChart3, title: "Visual Analytics", desc: "Interactive charts showing scholarship trends and distributions." },
  { icon: Filter, title: "Advanced Filters", desc: "Filter by category, amount, deadline, and eligibility criteria." },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(168_65%_38%/0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground/80">
              <GraduationCap className="h-4 w-4" />
              AI-Powered Scholarship Discovery
            </div>
            <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight text-primary-foreground md:text-6xl">
              Find Your Perfect
              <span className="block text-accent">Scholarship Match</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/70 md:text-xl">
              Discover and compare hundreds of scholarships, fellowships, and internships — personalized to your profile.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="gradient-accent text-accent-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity">
                <Link to="/recommendations">
                  Explore Scholarships <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground">
          Why ScholarPath?
        </h2>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border bg-card p-6 text-center card-shadow transition-all hover:card-shadow-hover hover:-translate-y-0.5">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-card-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
