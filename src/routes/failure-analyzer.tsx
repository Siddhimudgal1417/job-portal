import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { PageHeader, Card, Stat, Badge, GradientButton, ProgressBar } from "@/components/ui-kit";
import { Brain, AlertTriangle, TrendingUp, Sparkles, Target, ArrowRight } from "lucide-react";
import {
  Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/failure-analyzer")({
  head: () => ({ meta: [{ title: "Career Failure Analyzer · JobConnect" }] }),
  component: FailureAnalyzer,
});

const funnelData = [
  { stage: "Applied", count: 47 },
  { stage: "Reviewed", count: 22 },
  { stage: "Interview", count: 7 },
  { stage: "Offer", count: 1 },
];

const rejectionReasons = [
  { reason: "Resume filtered by ATS", value: 38, color: "var(--indigo)" },
  { reason: "Missing key skills", value: 27, color: "var(--emerald)" },
  { reason: "Weak interview", value: 18, color: "var(--color-warning)" },
  { reason: "Overqualified / wrong fit", value: 12, color: "var(--color-destructive)" },
  { reason: "No referral", value: 5, color: "oklch(0.65 0.2 320)" },
];

function FailureAnalyzer() {
  return (
    <AppLayout>
      <PageHeader
        title="Career Failure Analyzer"
        subtitle="The honest analysis you won't get from a recruiter. AI looks at every rejection and finds the pattern."
        action={<GradientButton><Brain className="h-4 w-4" /> Re-run analysis</GradientButton>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat label="Applications" value={47} accent="indigo" />
        <Stat label="Interviews" value={7} hint="14.9% rate" accent="emerald" />
        <Stat label="Rejections" value={32} hint="68% of decided" accent="warning" />
        <Stat label="Offers" value={1} hint="2.1% conversion" accent="emerald" />
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-5 mb-6">
        <Card>
          <h3 className="font-display font-bold text-lg mb-1">Your funnel</h3>
          <p className="text-xs text-muted-foreground mb-4">Where you're losing the most candidates</p>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis dataKey="stage" type="category" stroke="var(--color-muted-foreground)" fontSize={11} width={80} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} fill="url(#funnelGrad)" />
                <defs>
                  <linearGradient id="funnelGrad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="var(--indigo)" />
                    <stop offset="100%" stopColor="var(--emerald)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg mb-1">Why you're rejected</h3>
          <p className="text-xs text-muted-foreground mb-2">AI-attributed reasons</p>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={rejectionReasons} dataKey="value" nameKey="reason" innerRadius={45} outerRadius={75} paddingAngle={2}>
                  {rejectionReasons.map((r, i) => <Cell key={i} fill={r.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs mt-2">
            {rejectionReasons.map(r => (
              <div key={r.reason} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                <span className="flex-1 truncate">{r.reason}</span>
                <span className="text-muted-foreground">{r.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mb-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero-bg opacity-95" />
        <div className="relative text-white">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs uppercase tracking-wider font-semibold opacity-80">AI Diagnosis</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold leading-tight max-w-3xl">
            You're getting filtered <span className="underline decoration-accent">before</span> a human ever sees your resume.
          </h3>
          <p className="mt-3 opacity-85 max-w-2xl">
            38% of your rejections happen at the ATS stage. Your resume is missing 3 high-frequency keywords
            and lacks quantified impact. Fix those two things and your interview rate could 3x.
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="font-bold">Missing Skills</h3>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              { s: "TypeScript", impact: "Appears in 82% of your target JDs" },
              { s: "System Design", impact: "Required for senior tracks" },
              { s: "Cloud (AWS/GCP)", impact: "70% of remote roles want it" },
              { s: "Testing (Jest)", impact: "Filter criteria at 4 companies" },
            ].map(x => (
              <li key={x.s} className="glass rounded-lg p-3">
                <div className="font-semibold">{x.s}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{x.impact}</div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-bold">Resume Weaknesses</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              "Only 1 of 8 bullets has a quantified outcome",
              "No 'Projects' section (peers have 2-3 on avg)",
              "Generic summary — doesn't target a role",
              "Skills section buried at bottom",
              "Missing LinkedIn & GitHub links",
            ].map(x => (
              <li key={x} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-accent" />
            <h3 className="font-bold">Recommended Categories</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Where your profile lands more interviews:</p>
          <div className="space-y-3">
            {[
              { c: "Frontend Engineer (Startup)", m: 92 },
              { c: "Full Stack Intern", m: 84 },
              { c: "Developer Relations", m: 71 },
              { c: "Solutions Engineer", m: 65 },
            ].map(x => (
              <div key={x.c}>
                <div className="flex justify-between text-xs mb-1"><span className="font-medium truncate">{x.c}</span><span className="text-muted-foreground">{x.m}%</span></div>
                <ProgressBar value={x.m} color={x.m >= 85 ? "emerald" : "indigo"} />
              </div>
            ))}
          </div>
          <GradientButton variant="outline" className="mt-4 w-full text-xs">
            See matching jobs <ArrowRight className="h-3 w-3" />
          </GradientButton>
        </Card>
      </div>
    </AppLayout>
  );
}
