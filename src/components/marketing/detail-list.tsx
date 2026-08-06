import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type DetailItem = {
  title: string;
  description: string;
};

export function DetailList({
  items,
  className,
}: {
  items: DetailItem[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-5", className)}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.03}>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-600">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <p className="text-[15px] leading-relaxed text-slate-700">
              <span className="font-semibold text-brand-950">
                {item.title}
              </span>{" "}
              — {item.description}
            </p>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
