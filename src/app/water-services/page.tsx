import type { Metadata } from "next";
import { ActivitySquare, ShieldCheck, Droplets, Waves } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { ServiceCard } from "@/components/marketing/service-card";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Water Services | EGI",
  description:
    "One-stop water services: SCADA and AI-enabled monitoring, cybersecurity and governance, NRW reduction, and treatment/desalination/efficiency — staged for the best ROI.",
};

const services = [
  {
    icon: ActivitySquare,
    title: "SCADA & AI-Enabled Monitoring",
    description:
      "Designs and builds SCADA systems engineered for security from the ground up, or layers AI-enabled monitoring onto what you already run — building a statistical operating baseline per pump, valve, and district metered area to flag real-time deviation.",
    href: "/services/scada-ai-monitoring",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity & Technology Governance",
    description:
      "Fractional CIO or CISO leadership built around IEC 62443 network segmentation, NIST Cybersecurity Framework governance categories, and AWIA-aligned risk and resilience assessment.",
    href: "/services/cybersecurity-governance",
  },
  {
    icon: Droplets,
    title: "Non-Revenue Water Reduction",
    description:
      "IWA/AWWA water balance methodology, minimum night flow analysis by district metered area, and acoustic leak correlation that narrows a loss to a pipe segment before a crew is dispatched.",
    href: "/services/non-revenue-water",
  },
  {
    icon: Waves,
    title: "Treatment, Desalination & Efficiency",
    description:
      "Process optimization measured against coagulant dosing and disinfection CT values, SWRO feasibility with energy-recovery-device sizing, and pump/motor efficiency reviewed against manufacturer curves.",
    href: "/services/treatment-desalination-efficiency",
  },
];

export default function WaterServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Water Services"
        title="One Partner, Every Stage of the Water Journey"
        description="We start with a measured problem — a water balance gap, an unsegmented SCADA network, an unowned compliance requirement, a treatment or energy cost — and bring the specific method that closes it, under one accountable team, staged for the best ROI that gets the job done."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service, i) => (
              <ServiceCard key={service.href} {...service} delay={i * 0.06} />
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-8 rounded-2xl border border-accent-400/30 bg-brand-950 p-8 sm:p-10">
              <p className="text-balance text-lg leading-relaxed text-slate-200">
                Every service is delivered on a{" "}
                <span className="font-semibold text-accent-300">
                  staged, lower-cost implementation path
                </span>{" "}
                — built around what your budget can support now, with a
                clear route to what comes next.
              </p>
              <Button href="/how-we-work" variant="outline" className="mt-6">
                See How We Work
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Not sure where to begin? We'll establish a measured baseline, rank interventions by cost-per-unit-loss-avoided or cost-per-risk-reduced, and build a phased roadmap."
        actions={
          <Button href="/contact">
            Request an Initial Water-System Discussion
          </Button>
        }
      />
    </>
  );
}
