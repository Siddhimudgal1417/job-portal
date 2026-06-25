import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { PageHeader, Card, Badge, GradientButton } from "@/components/ui-kit";
import { FileText, Sparkles, Download, Plus, Wand2 } from "lucide-react";

export const Route = createFileRoute("/resume")({
  head: () => ({ meta: [{ title: "Resume Builder · JobConnect" }] }),
  component: ResumeBuilder,
});

const TEMPLATES = [
  { id: "modern", name: "Modern", desc: "Clean two-column. ATS-friendly." },
  { id: "minimal", name: "Minimal", desc: "Single column. Maximum readability." },
  { id: "creative", name: "Creative", desc: "For design & product roles." },
  { id: "classic", name: "Classic", desc: "Traditional. Conservative industries." },
];

function ResumeBuilder() {
  const [tpl, setTpl] = useState("modern");
  const [name, setName] = useState("Aarav Gupta");
  const [headline, setHeadline] = useState("Frontend Engineer · React, TypeScript");
  const [summary, setSummary] = useState("CS student at IIT-B passionate about building delightful web experiences. Open-source contributor with 3 production internships.");

  return (
    <AppLayout>
      <PageHeader
        title="Resume Builder"
        subtitle="AI-assisted templates that pass ATS and impress humans."
        action={<GradientButton><Download className="h-4 w-4" /> Download PDF</GradientButton>}
      />

      <div className="grid lg:grid-cols-[360px_1fr] gap-5">
        <div className="space-y-5">
          <Card>
            <h3 className="font-bold mb-3">Choose a template</h3>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTpl(t.id)}
                  className={`text-left p-3 rounded-xl border transition ${
                    tpl === t.id ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:bg-muted/40"
                  }`}
                >
                  <div className="h-16 mb-2 rounded-md bg-linear-to-br from-muted to-muted-foreground/10" />
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.desc}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-3">Your details</h3>
            <div className="space-y-3">
              <Field label="Full name" value={name} onChange={setName} />
              <Field label="Headline" value={headline} onChange={setHeadline} />
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Summary</label>
                <textarea
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  className="mt-1.5 w-full px-3 py-2 h-24 rounded-lg bg-background border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="mt-2 text-xs flex items-center gap-1 text-primary font-medium hover:underline">
                  <Wand2 className="h-3 w-3" /> Rewrite with AI
                </button>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> AI Suggestions</h3>
            <ul className="space-y-2 text-xs">
              <li className="glass rounded-lg p-2.5">Add a "Projects" section — your peers with 3+ projects get 2x more interviews.</li>
              <li className="glass rounded-lg p-2.5">Quantify the impact of your Razorpay internship. Use a number.</li>
              <li className="glass rounded-lg p-2.5">Move "Skills" above "Education" — recruiters scan top 1/3 first.</li>
            </ul>
          </Card>
        </div>

        <Card className="bg-white text-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 min-h-800px shadow-soft">
          <div className="border-b-2 border-zinc-900 pb-4">
            <h1 className="text-3xl font-bold font-display">{name}</h1>
            <p className="text-zinc-600 mt-1">{headline}</p>
            <p className="text-xs text-zinc-500 mt-2">aarav@example.com · +91 98765 43210 · linkedin.com/in/aarav · github.com/aarav</p>
          </div>
          <Section title="Summary"><p>{summary}</p></Section>
          <Section title="Experience">
            <Item company="Razorpay" role="Frontend Engineering Intern" date="Jun 2025 – Aug 2025">
              <li>Shipped checkout redesign A/B test, lifting conversion by 7.4% across 2M monthly users.</li>
              <li>Reduced bundle size by 32% via route-based code splitting and asset audit.</li>
            </Item>
            <Item company="Buildspace" role="Open-source Contributor" date="2024 – Present">
              <li>5 PRs merged into a React UI library used by 8K+ developers.</li>
            </Item>
          </Section>
          <Section title="Projects">
            <Item company="StudyBuddy" role="Founder · 4K MAU" date="2025">
              <li>Built React Native study-group app with Supabase backend. Featured on Product Hunt.</li>
            </Item>
          </Section>
          <Section title="Skills">
            <p>React · TypeScript · Next.js · Tailwind · Node.js · PostgreSQL · Figma · Git</p>
          </Section>
          <Section title="Education">
            <Item company="IIT Bombay" role="B.Tech Computer Science · GPA 8.9" date="2023 – 2027" />
          </Section>
          <button className="mt-4 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900">
            <Plus className="h-3 w-3" /> Add section
          </button>
        </Card>
      </div>
    </AppLayout>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} className="mt-1.5 w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-700 mb-2">{title}</h2>
      <div className="text-sm space-y-3">{children}</div>
    </div>
  );
}

function Item({ company, role, date, children }: { company: string; role: string; date: string; children?: React.ReactNode }) {
  return (
    <div>
      <div className="flex justify-between gap-3">
        <div>
          <div className="font-semibold">{company}</div>
          <div className="text-xs text-zinc-600">{role}</div>
        </div>
        <div className="text-xs text-zinc-500 shrink-0">{date}</div>
      </div>
      {children && <ul className="list-disc pl-5 mt-1 text-xs space-y-0.5 text-zinc-700">{children}</ul>}
    </div>
  );
}
