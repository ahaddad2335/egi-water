import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { SectionHeading } from "@/components/marketing/section-heading";
import { DetailList } from "@/components/marketing/detail-list";
import { FeatureList } from "@/components/marketing/feature-list";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Funding Resources | EGI",
  description:
    "Domestic and international funding sources for non-revenue water reduction, SCADA modernization, and water infrastructure resilience — with guidance on which programs may fit your project.",
};

const usSources = [
  {
    title: "EPA Drinking Water & Clean Water State Revolving Funds (SRF)",
    description:
      "low-interest loans administered at the state level for municipal water and wastewater infrastructure, including non-revenue water and modernization projects",
  },
  {
    title: "WIFIA (Water Infrastructure Finance and Innovation Act)",
    description:
      "federal credit assistance for large-scale water infrastructure projects, typically $20 million and above",
  },
  {
    title: "USDA Rural Development",
    description:
      "water and wastewater infrastructure loans and grants for rural communities",
  },
  {
    title: "Bipartisan Infrastructure Law (BIL)",
    description:
      "expanded federal funding for lead service line replacement, non-revenue water reduction, resilience, and modernization, largely distributed through existing state revolving fund programs",
  },
];

const globalSources = [
  {
    title: "World Bank",
    description:
      "for water supply, wastewater, resilience, utility reform, and climate adaptation projects",
  },
  {
    title: "International Finance Corporation (IFC)",
    description: "for private-sector and public-private water infrastructure",
  },
  {
    title: "Asian Development Bank (ADB)",
    description:
      "for water, sanitation, leakage reduction, reuse, and climate resilience",
  },
  {
    title: "African Development Bank (AfDB)",
    description: "for drinking water, sanitation, and utility capacity building",
  },
  {
    title: "Inter-American Development Bank (IDB)",
    description:
      "for water, wastewater, non-revenue water reduction, and modernization",
  },
  {
    title: "European Investment Bank (EIB)",
    description: "for large-scale municipal and regional water infrastructure",
  },
  {
    title: "Green Climate Fund (GCF)",
    description:
      "for climate-resilient water, drought adaptation, and system strengthening",
  },
  {
    title: "United Nations development and water programs",
    description:
      "supporting planning, resilience, and capacity building in developing markets",
  },
];

const programPriorities = [
  "Climate resilience",
  "Utility reform",
  "Service expansion",
  "Poverty reduction",
  "Water security",
  "Sanitation access",
  "Loss reduction and efficiency",
];

const egiFit = [
  { label: "Non-revenue water reduction", href: "/services/non-revenue-water" },
  { label: "SCADA modernization", href: "/services/scada-ai-monitoring" },
  { label: "Utility cybersecurity", href: "/services/cybersecurity-governance" },
  { label: "Predictive maintenance", href: "/services/scada-ai-monitoring" },
  {
    label: "Operational efficiency",
    href: "/services/treatment-desalination-efficiency",
  },
  { label: "Resilience and reliability", href: "/services/cybersecurity-governance" },
];

export default function FundingPage() {
  return (
    <>
      <PageHero
        eyebrow="Funding"
        title="Funding for Water Infrastructure Modernization"
        description="Non-revenue water reduction, SCADA modernization, and resilience investments increasingly qualify for outside funding — both domestic and international. We'll help point you toward which programs may fit your project."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              title="For U.S. Utilities"
              description="Domestic programs administered federally or through state agencies."
            />
            <DetailList items={usSources} />
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              title="For International & Developing-Market Utilities"
              description="Multilateral and development-finance programs — available to eligible borrowing member countries, not U.S. domestic utilities."
            />
            <DetailList items={globalSources} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="How funding programs differ"
            description="Global and domestic programs are typically tied to different priorities:"
          />
          <FeatureList items={programPriorities} className="mt-8 max-w-2xl" />
          <Reveal delay={0.1} className="mt-8 max-w-2xl">
            <p className="text-base leading-relaxed text-slate-600">
              That means the application narrative usually needs to go beyond
              engineering scope — showing social impact, climate benefit, and
              institutional capacity, not just the technical plan.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Where EGI fits"
            description="The strongest funding narratives are built on measurable infrastructure improvements — exactly what these service lines produce:"
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {egiFit.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.05}>
                <li>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-brand-950 transition-colors hover:border-accent-400 hover:text-accent-600"
                  >
                    {item.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3} className="mt-8 max-w-2xl">
            <p className="text-base leading-relaxed text-slate-600">
              If you&apos;re pursuing funding for a water modernization
              project, ask us which programs may fit — we&apos;re glad to
              point you in the right direction.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Not sure which funding programs apply to your project? Ask us."
        actions={<Button href="/contact">Discuss Funding Options</Button>}
      />
    </>
  );
}
