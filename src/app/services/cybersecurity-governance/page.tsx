import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FeatureList } from "@/components/marketing/feature-list";
import { DetailList } from "@/components/marketing/detail-list";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Cybersecurity & Technology Governance for Water Utilities | EGI",
  description:
    "Fractional CIO and CISO leadership for water utilities that can't afford a full IT department — the lowest-cost way to close the governance gap behind recent SCADA attacks.",
};

const lowestCostPoints = [
  "No new headcount — we fill the leadership gap, not a staff seat",
  "An operating-budget engagement, not a capital project",
  "Built directly around the risk and resilience requirements you already have to meet",
  "A phased path toward an internal hire, whenever you're ready for one",
];

const included = [
  {
    title: "A technology governance framework",
    description:
      "mapped to NIST Cybersecurity Framework categories — Identify, Protect, Detect, Respond, Recover",
  },
  {
    title: "An AWIA-aligned risk and resilience assessment",
    description: "refreshed on your statutory five-year cycle",
  },
  {
    title: "An incident response plan",
    description:
      "built to the NIST SP 800-61 process, tested through tabletop exercises run against your actual network topology",
  },
  {
    title: "Patch management and vendor remote-access policy",
    description:
      "with MFA and session logging enforced at the jump host rather than left to individual endpoints",
  },
  {
    title: "A budget and staffing roadmap",
    description: "built to strengthen your existing team, not replace it",
  },
];

export default function CybersecurityGovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="Cybersecurity & Technology Governance"
        title="The Technology Leadership Utilities Can't Afford to Hire — and Can't Afford to Go Without"
        description="Most water utilities that get breached weren't unlucky — they were ungoverned. No one owned patch cycles, vendor access, incident response, or the basic discipline that keeps a SCADA network defensible. We step into that role directly, as your fractional CIO or CISO, at the best ROI of any way to close that gap."
        actions={
          <>
            <Button href="/contact">
              Discuss a Technology Governance Readiness Assessment
            </Button>
            <Button href="#how-fractional-works" variant="outline">
              How Fractional Leadership Works
            </Button>
          </>
        }
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading title="Why now" />
          <Reveal delay={0.08} className="mt-5 max-w-3xl">
            <p className="text-base leading-relaxed text-slate-600">
              Recent attacks on water utility SCADA systems trace back less
              to sophisticated adversaries than to basic governance failures
              — exposed control equipment, unmanaged remote access, no one
              accountable for closing the gap. Smaller utilities already
              know this. What they don&apos;t have is the budget for a
              full-time CIO, let alone a CISO, on top of an
              already-stretched team.
            </p>
          </Reveal>
        </Container>
      </section>

      <section
        id="how-fractional-works"
        className="scroll-mt-20 border-t border-slate-100 bg-slate-50 py-20 sm:py-24"
      >
        <Container>
          <SectionHeading title="Proven, not promised" />
          <Reveal delay={0.08} className="mt-5 max-w-3xl">
            <p className="text-base leading-relaxed text-slate-600">
              Our team has delivered embedded, fractional CIO leadership for
              a water utility for nearly eighteen years — zero cybersecurity
              incidents and zero unplanned downtime, the entire time, fully
              documented. That governance discipline shows up at every
              cybersecurity insurance policy renewal: premiums have gone
              down, coverage has gone up, and claims have stayed at zero,
              year over year.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              title="The lowest-cost path to real governance"
              description="A fractional CIO/CISO engagement runs through your operating budget, typically well below the fully loaded cost of one internal senior hire — and it doesn't compete with capital projects for approval. We build the roadmap to fit what your utility can actually spend."
            />
            <FeatureList items={lowestCostPoints} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading title="What's included" />
            <DetailList items={included} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Discuss a Technology Governance Readiness Assessment."
        actions={<Button href="/contact">Start the Conversation</Button>}
      />
    </>
  );
}
