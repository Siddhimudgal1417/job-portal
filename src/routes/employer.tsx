import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { PageHeader, Card, Stat, Badge, GradientButton, ProgressBar } from "@/components/ui-kit";
import { employerApplicants } from "@/lib/mock-data";
import { Plus, TrendingUp, Sparkles } from "lucide-react";
import {
  Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/employer")({
  head: () => ({ meta: [{ title: "Employer Dashboard · JobConnect" }] }),
  component: Employer,
});

const sourceData = [
  { src: "JobConnect", count: 124 },
  { src: "LinkedIn", count: 89 },
  { src: "Referral", count: 52 },
  { src: "Direct", count: 31 },
];

function Employer() {
  return (
    <AppLayout>
      <PageHeader
        title="Employer Dashboard"
        subtitle="Post roles, see AI-ranked candidates, and hire faster."
        action={<GradientButton><Plus className="h-4 w-4" /> Post a job</GradientButton>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat label="Active jobs" value={6} accent="indigo" />
        <Stat label="Applicants" value={296} hint="+42 this week" accent="emerald" />
        <Stat label="Avg time-to-hire" value="18d" hint="↓ 6 days" accent="emerald" />
        <Stat label="Offer accept rate" value="74%" accent="indigo" />
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-5 mb-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-lg">Top Candidates · Frontend Intern</h3>
              <p className="text-xs text-muted-foreground">Ranked by AI match score</p>
            </div>
            <Badge variant="indigo"><Sparkles className="h-3 w-3" /> AI-ranked</Badge>
          </div>
          <div className="space-y-2.5">
            {employerApplicants.map(c => (
              <div key={c.id} className="glass rounded-xl p-3 grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center">
                <div className="h-10 w-10 rounded-full gradient-primary-bg grid place-items-center text-primary-foreground text-xs font-bold shrink-0">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.exp}</div>
                </div>
                <div className="hidden sm:block w-32">
                  <div className="flex justify-between text-xs mb-1"><span>Match</span><span className="font-semibold">{c.match}%</span></div>
                  <ProgressBar value={c.match} color={c.match >= 90 ? "emerald" : "indigo"} />
                </div>
                <Badge variant={c.status === "Interview" ? "success" : c.status === "Shortlisted" ? "indigo" : "default"}>{c.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-lg">Hiring Analytics</h3>
            <Badge variant="success"><TrendingUp className="h-3 w-3" /> +18%</Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Candidate sources, last 30 days</p>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={sourceData}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="src" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="url(#srcGrad)" />
                <defs>
                  <linearGradient id="srcGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--indigo)" />
                    <stop offset="100%" stopColor="var(--emerald)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-display font-bold text-lg mb-4">Active Roles</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 pr-4">Role</th>
                <th className="py-3 pr-4">Type</th>
                <th className="py-3 pr-4">Applicants</th>
                <th className="py-3 pr-4">In Pipeline</th>
                <th className="py-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { r: "Frontend Engineer Intern", t: "Internship", a: 124, p: 18, s: "Active" },
                { r: "Senior Backend Engineer", t: "Full-time", a: 87, p: 12, s: "Active" },
                { r: "Product Designer", t: "Full-time", a: 52, p: 7, s: "Interview" },
                { r: "DevOps Engineer", t: "Full-time", a: 33, p: 4, s: "Active" },
              ].map((r, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="py-3 pr-4 font-medium">{r.r}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{r.t}</td>
                  <td className="py-3 pr-4">{r.a}</td>
                  <td className="py-3 pr-4">{r.p}</td>
                  <td className="py-3 pr-4"><Badge variant={r.s === "Interview" ? "indigo" : "success"}>{r.s}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppLayout>
  );
}
