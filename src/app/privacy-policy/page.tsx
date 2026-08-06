import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Privacy Policy | EGI",
  description:
    "Learn how EGI collects, uses, and protects information shared through our website, forms, and contact methods.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We may collect information such as name, organization, email address, phone number, message content, and basic website usage information submitted through forms or cookies.",
  },
  {
    title: "Automatic Usage Data",
    body: "Like most websites, our server automatically logs basic technical data for every visit: the pages viewed, time spent on each page, referring page, approximate location derived from IP address (country-level only), and IP address itself. This data is used internally for traffic analysis and service improvement — it is not sold, shared with third parties for marketing, or linked to an individual's identity unless that person has also submitted a contact form.",
  },
  {
    title: "How We Use It",
    body: "We use this information to respond to inquiries, provide services, improve the website, monitor and analyze site traffic, and maintain secure and reliable operations.",
  },
  {
    title: "How We Protect It",
    body: "We use reasonable technical and administrative safeguards to help protect personal information and limit access to authorized personnel.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="EGI respects your privacy and is committed to protecting the information you share with us. This Privacy Policy explains how EGI collects, uses, stores, and protects information submitted through our website and contact forms."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.06}>
                <h2 className="text-xl font-semibold text-brand-950">
                  {section.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {section.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24} className="mt-14 flex flex-wrap gap-3">
            <Button href="/contact">Contact Us About Privacy</Button>
            <Button href="/" variant="outline-dark">
              Return to Home
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
