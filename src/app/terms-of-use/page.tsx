import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Terms of Use | EGI",
  description:
    "Review the terms that apply to use of the EGI website, including permitted use, intellectual property, disclaimers, and contact information.",
};

const sections = [
  {
    title: "Permitted Use",
    body: "The website may be used to learn about EGI, submit inquiries, and review published content.",
  },
  {
    title: "Intellectual Property",
    body: "Text, branding, graphics, and other site content belong to EGI unless otherwise noted and may not be reused without permission.",
  },
  {
    title: "Disclaimer and Limits",
    body: "Website content is provided for general information and may change without notice; EGI does not guarantee that all information is complete, current, or error-free.",
  },
  {
    title: "Advisory, Operational & Engineering Services Disclaimer",
    body: "EGI provides advisory, operational, and engineering services to water utility clients, including AI and cybersecurity services. Nothing on this website constitutes legal advice, regulatory advice, engineering certification, operational authorization, or a guarantee of security, compliance, performance, or uninterrupted service, and no engagement is authorized until a separate written agreement is signed. Municipal utilities should independently review all recommendations, validate all configurations and outputs in their own environment, and apply their own internal policies, procedures, and approval processes before implementation. To the fullest extent permitted by law, EGI disclaims liability for decisions made or actions taken based on website content, AI-generated outputs, or advisory materials.",
  },
];

export default function TermsOfUsePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="By using this website, you agree to use it only for lawful purposes and in a way that does not interfere with the site, its content, or its security. These Terms of Use apply to all visitors and users of the EGI website."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.05}>
                <h2 className="text-xl font-semibold text-brand-950">
                  {section.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {section.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-14 flex flex-wrap gap-3">
            <Button href="/contact">Contact Us</Button>
            <Button href="/" variant="outline-dark">
              Return to Home
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
