import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { siteConfig, waterServicesSubNav } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-brand-950 text-slate-400">
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/egi-logo.png"
              alt="EGI logo"
              width={92}
              height={88}
              className="h-14 w-auto"
            />
            <div>
              <span className="block text-xl font-bold text-white sm:text-2xl">
                {siteConfig.fullName}
              </span>
              <span className="block text-xs font-medium tracking-wide text-accent-300">
                {siteConfig.fullNameExpansion}
              </span>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-white">
            {siteConfig.tagline}.
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            {siteConfig.locationBlurb}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Water Services
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {waterServicesSubNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Company
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/about" className="hover:text-accent-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/funding" className="hover:text-accent-300">
                Funding
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent-300">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-accent-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-use" className="hover:text-accent-300">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm font-semibold text-white">
            Talk to EGI about your water challenge
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            Loss, monitoring, governance, treatment, or cost — tell us where
            you&apos;re starting from.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex text-sm font-semibold text-accent-300 hover:text-accent-200"
          >
            Start the conversation →
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName} All rights
            reserved.
          </p>
          <p className="max-w-2xl leading-relaxed">{siteConfig.disclaimer}</p>
        </Container>
      </div>
    </footer>
  );
}
