import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function FeatureList({
  items,
  className,
  tone = "light",
}: {
  items: string[];
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <ul className={cn("space-y-4", className)}>
      {items.map((item, i) => (
        <Reveal key={item} delay={i * 0.04}>
          <li className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                tone === "light"
                  ? "bg-accent-500/15 text-accent-600"
                  : "bg-accent-400/15 text-accent-300",
              )}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <span
              className={cn(
                "text-[15px] leading-relaxed",
                tone === "light" ? "text-slate-700" : "text-slate-300",
              )}
            >
              {item}
            </span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
