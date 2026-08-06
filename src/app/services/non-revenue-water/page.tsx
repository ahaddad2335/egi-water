import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { SectionHeading } from "@/components/marketing/section-heading";
import { DetailList } from "@/components/marketing/detail-list";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Non-Revenue Water Reduction | EGI",
  description:
    "EGI helps utilities reduce physical and commercial water losses through baseline assessment, AI-enabled monitoring, field action and training — for the best ROI.",
};

const howWeHelp = [
  {
    title: "Water balance built to IWA/AWWA methodology",
    description:
      "distinguishing real losses from apparent losses instead of a single blended loss percentage",
  },
  {
    title: "Minimum night flow analysis",
    description:
      "by district metered area, isolating background leakage from normal demand during the lowest-use overnight window",
  },
  {
    title: "Acoustic correlation and step-testing",
    description:
      "to narrow a flagged district metered area down to a specific pipe segment before a crew is dispatched",
  },
  {
    title: "Meter-accuracy testing and consumption-pattern analytics",
    description:
      "to flag drift, tampering, or unauthorized use that a manual billing review misses",
  },
  {
    title: "Field-team training",
    description:
      "on leak survey method and district metered area management, with standard operating procedures your team owns after we leave",
  },
  {
    title: "NRW dashboards",
    description: "tied to live SCADA and meter data, not a static quarterly report",
  },
];

export default function NonRevenueWaterPage() {
  return (
    <>
      <PageHero
        eyebrow="Non-Revenue Water Reduction"
        title="Turn Water Loss Into Measurable Performance"
        description="We identify NRW drivers, rank losses, and support sustained improvement with secure, 24/7 dynamic AI-enabled SCADA monitoring."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading title="NRW is more than leakage" />
              <Reveal delay={0.08} className="mt-5">
                <p className="text-base leading-relaxed text-slate-600">
                  We build a full IWA/AWWA-standard water balance,
                  reconciling system input volume against billed and
                  unbilled authorized consumption to separate real
                  (physical) losses — leakage in mains, service connections,
                  and storage — from apparent (commercial) losses caused by
                  meter inaccuracy, unauthorized use, or billing data
                  errors. A real program addresses both, which is why we
                  treat NRW and monitoring as a single engagement, not two
                  separate contracts.
                </p>
              </Reveal>
            </div>
            <div>
              <SectionHeading title="Why this matters to your budget" />
              <Reveal delay={0.1} className="mt-5">
                <p className="text-base leading-relaxed text-slate-600">
                  Every unit of water lost before it reaches a paying
                  customer is revenue your utility has already spent to
                  produce. Closing that gap is often the fastest,
                  lowest-cost way to improve your financial position —
                  before any new capital investment is even on the table.
                </p>
              </Reveal>
              <Reveal delay={0.14} className="mt-4">
                <p className="text-base leading-relaxed text-slate-600">
                  Recovering non-revenue water isn&apos;t just cost
                  avoidance — it&apos;s recovered system capacity. Every
                  gallon of recoverable loss reclaimed is treated capacity
                  your utility already paid to produce, available for
                  growth or new connections without new capital investment
                  in production capacity.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading title="How we help" />
            <DetailList items={howWeHelp} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Begin with an NRW Readiness and Baseline Discussion."
        actions={<Button href="/contact">Request an NRW Discussion</Button>}
      />
    </>
  );
}
