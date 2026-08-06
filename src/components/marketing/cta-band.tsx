import { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function CtaBand({
  title,
  actions,
}: {
  title: string;
  actions: ReactNode;
}) {
  return (
    <section className="border-t border-slate-100 bg-slate-50">
      <Container className="py-16">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:p-10">
          <h2 className="max-w-xl text-balance text-2xl font-semibold tracking-tight text-brand-950 sm:text-3xl">
            {title}
          </h2>
          <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
        </Reveal>
      </Container>
    </section>
  );
}
