import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { SectionHeading } from "@/components/marketing/section-heading";
import { DetailList } from "@/components/marketing/detail-list";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Treatment, Desalination & Efficiency | EGI",
  description:
    "EGI improves treatment and filtration performance, evaluates desalination for water-scarce areas, and cuts energy costs — staged for the best ROI.",
};

const treatmentItems = [
  {
    title: "Source-water and production-capacity assessment",
    description: "against measured demand, not design-year assumptions",
  },
  {
    title: "Coagulant dosing and jar-testing review",
    description: "to cut chemical cost without compromising turbidity targets",
  },
  {
    title: "CT value verification for disinfection",
    description:
      "confirming contact time and residual meet regulatory requirements at actual operating flow, not design flow",
  },
  {
    title: "Pump, motor, and equipment performance",
    description: "measured against manufacturer curves, not run-to-failure",
  },
  {
    title: "Operator training",
    description:
      "tied to the specific process changes recommended, not generic certification prep",
  },
];

const desalItems = [
  {
    title: "SWRO feasibility assessment",
    description:
      "including energy-recovery-device sizing and brine disposal or dilution pathway",
  },
  {
    title: "Membrane and pretreatment selection",
    description:
      "matched to measured source-water chemistry and fouling potential, not a standard specification",
  },
  {
    title: "Integration plan",
    description:
      "into existing treatment, storage, and distribution assets, not a standalone system",
  },
];

const efficiencyItems = [
  {
    title: "Energy baseline",
    description: "built from actual meter and SCADA data, not a nameplate estimate",
  },
  {
    title: "Pump and motor efficiency",
    description:
      "tested against affinity laws, with variable-frequency-drive retrofit payback calculated per asset",
  },
  {
    title: "Solar, wind, or hybrid feasibility",
    description:
      "sized to your metered load profile and local resource data, not a generic feasibility template",
  },
  {
    title: "A phased efficiency roadmap",
    description: "with measurable kWh and cost milestones at each stage",
  },
];

export default function TreatmentDesalinationEfficiencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Treatment, Desalination & Efficiency"
        title="Reliable Water, Produced Efficiently — Wherever You're Starting From"
        description="From treatment performance to new supply to energy cost, we help you get more out of what you already have before recommending new investment — and every recommendation is staged to fit your budget."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              title="Treatment & Filtration"
              description="We measure before we recommend, so improvements target the actual constraint in your process, not a generic upgrade list."
            />
            <DetailList items={treatmentItems} />
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              title="Desalination"
              description="For service areas where conventional freshwater is limited by geography, drought, or saltwater intrusion, we evaluate desalination as part of a complete water-security strategy — alongside, never instead of, reducing losses in your existing network."
            />
            <DetailList items={desalItems} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              title="Energy Efficiency"
              description="Energy is one of the largest controllable costs in water operations. We cut avoidable use first, then apply renewable options where they genuinely fit your site."
            />
            <DetailList items={efficiencyItems} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Discuss a Treatment, Desalination or Efficiency Review."
        actions={<Button href="/contact">Request a Review</Button>}
      />
    </>
  );
}
