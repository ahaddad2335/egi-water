import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-500 text-brand-950 hover:bg-accent-400 shadow-[0_0_0_1px_rgba(20,184,166,0.35)]",
        outline:
          "border border-white/25 text-white hover:border-accent-400 hover:text-accent-300",
        "outline-dark":
          "border border-slate-300 text-slate-900 hover:border-accent-600 hover:text-accent-600",
        ghost: "text-slate-700 hover:text-accent-600",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { className, variant, size, ...rest } = props;

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } =
      rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size }), className)}
        {...anchorProps}
      />
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...buttonProps}
    />
  );
}
