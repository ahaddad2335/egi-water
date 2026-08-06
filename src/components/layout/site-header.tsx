"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { mainNav, waterServicesSubNav, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-950">
      <Container className="flex items-center justify-between py-2.5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/egi-logo.png"
            alt="EGI logo"
            width={92}
            height={88}
            priority
            className="h-12 w-auto sm:h-14"
          />
          <span className="hidden text-xl font-bold tracking-wide text-white sm:block sm:text-2xl">
            {siteConfig.fullName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            if (item.label === "Water Services") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-accent-300"
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-expanded={servicesOpen}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <div
                    className={cn(
                      "absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-150",
                      servicesOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0",
                    )}
                  >
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-brand-900 p-3 shadow-2xl shadow-black/40">
                      {waterServicesSubNav.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
                        >
                          <p className="text-sm font-semibold text-white">
                            {sub.label}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-400">
                            {sub.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-accent-300"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="sm">
            Start a Conversation
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-brand-950 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-1 border-t border-white/10 pt-2">
              {waterServicesSubNav.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className="block rounded-md px-3 py-2 text-[13px] text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  onClick={() => setMobileOpen(false)}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
            <Button href="/contact" className="mt-3 w-full">
              Start a Conversation
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
