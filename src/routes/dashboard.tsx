import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { PageHeader, Card, Stat, ProgressBar, ScoreRing, Badge, GradientButton } from "@/components/ui-kit";
import { applicationTrend, skillRadar, careerScores, applications } from "@/lib/mock-data";
import { TrendingUp, ArrowRight, Brain, Target, Zap } from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Career Health Dashboard · JobConnect" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppLayout>
      <PageHeader
        title="Career Health Dashboard"
        subtitle="Your real-time hireability score. Updated as you apply, learn, and interview."
        action={
          <Link to="/failure-analyzer">
            <GradientButton><Brain className="h-4 w-4" /> Run Failure Analysis</GradientButton>
          </Link>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Stat label="ATS Score" value={careerScores.ats} hint="↑ 8 this week" accent="indigo" />
        <Stat label="Resume Quality" value={careerScores.resume} hint="↑ 12 this month" accent="emerald" />
        <Stat label="Interview Readiness" value={careerScores.interview} hint="Practice more" accent="warning" />
        <Stat label="Success Rate" value="23%" hint="vs 8% avg" accent="indigo" />
        <Stat label="Skill Match" value={careerScores.skill} hint="3 gaps" accent="emerald" />
        <Stat label="Career Growth" value={careerScores.growth} hint="Trending up" accent="emerald" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-lg">Applications over time</h3>
              <p className="text-xs text-muted-foreground">Last 6 weeks</p>
            </div>
            <Badge variant="success"><TrendingUp className="h-3 w-3" /> +28%</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={applicationTrend}>
                <defs>
                  <linearGradient id="gApplied" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--indigo)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--indigo)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gInt" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--emerald)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--emerald)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="applied" stroke="var(--indigo)" strokeWidth={2} fill="url(#gApplied)" />
                <Area type="monotone" dataKey="interviews" stroke="var(--emerald)" strokeWidth={2} fill="url(#gInt)" />
                <Area type="monotone" dataKey="offers" stroke="var(--color-warning)" strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg mb-1">Overall Score</h3>
          <p className="text-xs text-muted-foreground mb-4">Weighted across all metrics</p>
          <div className="grid place-items-center py-4">
            <ScoreRing value={74} size={170} label="Hireable" />
          </div>
          <div className="mt-4 glass rounded-lg p-3 text-xs flex items-start gap-2">
            <Zap className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <span className="text-muted-foreground">You're in the <b className="text-foreground">top 18%</b> of your peer group.</span>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <h3 className="font-display font-bold text-lg mb-4">Skills vs. Market Demand</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart data={skillRadar}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "var(--color-foreground)" }} />
                <PolarRadiusAxis stroke="var(--color-muted-foreground)" fontSize={9} />
                <Radar dataKey="market" stroke="var(--emerald)" fill="var(--emerald)" fillOpacity={0.15} strokeWidth={2} />
                <Radar dataKey="you" stroke="var(--indigo)" fill="var(--indigo)" fillOpacity={0.3} strokeWidth={2} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg mb-4">Recent activity</h3>
          <div className="space-y-3">
            {applications.slice(0, 5).map(a => (
              <div key={a.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{a.company}</div>
                  <div className="text-xs text-muted-foreground truncate">{a.role}</div>
                </div>
                <Badge variant={
                  a.status === "Offer" ? "success" :
                  a.status === "Rejected" ? "destructive" :
                  a.status === "Interview" ? "indigo" : "default"
                }>{a.status}</Badge>
              </div>
            ))}
          </div>
          <Link to="/tracker" className="mt-4 text-xs flex items-center gap-1 text-primary font-medium hover:underline">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </Card>
      </div>

      <Card className="mt-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero-bg opacity-95" />
        <div className="relative grid sm:grid-cols-[1fr_auto] gap-4 items-center text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5" />
              <span className="text-xs uppercase tracking-wider font-semibold opacity-80">AI Coach Recommendation</span>
            </div>
            <h3 className="text-xl font-bold">Focus on System Design this week.</h3>
            <p className="mt-1 text-sm opacity-85">It's your biggest skill gap and shows up in 80% of your target roles.</p>
          </div>
          <Link to="/interview">
            <GradientButton variant="accent">Start practice <ArrowRight className="h-4 w-4" /></GradientButton>
          </Link>
        </div>
      </Card>
    </AppLayout>
  );
}
