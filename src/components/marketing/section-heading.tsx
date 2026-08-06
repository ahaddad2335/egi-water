import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-brand-950 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          {description}
        </p>
      )}
    </Reveal>
  );
}
