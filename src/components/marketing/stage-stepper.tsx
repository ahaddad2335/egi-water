import { Reveal } from "@/components/motion/reveal";

export type Stage = {
  number: string;
  title: string;
  description: string;
};

export function StageStepper({ stages }: { stages: Stage[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stages.map((stage, i) => (
        <Reveal key={stage.title} delay={i * 0.06}>
          <li className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
            <span className="font-mono text-xs font-semibold text-accent-600">
              {stage.number}
            </span>
            <p className="mt-3 text-base font-semibold text-brand-950">
              {stage.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {stage.description}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
