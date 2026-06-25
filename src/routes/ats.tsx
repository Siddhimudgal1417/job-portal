import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { PageHeader, Card, Badge, ProgressBar, GradientButton, ScoreRing } from "@/components/ui-kit";
import { Upload, FileText, Sparkles, CheckCircle2, AlertTriangle, Wand2 } from "lucide-react";

export const Route = createFileRoute("/ats")({
  head: () => ({ meta: [{ title: "ATS Resume Analyzer · JobConnect" }] }),
  component: ATSPage,
});

function ATSPage() {
  const [analyzed, setAnalyzed] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [jd, setJd] = useState("");

  return (
    <AppLayout>
      <PageHeader title="ATS Resume Analyzer" subtitle="Upload your resume and the job description. We'll tell you exactly why you're (not) getting through." />

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <Card>
          <h3 className="font-bold mb-3 flex items-center gap-2"><FileText className="h-4 w-4" /> 1. Your Resume</h3>
          <label className="block border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/40 transition cursor-pointer">
            <input
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={e => setFile(e.target.files?.[0]?.name ?? "resume.pdf")}
            />
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <div className="font-medium text-sm">{file ?? "Drop your PDF or DOCX here"}</div>
            <div className="text-xs text-muted-foreground mt-1">Max 5MB · We never store your file</div>
          </label>
        </Card>
        <Card>
          <h3 className="font-bold mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4" /> 2. Job Description</h3>
          <textarea
            value={jd}
            onChange={e => setJd(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full h-36 px-4 py-3 rounded-xl bg-background border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <GradientButton className="mt-3 w-full" onClick={() => setAnalyzed(true)}>
            <Sparkles className="h-4 w-4" /> Analyze with AI
          </GradientButton>
        </Card>
      </div>

      {analyzed && (
        <div className="grid lg:grid-cols-[1fr_2fr] gap-5 animate-fade-up">
          <Card className="text-center">
            <h3 className="font-bold mb-1">ATS Match Score</h3>
            <p className="text-xs text-muted-foreground mb-4">vs. Frontend Engineer @ Stripe</p>
            <div className="grid place-items-center py-2">
              <ScoreRing value={72} size={160} label="Match" />
            </div>
            <div className="mt-4 space-y-3 text-left">
              <ScoreLine label="Keywords" v={68} />
              <ScoreLine label="Skills" v={75} />
              <ScoreLine label="Format" v={88} />
              <ScoreLine label="Experience" v={62} />
            </div>
          </Card>

          <div className="space-y-5">
            <Card>
              <h3 className="font-bold mb-3 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "GraphQL", "Jest", "CI/CD", "WebSockets", "OAuth"].map(k =>
                  <Badge key={k} variant="destructive">{k}</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-3">Adding these could push your score above 90%.</p>
            </Card>

            <Card>
              <h3 className="font-bold mb-3 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Missing Skills</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { s: "TypeScript", note: "Mentioned 7x in JD. Not on your resume." },
                  { s: "Testing (Jest/Vitest)", note: "Required. You list no testing experience." },
                  { s: "GraphQL", note: "Preferred. Could add to a side project." },
                ].map(x => (
                  <li key={x.s} className="flex items-start gap-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-warning shrink-0" />
                    <div><b>{x.s}</b> — <span className="text-muted-foreground">{x.note}</span></div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="font-bold mb-3 flex items-center gap-2"><Wand2 className="h-4 w-4 text-accent" /> AI-Suggested Rewrites</h3>
              <div className="space-y-3">
                {[
                  { from: "Built a dashboard for tracking metrics", to: "Built a React + TypeScript analytics dashboard with Jest test coverage, reducing reporting time by 40%." },
                  { from: "Worked with APIs", to: "Designed and consumed REST + GraphQL APIs for a multi-tenant SaaS app handling 10K+ daily requests." },
                ].map((r, i) => (
                  <div key={i} className="glass rounded-lg p-3 text-sm">
                    <div className="text-xs text-destructive line-through mb-1">{r.from}</div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <div className="text-foreground">{r.to}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

function ScoreLine({ label, v }: { label: string; v: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5"><span className="font-medium">{label}</span><span className="text-muted-foreground">{v}/100</span></div>
      <ProgressBar value={v} color={v >= 80 ? "emerald" : v >= 70 ? "indigo" : "warning"} />
    </div>
  );
}
