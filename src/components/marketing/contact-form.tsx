"use client";

import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHALLENGE_OPTIONS = [
  { value: "scada-ai-monitoring", label: "SCADA / AI Monitoring" },
  { value: "cybersecurity-governance", label: "Cybersecurity & Governance" },
  { value: "non-revenue-water", label: "Non-Revenue Water (NRW)" },
  {
    value: "treatment-desalination-efficiency",
    label: "Treatment, Desalination & Efficiency",
  },
  { value: "other", label: "Other" },
] as const;

const inputClasses =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-brand-950 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20";

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("challenge") ?? "";
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    // Get Turnstile token
    const token = turnstileRef.current?.getResponse();
    if (!token) {
      setStatus("error");
      setErrorMessage("Please complete the verification");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name")?.toString() ?? "",
      organization: data.get("organization")?.toString() ?? "",
      jobTitle: data.get("jobTitle")?.toString() ?? "",
      email: data.get("email")?.toString() ?? "",
      phone: data.get("phone")?.toString() ?? "",
      challenge: data.get("challenge")?.toString() ?? "",
      description: data.get("description")?.toString() ?? "",
      turnstileToken: token,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      turnstileRef.current?.reset();
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-accent-400/40 bg-accent-500/5 p-8">
        <CheckCircle2 className="h-8 w-8 text-accent-600" />
        <h3 className="text-lg font-semibold text-brand-950">
          Thanks — we&apos;ve got your message. A team member will be in touch.
        </h3>
        <p className="text-sm leading-relaxed text-slate-600">
          We&apos;ll review your inquiry and come back with a practical next
          step, staged for the best ROI that solves it.
        </p>
      </div>
    );
  }

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="scroll-mt-24 space-y-5 rounded-2xl border border-slate-200 bg-white p-7 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required>
          <input id="name" name="name" required className={inputClasses} />
        </Field>
        <Field label="Organization" htmlFor="organization" required>
          <input
            id="organization"
            name="organization"
            required
            className={inputClasses}
          />
        </Field>
        <Field label="Job title" htmlFor="jobTitle" required>
          <input
            id="jobTitle"
            name="jobTitle"
            required
            className={inputClasses}
          />
        </Field>
        <Field label="Email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClasses}
          />
        </Field>
        <Field label="Phone (optional)" htmlFor="phone">
          <input id="phone" name="phone" type="tel" className={inputClasses} />
        </Field>
        <Field label="Primary challenge" htmlFor="challenge" required>
          <select
            id="challenge"
            name="challenge"
            required
            defaultValue={preselected}
            className={cn(inputClasses, "appearance-none")}
          >
            <option value="" disabled>
              Select one
            </option>
            {CHALLENGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Brief description" htmlFor="description" required>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          className={cn(inputClasses, "resize-none")}
          placeholder="Tell us where you're starting from."
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-accent-600 focus:ring-accent-500"
        />
        <span>
          I agree to EGI&apos;s{" "}
          <a href="/privacy-policy" className="font-medium text-accent-600 hover:underline">
            Privacy Policy
          </a>{" "}
          and consent to being contacted about this inquiry.
        </span>
      </label>

      {/* Cloudflare Turnstile Widget */}
      <div className="flex justify-center">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
          onError={() => {
            setStatus("error");
            setErrorMessage("Verification failed. Please try again.");
          }}
        />
      </div>

      {status === "error" && errorMessage && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send Inquiry"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-brand-950">
        {label}
        {required && <span className="text-accent-600"> *</span>}
      </label>
      {children}
    </div>
  );
}