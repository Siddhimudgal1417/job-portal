import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { PageHeader, Card, Badge, GradientButton, ScoreRing, ProgressBar } from "@/components/ui-kit";
import { interviewQuestions } from "@/lib/mock-data";
import { MessageSquare, Mic, Sparkles, ChevronRight, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/interview")({
  head: () => ({ meta: [{ title: "Mock Interview · JobConnect" }] }),
  component: MockInterview,
});

function MockInterview() {
  const [active, setActive] = useState(0);
  const q = interviewQuestions[active];

  return (
    <AppLayout>
      <PageHeader
        title="AI Mock Interview"
        subtitle="Practice with real questions. Get scored on what matters."
        action={<GradientButton><RotateCcw className="h-4 w-4" /> New session</GradientButton>}
      />

      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <div className="space-y-5">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl gradient-accent-bg grid place-items-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Question {active + 1} of {interviewQuestions.length}</div>
                  <div className="font-semibold">{q.topic}</div>
                </div>
              </div>
              <Badge variant={q.difficulty === "Hard" ? "destructive" : q.difficulty === "Medium" ? "warning" : "success"}>{q.difficulty}</Badge>
            </div>
            <div className="glass rounded-xl p-5">
              <p className="text-lg font-medium leading-relaxed">{q.q}</p>
            </div>
            <textarea
              placeholder="Type your answer or click the mic to speak..."
              className="mt-4 w-full h-40 px-4 py-3 rounded-xl bg-background border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="mt-3 flex flex-wrap gap-2 justify-between">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-muted text-sm font-medium">
                <Mic className="h-4 w-4 text-accent" /> Record answer
              </button>
              <div className="flex gap-2">
                <GradientButton variant="outline">Get AI feedback</GradientButton>
                <GradientButton onClick={() => setActive(a => Math.min(a + 1, interviewQuestions.length - 1))}>
                  Next <ChevronRight className="h-4 w-4" />
                </GradientButton>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-accent" />
              <h3 className="font-bold">AI Feedback on your last answer</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { l: "Clarity", v: 8.2 },
                { l: "Structure (STAR)", v: 7.5 },
                { l: "Confidence", v: 6.8 },
              ].map(s => (
                <div key={s.l} className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold font-display text-gradient">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="glass rounded-lg p-3">
                <div className="text-xs font-semibold text-accent mb-1">✓ What worked</div>
                <p className="text-muted-foreground">You opened with a clear situation and named the stakeholders.</p>
              </div>
              <div className="glass rounded-lg p-3">
                <div className="text-xs font-semibold text-warning mb-1">! Could improve</div>
                <p className="text-muted-foreground">You skipped the "Result" — quantify the outcome (numbers, %, time saved).</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="text-center">
            <h3 className="font-bold mb-1">Readiness Score</h3>
            <p className="text-xs text-muted-foreground mb-4">For Frontend Eng roles</p>
            <div className="grid place-items-center">
              <ScoreRing value={66} size={140} label="Ready?" />
            </div>
            <div className="mt-4 space-y-2 text-left">
              <SubScore label="Behavioral" v={78} />
              <SubScore label="Technical" v={62} />
              <SubScore label="System Design" v={45} />
              <SubScore label="Coding (DSA)" v={70} />
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-3 text-sm">Questions in this session</h3>
            <ul className="space-y-1.5">
              {interviewQuestions.map((iq, i) => (
                <li key={iq.id}>
                  <button
                    onClick={() => setActive(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition ${i === active ? "gradient-primary-bg text-primary-foreground" : "hover:bg-muted"}`}
                  >
                    <div className="flex justify-between gap-2">
                      <span className="truncate flex-1">Q{i + 1}. {iq.q}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

function SubScore({ label, v }: { label: string; v: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1"><span>{label}</span><span className="text-muted-foreground">{v}</span></div>
      <ProgressBar value={v} color={v >= 75 ? "emerald" : v >= 60 ? "indigo" : "warning"} />
    </div>
  );
}
