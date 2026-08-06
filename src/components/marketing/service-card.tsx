import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={href}
        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-500/10"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950 text-accent-400">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-brand-950">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}
