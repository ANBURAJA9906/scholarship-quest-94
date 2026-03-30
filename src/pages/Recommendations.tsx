import Navbar from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import ScholarshipCard from "@/components/ScholarshipCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useScholarships } from "@/hooks/useScholarships";

export default function Recommendations() {
  const { filtered, loading, filters, setFilters, categories } = useScholarships();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Recommended Scholarships</h1>
        <p className="mb-8 text-muted-foreground">Personalized scholarship matches based on your profile</p>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <FilterBar filters={filters} setFilters={setFilters} categories={categories} resultCount={filtered.length} />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s, i) => (
                <ScholarshipCard key={i} scholarship={s} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="mt-16 text-center">
                <p className="text-lg font-medium text-muted-foreground">No scholarships match your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
