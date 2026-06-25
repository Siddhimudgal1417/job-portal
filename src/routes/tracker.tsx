import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { PageHeader, Card, Badge, GradientButton } from "@/components/ui-kit";
import { applications } from "@/lib/mock-data";
import { Plus, Calendar } from "lucide-react";

export const Route = createFileRoute("/tracker")({
  head: () => ({ meta: [{ title: "Application Tracker · JobConnect" }] }),
  component: Tracker,
});

const COLUMNS = [
  { key: "Applied", color: "default" as const, accent: "bg-muted-foreground/40" },
  { key: "Under Review", color: "indigo" as const, accent: "gradient-primary-bg" },
  { key: "Interview", color: "indigo" as const, accent: "gradient-primary-bg" },
  { key: "Offer", color: "success" as const, accent: "gradient-emerald-bg" },
  { key: "Rejected", color: "destructive" as const, accent: "bg-destructive" },
];

function Tracker() {
  const grouped = COLUMNS.map(c => ({
    ...c,
    items: applications.filter(a => a.status === c.key),
  }));

  return (
    <AppLayout>
      <PageHeader
        title="Application Tracker"
        subtitle="Every application across every company. One pipeline."
        action={<GradientButton><Plus className="h-4 w-4" /> Add application</GradientButton>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {grouped.map(col => (
          <div key={col.key} className="min-w-0">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${col.accent}`} />
                <h3 className="font-semibold text-sm">{col.key}</h3>
              </div>
              <Badge variant={col.color}>{col.items.length}</Badge>
            </div>
            <div className="space-y-2.5">
              {col.items.map(a => (
                <Card key={a.id} className="p-4 hover-lift cursor-pointer">
                  <div className="font-semibold text-sm truncate">{a.company}</div>
                  <div className="text-xs text-muted-foreground truncate">{a.role}</div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />{new Date(a.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </span>
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map(i => (
                        <span key={i} className={`h-1.5 w-3 rounded-full ${i <= a.stage ? "gradient-primary-bg" : "bg-muted"}`} />
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
              {col.items.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-6 border border-dashed border-border rounded-xl">Empty</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
