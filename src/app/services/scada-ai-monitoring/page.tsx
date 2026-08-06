import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { SectionHeading } from "@/components/marketing/section-heading";
import { DetailList } from "@/components/marketing/detail-list";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "SCADA & AI-Enabled Monitoring | EGI",
  description:
    "SCADA systems designed, built, and secured by a team with direct utility operations experience — plus AI-enabled monitoring, layered on new or existing systems, priced to fit your budget.",
};

const buildItems = [
  {
    title: "Redundant Architecture",
    description:
      "both software and hardware built with failover, so a single point of failure doesn't take down monitoring or control",
  },
  {
    title: "Industrial-Grade Historical Database",
    description:
      "full process history captured for trend analysis, regulatory reporting, and the anomaly-detection baseline the AI layer depends on",
  },
  {
    title: "Isolated, Segmented Network",
    description:
      "built to IEC 62443 zone/conduit design from day one, not retrofitted after an incident",
  },
  {
    title: "Expandable Control Architecture",
    description:
      "scoped to grow with the utility, adding sites, sensors, and process areas without a system replacement",
  },
  {
    title: "Multi-End Collaboration & Data Interoperability",
    description:
      "control room, field crews, and management reporting all draw from the same data, instead of separate disconnected systems",
  },
];

const aiItems = [
  {
    title: "Anomaly Detection",
    description:
      "a statistical baseline for flow, pressure, and power draw per pump, valve, and district metered area, built from historical SCADA time-series; flags real-time deviation using trained models, not fixed thresholds that miss slow drift or false-trigger on normal demand swings",
  },
  {
    title: "Predictive Maintenance",
    description:
      "tracks vibration, cycle count, and run-time signature against manufacturer failure curves to estimate remaining equipment life before breakdown, not after",
  },
  {
    title: "Demand & Production Forecasting",
    description:
      "models seasonal and diurnal demand against historical SCADA and weather data to size pump scheduling and treatment output in advance",
  },
  {
    title: "Water-Quality Exception Monitoring",
    description:
      "flags chlorine residual, turbidity, and pressure readings that fall outside control limits calculated from your own process history, not a generic benchmark",
  },
  {
    title: "Data Integration",
    description:
      "ingests via Modbus, DNP3, or OPC-UA, connecting to your existing SCADA, meters, and historians — or built in natively if we're delivering the system",
  },
  {
    title: "Reporting",
    description:
      "structured output mapped to the regulatory and board reporting formats you already use",
  },
];

export default function ScadaAiMonitoringPage() {
  return (
    <>
      <PageHero
        eyebrow="SCADA & AI-Enabled Monitoring"
        title="The Most Advanced Monitoring, Built by People Who Have Run It"
        description="We design, build, and secure SCADA systems — and layer AI-enabled monitoring on top of them — turning meters, sensors, pumps and field data into earlier warnings, clearer priorities and better operating decisions. Whether you need a new SCADA system built from the ground up or AI monitoring layered onto what you already run, cybersecurity is built in from day one, not added afterward."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading title="Why security comes before monitoring" />
          <Reveal delay={0.08} className="mt-5 max-w-3xl">
            <p className="text-base leading-relaxed text-slate-600">
              Exposed, poorly governed control systems are actively being
              targeted. Attackers have exploited internet-exposed control
              equipment to alter SCADA displays and cause real operational
              disruption. Others have used AI tools to autonomously scan for
              and attempt to breach a utility&apos;s SCADA gateway,
              compressing what used to take days of manual reconnaissance
              into hours. We build every deployment around this reality: a
              security assessment — network segmentation, remote-access
              controls, control-system hardening — comes before AI-driven
              insight goes on top.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              title="SCADA System Design & Build"
              description="For utilities that need a new or modernized SCADA system rather than a layer added to an old one, we design and build it — engineered from the ground up on the same principles we bring to every deployment."
            />
            <DetailList items={buildItems} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading title="What AI-enabled monitoring supports" />
            <DetailList items={aiItems} />
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading title="Security and control, by design" />
          <Reveal delay={0.08} className="mt-5 max-w-3xl">
            <p className="text-base leading-relaxed text-slate-600">
              Network segmentation follows IEC 62443 zone/conduit design.
              Every automated action requires a defined human approval step
              before execution, and every read, write, and override is
              logged to an audit trail. Where a utility already has SCADA in
              place, we connect to existing meters, sensors and
              infrastructure wherever possible instead of forcing a full
              replacement, which keeps cost as low as possible.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Discuss an Operational Data, AI and Cybersecurity Readiness Assessment."
        actions={<Button href="/contact">Start a Readiness Assessment</Button>}
      />
    </>
  );
}
