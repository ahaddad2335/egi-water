import { cn } from "@/lib/utils";

export function Eyebrow({
  className,
  children,
  tone = "light",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
        tone === "light"
          ? "border-accent-400/40 bg-accent-400/10 text-accent-300"
          : "border-accent-600/30 bg-accent-500/10 text-accent-700",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "light" ? "bg-accent-300" : "bg-accent-600",
        )}
      />
      {children}
    </span>
  );
}
