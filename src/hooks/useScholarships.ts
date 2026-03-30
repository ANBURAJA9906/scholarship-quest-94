import { useState, useEffect, useMemo } from "react";
import type { Scholarship } from "@/types/scholarship";

export interface Filters {
  search: string;
  category: string;
  amountRange: string;
  deadline: string;
}

const parseAmount = (amount: string): number => {
  const match = amount.replace(/,/g, "").match(/[\d]+/);
  return match ? parseInt(match[0], 10) : 0;
};

export function useScholarships() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "All",
    amountRange: "All",
    deadline: "All",
  });

  useEffect(() => {
    fetch("/data/scholarships.json")
      .then((res) => res.json())
      .then((data: Scholarship[]) => {
        const withScores = data.map((s) => ({
          ...s,
          matchScore: Math.floor(Math.random() * 40) + 60,
        }));
        setScholarships(withScores);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const types = [...new Set(scholarships.map((s) => s.type))];
    return ["All", ...types];
  }, [scholarships]);

  const filtered = useMemo(() => {
    return scholarships.filter((s) => {
      if (
        filters.search &&
        !s.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;

      if (filters.category !== "All" && s.type !== filters.category)
        return false;

      if (filters.amountRange !== "All") {
        const amt = parseAmount(s.amount);
        if (filters.amountRange === "Under ₹10,000" && amt >= 10000) return false;
        if (filters.amountRange === "₹10,000 - ₹50,000" && (amt < 10000 || amt > 50000)) return false;
        if (filters.amountRange === "₹50,000 - ₹1,00,000" && (amt < 50000 || amt > 100000)) return false;
        if (filters.amountRange === "Above ₹1,00,000" && amt < 100000) return false;
      }

      if (filters.deadline !== "All") {
        const dl = new Date(s.deadline);
        const now = new Date();
        const diff = (dl.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        if (filters.deadline === "This Week" && diff > 7) return false;
        if (filters.deadline === "This Month" && diff > 30) return false;
        if (filters.deadline === "Next 3 Months" && diff > 90) return false;
      }

      return true;
    });
  }, [scholarships, filters]);

  const categoryStats = useMemo(() => {
    const map: Record<string, number> = {};
    scholarships.forEach((s) => {
      map[s.type] = (map[s.type] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [scholarships]);

  return { scholarships, filtered, loading, filters, setFilters, categories, categoryStats };
}
