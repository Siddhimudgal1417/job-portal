import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { PageHeader, Card, Badge, GradientButton } from "@/components/ui-kit";
import { jobs } from "@/lib/mock-data";
import { Search, MapPin, Bookmark, BookmarkCheck, Filter, Building2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/jobs")({
  head: () => ({ meta: [{ title: "Jobs · JobConnect" }] }),
  component: JobsPage,
});

function JobsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "remote" | "internship" | "saved">("all");
  const [saved, setSaved] = useState<Set<string>>(new Set(["1", "7"]));

  const filtered = jobs.filter(j => {
    if (filter === "remote" && !j.remote) return false;
    if (filter === "internship" && j.type !== "Internship") return false;
    if (filter === "saved" && !saved.has(j.id)) return false;
    if (query && !`${j.title} ${j.company} ${j.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const toggleSave = (id: string) => {
    setSaved(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <AppLayout>
      <PageHeader
        title="Find your next role"
        subtitle="Curated jobs ranked by your skill match score."
      />

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by role, company, or skill..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: "all", label: "All" },
              { id: "remote", label: "Remote" },
              { id: "internship", label: "Internships" },
              { id: "saved", label: `Saved (${saved.size})` },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as typeof filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  filter === f.id ? "gradient-primary-bg text-primary-foreground shadow-soft" : "glass hover:bg-muted"
                }`}
              >
                {f.label}
              </button>
            ))}
            <button className="grid place-items-center h-10 w-10 rounded-lg glass hover:bg-muted">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {filtered.map(j => (
          <Card key={j.id} className="hover-lift">
            <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-start">
              <div className="h-12 w-12 rounded-xl gradient-primary-bg grid place-items-center text-white font-bold shrink-0">
                {j.logo}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-lg truncate">{j.title}</h3>
                  <Badge variant={j.match >= 85 ? "success" : j.match >= 75 ? "indigo" : "default"}>
                    <Sparkles className="h-3 w-3" /> {j.match}% match
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {j.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {j.location}</span>
                  <span>· {j.type}</span>
                  <span>· {j.posted}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {j.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button onClick={() => toggleSave(j.id)} className="h-9 w-9 grid place-items-center rounded-lg glass hover:bg-muted">
                  {saved.has(j.id) ? <BookmarkCheck className="h-4 w-4 text-accent" /> : <Bookmark className="h-4 w-4" />}
                </button>
                <div className="hidden sm:block text-sm font-semibold">{j.salary}</div>
                <GradientButton className="px-4 py-2 text-xs">Apply</GradientButton>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="text-center py-12 text-muted-foreground">No jobs match your filters.</Card>
        )}
      </div>
    </AppLayout>
  );
}
