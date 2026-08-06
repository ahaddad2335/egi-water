import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { SectionHeading } from "@/components/marketing/section-heading";
import { StageStepper, type Stage } from "@/components/marketing/stage-stepper";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Lower-Cost, Staged Implementation | EGI",
  description:
    "EGI diagnoses, prioritizes, pilots, scales and sustains water, monitoring and governance improvements — staged to fit your budget, not the other way around.",
};

const stages: Stage[] = [
  {
    number: "01 — Diagnose",
    title: "Diagnose",
    description:
      "Water balance to IWA/AWWA methodology, SCADA/OT security assessment against IEC 62443 and NIST CSF, and workforce baseline, each benchmarked to a named standard, not an internal opinion.",
  },
  {
    number: "02 — Prioritize",
    title: "Prioritize",
    description:
      "Rank interventions by measured cost-per-unit-loss-avoided or cost-per-risk-reduced, then build a phased roadmap and business case.",
  },
  {
    number: "03 — Pilot",
    title: "Pilot",
    description:
      "Deploy in one district metered area, plant, or zone and measure the result against the diagnosed baseline before scaling spend.",
  },
  {
    number: "04 — Scale",
    title: "Scale",
    description:
      "Expand what the pilot proved, at a pace matched to your budget and capability.",
  },
  {
    number: "05 — Sustain",
    title: "Sustain",
    description:
      "Hand off standard operating procedures, train your team on the platform installed, and keep monitoring results in place after the engagement ends.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How We Work"
        title="A Practical, Staged Path to Every Improvement"
        description="We work alongside your team from first diagnosis to a self-sustaining result — one accountable partner across monitoring, governance, security, treatment and efficiency, staged so cost never outruns your budget."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading title="Why staged implementation costs less" />
          <Reveal delay={0.08} className="mt-5 max-w-3xl">
            <p className="text-base leading-relaxed text-slate-600">
              Every recommendation is sized to what you can act on now, not
              a single large capital ask. Starting with the highest-value,
              lowest-cost interventions — like closing NRW gaps or adding
              fractional governance — builds the case and the cash flow for
              what comes next, instead of asking you to fund everything at
              once.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading title="Five stages" className="mb-10" />
          <StageStepper stages={stages} />
        </Container>
      </section>

      <CtaBand
        title="Start With Your Most Important Water Challenge."
        actions={<Button href="/contact">Start the Conversation</Button>}
      />
    </>
  );
}
