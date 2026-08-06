import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { FeatureList } from "@/components/marketing/feature-list";
import { CtaBand } from "@/components/marketing/cta-band";
import { NetworkField } from "@/components/three/network-field";

export const metadata: Metadata = {
  title: "EGI | Water Services, SCADA Monitoring & Technology Governance",
  description:
    "EGI delivers non-revenue water reduction, AI-enabled SCADA monitoring, cybersecurity and technology governance, and treatment/desalination/efficiency improvements — staged for the best ROI.",
};

const whatYouGet = [
  "A quantified water balance that separates real (physical) losses from apparent (commercial) losses, not an estimate",
  "Anomaly detection built on your own operating baseline, not fixed alarm thresholds",
  "OT network segmentation and MFA-gated remote access, aligned to IEC 62443",
  "Fractional CIO/CISO leadership billed through your operating budget, not a new hire",
  "Desalination, treatment, and energy-efficiency options assessed against your measured site conditions",
  "A five-stage implementation path — diagnose, prioritize, pilot, scale, sustain — so no stage outruns approved budget",
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-950">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <NetworkField className="absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-brand-950/70" />

        <Container className="relative py-24 sm:py-32">
          <Reveal>
            <Eyebrow>Water · Security · Governance · Value</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              EGI — Water Services Built Around Security, Governance and Value
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-xl font-medium text-accent-300">
              Find the loss. Secure the system. Sustain the result — for the
              best ROI.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
              We diagnose non-revenue water using IWA/AWWA water balance
              methodology, deploy AI-enabled SCADA monitoring that flags
              anomalies against your own trained operating baseline instead
              of fixed alarm thresholds, secure that monitoring under IEC
              62443-aligned network segmentation, and govern it going forward
              as your fractional CIO or CISO — staged to fit your budget.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact">Discuss Your Water Challenge</Button>
              <Button href="/water-services" variant="outline">
                Explore Our Services
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow tone="dark">For Boards &amp; Leadership</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-3xl text-balance text-2xl font-medium leading-relaxed text-brand-950 sm:text-3xl">
              EGI is here to help your leadership team close the gap between
              technical risk and regulatory accountability — engineering-led
              under IEC 62443 and NIST CSF, and built around the AWIA risk
              and resilience obligations your board is already required to
              meet.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
              Every recommendation ties to a named standard and a measured
              baseline, staged for the best ROI, proven stage by stage.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <Eyebrow tone="dark">Why now</Eyebrow>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
                Water loss and exposed SCADA systems are both quietly
                compounding costs.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-slate-600">
                Non-revenue water runs 25–30% at many utilities — every
                percentage point is treated water already paid for and never
                billed. SCADA systems reachable from the public internet have
                been directly targeted: attackers have altered control-system
                displays and disrupted operations at exposed utilities, and
                automated scanning tools now find open control-system ports
                in hours instead of days. Few utilities can absorb a
                full-time CIO or CISO to stay ahead of that. EGI runs loss
                reduction, monitoring, and governance as one accountable
                engagement, priced to your budget.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow tone="dark">What you get</Eyebrow>
          </Reveal>
          <FeatureList
            items={whatYouGet}
            className="mt-10 grid gap-x-12 gap-y-5 space-y-0 lg:grid-cols-2"
          />
        </Container>
      </section>

      <CtaBand
        title="EGI is ready to work hand in hand with your organization — and find the most efficient and cost-effective path there."
        actions={<Button href="/contact">Start a Conversation</Button>}
      />
    </>
  );
}
