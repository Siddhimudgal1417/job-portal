import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, Brain, FileSearch, ClipboardList, MessageSquare, Activity, ArrowRight,
  CheckCircle2, TrendingUp, Target, Zap, Shield, Star, Quote, Users, Building2, X, Check
} from "lucide-react";
import { Logo, ThemeToggle } from "@/components/app-layout";
import { Card, Badge, ProgressBar, ScoreRing, GradientButton, Stat } from "@/components/ui-kit";
import { testimonials, careerScores } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JobConnect — Stop getting rejected. Start getting hired." },
      { name: "description", content: "AI Career Coach for students and freshers. Analyze rejections, fix your resume, ace interviews — and finally land the offer." },
      { property: "og:title", content: "JobConnect — Stop getting rejected." },
      { property: "og:description", content: "AI Career Coach for students and freshers." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Nav />
      <Hero />
      <LogosStrip />
      <Features />
      <ATSPreview />
      <DashboardPreview />
      <TrackerPreview />
      <InterviewPreview />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/dashboard">
            <GradientButton>
              Launch App <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-bg" />
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-blob" />
      <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-accent/25 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>AI Career Coach for Gen-Z</span>
            <span className="text-muted-foreground">· v2.0</span>
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Stop guessing why you're <span className="text-gradient">getting rejected</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            JobConnect is not another job board. It's your personal AI coach that analyzes every rejection,
            audits your resume against real ATS systems, and tells you exactly what to fix — before your next application.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/dashboard">
              <GradientButton className="px-6 py-3 text-base">
                Get my Career Score <ArrowRight className="h-4 w-4" />
              </GradientButton>
            </Link>
            <Link to="/ats">
              <GradientButton variant="outline" className="px-6 py-3 text-base">
                Try ATS Analyzer
              </GradientButton>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Free forever plan</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> No credit card</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> 50K+ students</div>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="absolute -inset-4 gradient-primary-bg opacity-30 blur-3xl rounded-3xl" />
          <Card className="relative glass-strong p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Your Career Health</div>
                <div className="text-2xl font-bold mt-1">Looking strong 💪</div>
              </div>
              <ScoreRing value={78} label="Overall" />
            </div>
            <div className="space-y-3">
              {[
                { label: "ATS Score", val: 78, color: "indigo" as const },
                { label: "Resume Quality", val: 84, color: "emerald" as const },
                { label: "Interview Readiness", val: 66, color: "warning" as const },
                { label: "Skill Match", val: 71, color: "indigo" as const },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium">{s.label}</span>
                    <span className="text-muted-foreground">{s.val}/100</span>
                  </div>
                  <ProgressBar value={s.val} color={s.color} />
                </div>
              ))}
            </div>
            <div className="mt-6 glass rounded-xl p-4 flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg gradient-accent-bg grid place-items-center shrink-0">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div className="text-xs">
                <div className="font-semibold mb-0.5">AI Insight</div>
                <div className="text-muted-foreground leading-relaxed">
                  You're getting filtered at the resume stage. Add 3 missing keywords: <b>TypeScript, GraphQL, Jest</b>.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function LogosStrip() {
  const logos = ["Stripe", "Razorpay", "Linear", "Postman", "Cred", "Zerodha", "Sarvam AI", "Freshworks"];
  return (
    <section className="py-12 border-y border-border bg-muted/30 animate-fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-8">
          Students from JobConnect landed roles at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 opacity-70">
          {logos.map(l => (
            <span key={l} className="text-lg sm:text-xl font-display font-bold tracking-tight">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: FileSearch, title: "ATS Resume Analyzer", desc: "See exactly how recruiter systems read your resume. Get a real match score against any JD.", color: "indigo" },
  { icon: Brain, title: "Career Failure Analyzer", desc: "Our flagship. Analyzes every rejection to find the pattern — missing skills, weak experience, wrong roles.", color: "emerald" },
  { icon: Activity, title: "Career Health Dashboard", desc: "Six scores that show your real hireability — updated as you apply, learn, and interview.", color: "indigo" },
  { icon: ClipboardList, title: "Application Tracker", desc: "Kanban-style pipeline from Applied → Offer. Never lose track of where you stand.", color: "emerald" },
  { icon: MessageSquare, title: "AI Mock Interviews", desc: "Practice real questions with instant feedback on structure, content, and confidence.", color: "indigo" },
  { icon: Users, title: "Referral Marketplace", desc: "Get warm intros from employees at 500+ companies. Skip the resume black hole.", color: "emerald" },
];

function Features() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="indigo"><Zap className="h-3 w-3" /> Built for serious job seekers</Badge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to <span className="text-gradient-primary">get hired faster</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nine products that work together. One platform that actually moves the needle on your career.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} className="hover-lift">
                <div className={`h-11 w-11 rounded-xl grid place-items-center mb-4 ${f.color === "indigo" ? "gradient-primary-bg" : "gradient-emerald-bg"}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ATSPreview() {
  return (
    <section className="py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge variant="indigo">ATS Analyzer</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            See your resume through a recruiter's bot
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            75% of resumes never reach a human. Upload yours + paste a JD — we'll score the match,
            surface every missing keyword, and rewrite weak bullet points for you.
          </p>
          <ul className="mt-6 space-y-3">
            {["Real ATS parsing engine (not a regex)", "Keyword & skill gap analysis", "AI-rewritten bullet suggestions", "Format & readability scoring"].map(x => (
              <li key={x} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
        <Card className="glass-strong">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-sm text-muted-foreground">resume_v3_final.pdf</div>
              <div className="text-xs text-muted-foreground">vs. Frontend Engineer @ Stripe</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gradient">72%</div>
              <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Match</div>
            </div>
          </div>
          <ProgressBar value={72} color="indigo" />
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="glass rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-2 font-semibold uppercase">Missing Keywords</div>
              <div className="flex flex-wrap gap-1.5">
                {["TypeScript", "GraphQL", "Jest", "CI/CD"].map(k => <Badge key={k} variant="destructive">{k}</Badge>)}
              </div>
            </div>
            <div className="glass rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-2 font-semibold uppercase">Matched</div>
              <div className="flex flex-wrap gap-1.5">
                {["React", "JavaScript", "REST API", "Git"].map(k => <Badge key={k} variant="success">{k}</Badge>)}
              </div>
            </div>
          </div>
          <div className="mt-4 glass rounded-lg p-3 flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <div className="text-xs">
              <div className="font-semibold">Suggested rewrite</div>
              <div className="text-muted-foreground mt-1">
                "Built dashboard" → "Built React + TypeScript dashboard with Jest tests, reducing load time by 40%."
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="lg:order-2">
          <Badge variant="success">Career Health Dashboard</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Six scores. One clear picture.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Stop guessing if you're "ready". JobConnect scores your ATS strength, resume, interview readiness,
            application success rate, skill match, and career growth — in real time.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Stat label="Resume Quality" value="84" accent="emerald" hint="+12 this month" />
            <Stat label="Success Rate" value="23%" accent="indigo" hint="vs 8% peer avg" />
          </div>
        </div>
        <Card className="glass-strong lg:order-1">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { l: "ATS", v: careerScores.ats },
              { l: "Resume", v: careerScores.resume },
              { l: "Interview", v: careerScores.interview },
            ].map(s => (
              <div key={s.l} className="text-center">
                <ScoreRing value={s.v} size={90} />
                <div className="mt-2 text-xs font-semibold">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1.5"><span>Success Rate</span><span className="text-muted-foreground">23%</span></div>
              <ProgressBar value={23} color="warning" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5"><span>Skill Match</span><span className="text-muted-foreground">71%</span></div>
              <ProgressBar value={71} color="indigo" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5"><span>Career Growth</span><span className="text-muted-foreground">82%</span></div>
              <ProgressBar value={82} color="emerald" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function TrackerPreview() {
  const cols = [
    { name: "Applied", count: 8, items: ["Stripe", "Postman"], variant: "default" as const },
    { name: "Review", count: 5, items: ["Razorpay", "Cred"], variant: "indigo" as const },
    { name: "Interview", count: 3, items: ["Linear"], variant: "success" as const },
    { name: "Offer", count: 1, items: ["Postman"], variant: "success" as const },
  ];
  return (
    <section className="py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="indigo">Application Tracker</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Every application. One pipeline.
          </h2>
        </div>
        <Card className="glass-strong">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cols.map(c => (
              <div key={c.name} className="glass rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-semibold uppercase tracking-wider">{c.name}</div>
                  <Badge variant={c.variant}>{c.count}</Badge>
                </div>
                <div className="space-y-2">
                  {c.items.map(i => (
                    <div key={i} className="bg-card rounded-lg p-2.5 text-xs font-medium border border-border">{i}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function InterviewPreview() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Card className="glass-strong">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-xl gradient-accent-bg grid place-items-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold">Round 2 · Behavioral</div>
              <div className="text-xs text-muted-foreground">Question 3 of 5</div>
            </div>
          </div>
          <div className="glass rounded-xl p-4 mb-4">
            <div className="text-xs text-muted-foreground mb-1">Interviewer</div>
            <p className="text-sm">"Tell me about a time you had a major disagreement with a teammate. How did you handle it?"</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 text-sm">
            <div className="text-xs text-muted-foreground mb-1">Your answer</div>
            <p className="text-muted-foreground italic">[Speak or type your answer...]</p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <div className="glass rounded-lg p-2">
              <div className="text-lg font-bold text-accent">8.2</div>
              <div className="text-[10px] text-muted-foreground uppercase">Clarity</div>
            </div>
            <div className="glass rounded-lg p-2">
              <div className="text-lg font-bold text-primary">7.5</div>
              <div className="text-[10px] text-muted-foreground uppercase">Structure</div>
            </div>
            <div className="glass rounded-lg p-2">
              <div className="text-lg font-bold text-warning">6.8</div>
              <div className="text-[10px] text-muted-foreground uppercase">Confidence</div>
            </div>
          </div>
        </Card>
        <div>
          <Badge variant="success">Mock Interviews</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Practice until you can't get it wrong.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            AI-generated interview rounds tailored to your target role. Get scored on what
            actually matters — clarity, structure, confidence — with specific feedback.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { i: Target, t: "Role-specific question banks" },
              { i: TrendingUp, t: "Track readiness score over time" },
              { i: Shield, t: "Private. Your answers never leave your account." },
            ].map((x, k) => (
              <div key={k} className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-lg glass grid place-items-center"><x.i className="h-4 w-4 text-accent" /></div>
                <span>{x.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="success"><Star className="h-3 w-3" /> 4.9 / 5 from 12K students</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Real students. Real offers.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Card key={i} className="hover-lift">
              <Quote className="h-6 w-6 text-accent mb-3" />
              <p className="text-sm leading-relaxed">{t.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-accent-bg grid place-items-center text-white text-sm font-bold">{t.avatar}</div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  { name: "Student", price: "Free", desc: "Forever. Always.", features: ["ATS Analyzer (3/mo)", "Career Health Dashboard", "Application Tracker", "Basic Mock Interviews"], cta: "Start free", featured: false, missing: ["Failure Analyzer", "Unlimited interviews", "Referral marketplace"] },
  { name: "Pro", price: "₹499", per: "/mo", desc: "For serious job seekers.", features: ["Everything in Student", "Unlimited ATS scans", "Career Failure Analyzer", "Unlimited mock interviews", "Referral marketplace access", "Resume rewrites by AI"], cta: "Go Pro", featured: true, missing: [] },
  { name: "Employer", price: "₹4,999", per: "/mo", desc: "For startups & hiring teams.", features: ["Post unlimited jobs", "AI candidate ranking", "Hiring analytics", "Bulk resume parsing", "Priority support"], cta: "Hire smarter", featured: false, missing: [] },
];

function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="indigo">Pricing</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Pricing that scales with your career.
          </h2>
          <p className="mt-3 text-muted-foreground">No hidden fees. Cancel anytime. Free plan never expires.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PLANS.map(p => (
            <Card key={p.name} className={`relative ${p.featured ? "ring-2 ring-primary shadow-glow" : ""}`}>
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="indigo">Most Popular</Badge>
                </div>
              )}
              <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold font-display">{p.price}</span>
                {p.per && <span className="text-sm text-muted-foreground">{p.per}</span>}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map(f => (
                  <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />{f}</li>
                ))}
                {p.missing.map(f => (
                  <li key={f} className="flex gap-2 text-muted-foreground/60"><X className="h-4 w-4 shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
              <div className="mt-7">
                <GradientButton variant={p.featured ? "primary" : "outline"} className="w-full">{p.cta}</GradientButton>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden gradient-hero-bg p-10 sm:p-16 text-center">
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-mesh)" }} />
          <div className="relative">
            <Sparkles className="h-10 w-10 mx-auto text-white/80 mb-4" />
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
              Your next offer is one honest analysis away.
            </h2>
            <p className="mt-5 text-white/80 max-w-xl mx-auto">
              Join 50,000+ students who stopped applying blindly and started applying with intent.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link to="/dashboard">
                <GradientButton variant="accent" className="px-7 py-3 text-base">
                  Start free <ArrowRight className="h-4 w-4" />
                </GradientButton>
              </Link>
              <a href="#features">
                <button className="px-7 py-3 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition">
                  Explore features
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Logo size="sm" />
        <div className="text-xs text-muted-foreground">© 2026 JobConnect · Built for the next generation of job seekers.</div>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
