import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { PageHeader, Card, Badge, GradientButton } from "@/components/ui-kit";
import { referrals } from "@/lib/mock-data";
import { Send, CheckCircle2, Star } from "lucide-react";

export const Route = createFileRoute("/referrals")({
  head: () => ({ meta: [{ title: "Referral Marketplace · JobConnect" }] }),
  component: ReferralsPage,
});

function ReferralsPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Referral Marketplace"
        subtitle="Skip the resume black hole. Get warm intros from employees inside top companies."
        action={<GradientButton>Post a referral</GradientButton>}
      />

      <Card className="mb-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero-bg opacity-95" />
        <div className="relative grid sm:grid-cols-3 gap-6 text-white">
          {[
            { v: "3.4x", l: "Higher response rate" },
            { v: "12 days", l: "Avg time-to-interview" },
            { v: "500+", l: "Companies represented" },
          ].map(s => (
            <div key={s.l}>
              <div className="text-3xl font-display font-bold">{s.v}</div>
              <div className="text-sm opacity-80">{s.l}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {referrals.map(r => (
          <Card key={r.id} className="hover-lift">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl gradient-accent-bg grid place-items-center text-white font-bold text-lg shrink-0">{r.avatar}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold truncate">{r.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{r.role}</p>
                  </div>
                  <Badge variant="success"><CheckCircle2 className="h-3 w-3" /> Verified</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.skills.map(s => <Badge key={s} variant="indigo">{s}</Badge>)}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground flex items-center gap-4">
                    <span><b className="text-foreground">{r.openings}</b> openings</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning fill-warning" /> {r.response} response</span>
                  </div>
                  <GradientButton className="px-3 py-1.5 text-xs"><Send className="h-3 w-3" /> Request</GradientButton>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
