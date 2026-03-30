import type { Scholarship } from "@/types/scholarship";
import { CalendarDays, ExternalLink, IndianRupee, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const typeColors: Record<string, string> = {
  Scholarship: "bg-primary/10 text-primary",
  Internship: "bg-accent/20 text-accent-foreground",
  Fellowship: "bg-chart-3/10 text-chart-3",
  Competition: "bg-chart-5/10 text-chart-5",
};

export default function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  const { title, type, amount, eligibility, deadline, apply_link, matchScore } = scholarship;
  const deadlineDate = new Date(deadline);
  const isExpired = deadlineDate < new Date();

  return (
    <div className="group relative flex flex-col rounded-xl border bg-card p-5 transition-all duration-300 card-shadow hover:card-shadow-hover hover:-translate-y-0.5">
      {matchScore && (
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
          {matchScore}%
        </div>
      )}

      <div className="mb-3 flex items-start gap-2">
        <Badge className={`text-xs font-medium ${typeColors[type] || "bg-muted text-muted-foreground"}`}>
          {type}
        </Badge>
        {isExpired && (
          <Badge variant="destructive" className="text-xs">Expired</Badge>
        )}
      </div>

      <h3 className="mb-2 font-display text-base font-semibold leading-snug text-card-foreground line-clamp-2 pr-10">
        {title}
      </h3>

      <div className="mb-4 flex flex-col gap-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <IndianRupee className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{amount}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{eligibility}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{deadlineDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>

      <div className="mt-auto">
        <Button
          asChild
          size="sm"
          className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <a href={apply_link} target="_blank" rel="noopener noreferrer">
            Apply Now <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    </div>
  );
}
