import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact EGI | What We Can Do for Your Organization",
  description:
    "Contact EGI to discuss SCADA and AI-enabled monitoring, cybersecurity and technology governance, non-revenue water reduction, or treatment, desalination and efficiency.",
};

const quickLinks = [
  { label: "Discuss Your Water Challenge", challenge: "other" },
  {
    label: "Request an NRW Readiness Discussion",
    challenge: "non-revenue-water",
  },
  {
    label: "Discuss a Technology Governance Readiness Assessment",
    challenge: "cybersecurity-governance",
  },
  {
    label: "Request a Treatment, Desalination or Efficiency Review",
    challenge: "treatment-desalination-efficiency",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-950">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <Container className="relative py-20 sm:py-24">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-2xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Let&apos;s Talk About What EGI Can Do for Your Organization
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Whatever&apos;s driving the conversation — water loss, a
              monitoring blind spot, a governance gap, treatment
              performance, or energy cost — tell us where you&apos;re
              starting from. We&apos;ll review your inquiry and come back
              with a practical next step, staged for the best ROI that
              solves it.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <Button
                  key={link.label}
                  href={`/contact?challenge=${link.challenge}#form`}
                  variant="outline"
                  size="sm"
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <Suspense>
            <ContactForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
