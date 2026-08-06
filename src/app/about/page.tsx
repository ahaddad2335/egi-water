import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About EGI | Water Services Built on Security, Governance and Value",
  description:
    "Learn how EGI helps municipal water utilities reduce loss, strengthen SCADA security and governance, and improve treatment and efficiency — staged for the best ROI.",
};

const pillars = [
  {
    title: "Utility Experience",
    body: "We understand the operational pressure, service expectations, and public accountability that define municipal water work.",
  },
  {
    title: "Security and Governance, Built In",
    body: "We build to IEC 62443 zone/conduit segmentation, NIST Cybersecurity Framework categories, and AWIA risk and resilience assessment requirements — not an internal checklist unique to us. What we build is auditable against a standard your board, insurer, or regulator already recognizes.",
  },
  {
    title: "ROI You Can Plan For",
    body: "Every stage delivers measurable ROI before the next begins — scoped and priced upfront, so each completed stage funds the case for what comes next, instead of asking for full-program budget approval up front.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About EGI"
        title="Built Inside Water Operations"
        description="EGI's roots go back to 2008, when our founder started the firm in Hammond, Indiana as a technology consulting practice serving municipal clients. In 2021, the company was formally reincorporated under its current name, Ecomis Group Inc. (EGI) — Engineering Commercial &amp; Information Systems — reflecting a sharper focus on water utility technology, security, and governance."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
              EGI works from inside water utility operations, not from a
              generic technology practice repurposed for water. That shows up
              in how we scope engagements: every recommendation ties to a
              specific standard, protocol, or measured baseline — not a
              general best practice.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.07} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7">
                  <h2 className="text-lg font-semibold text-brand-950">
                    {pillar.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Let's discuss your utility's priorities and where EGI can create the most value first."
        actions={
          <Button href="/contact">Discuss Your Utility Priorities</Button>
        }
      />
    </>
  );
}
