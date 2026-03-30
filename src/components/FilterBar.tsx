import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Filters } from "@/hooks/useScholarships";

interface FilterBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  categories: string[];
  resultCount: number;
}

const amountRanges = ["All", "Under ₹10,000", "₹10,000 - ₹50,000", "₹50,000 - ₹1,00,000", "Above ₹1,00,000"];
const deadlineOptions = ["All", "This Week", "This Month", "Next 3 Months"];

export default function FilterBar({ filters, setFilters, categories, resultCount }: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search scholarships..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            className="pl-10 bg-card"
          />
        </div>
        <span className="text-sm text-muted-foreground">{resultCount} results</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={filters.category} onValueChange={(v) => setFilters((f) => ({ ...f, category: v }))}>
          <SelectTrigger className="w-[160px] bg-card">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.amountRange} onValueChange={(v) => setFilters((f) => ({ ...f, amountRange: v }))}>
          <SelectTrigger className="w-[180px] bg-card">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent>
            {amountRanges.map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.deadline} onValueChange={(v) => setFilters((f) => ({ ...f, deadline: v }))}>
          <SelectTrigger className="w-[160px] bg-card">
            <SelectValue placeholder="Deadline" />
          </SelectTrigger>
          <SelectContent>
            {deadlineOptions.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
