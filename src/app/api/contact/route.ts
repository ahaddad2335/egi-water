import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/graph-mail";
import { extractClientIp, lookupCountry } from "@/lib/geo-ip";
import { CHALLENGE_LABELS, logContactSubmission } from "@/lib/contact-store";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  organization?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  challenge?: string;
  description?: string;
  turnstileToken?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Verify Turnstile token
  const turnstileToken = payload.turnstileToken;
  if (!turnstileToken) {
    return NextResponse.json(
      { ok: false, error: "Turnstile verification token is missing" },
      { status: 400 },
    );
  }

  const isValidToken = await verifyTurnstileToken(turnstileToken);
  if (!isValidToken) {
    return NextResponse.json(
      { ok: false, error: "Verification failed. Please try again." },
      { status: 400 },
    );
  }

  const required: (keyof ContactPayload)[] = [
    "name",
    "organization",
    "jobTitle",
    "email",
    "challenge",
    "description",
  ];
  const missing = required.filter((field) => !payload[field]?.trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const alertTo = process.env.ALERT_TO_EMAIL;
  const ip = extractClientIp(request.headers);
  const country = await lookupCountry(ip);
  const challengeLabel = CHALLENGE_LABELS[payload.challenge!] ?? payload.challenge;

  const submissionBase = {
    ts: Date.now(),
    name: payload.name!,
    organization: payload.organization!,
    jobTitle: payload.jobTitle!,
    email: payload.email!,
    phone: payload.phone?.trim() || "",
    challenge: payload.challenge!,
    description: payload.description!,
    ip,
    country,
  };

  if (!alertTo) {
    console.error("ALERT_TO_EMAIL is not configured; cannot deliver contact lead.");
    await logContactSubmission({
      ...submissionBase,
      emailSent: false,
      emailError: "ALERT_TO_EMAIL is not configured.",
    });
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured yet." },
      { status: 500 },
    );
  }

  const rows: [string, string][] = [
    ["Name", payload.name!],
    ["Organization", payload.organization!],
    ["Job title", payload.jobTitle!],
    ["Email", payload.email!],
    ["Phone", payload.phone?.trim() || "—"],
    ["Primary challenge", challengeLabel!],
    ["Submitted from", `${ip} (${country})`],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #0b1220;">
      <h2 style="color:#0d9488;">New website inquiry — EGI</h2>
      <table style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:4px 12px 4px 0; font-weight:bold; vertical-align:top;">${escapeHtml(label)}</td>
            <td style="padding:4px 0;">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:16px; font-weight:bold;">Description</p>
      <p style="white-space:pre-wrap;">${escapeHtml(payload.description!)}</p>
    </div>
  `;

  try {
    await sendMail({
      to: alertTo,
      subject: `New website inquiry: ${challengeLabel}`,
      html,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to send contact lead email:", error);
    await logContactSubmission({ ...submissionBase, emailSent: false, emailError: message });
    return NextResponse.json(
      { ok: false, error: "Failed to send. Please try again shortly." },
      { status: 502 },
    );
  }

  await logContactSubmission({ ...submissionBase, emailSent: true });
  return NextResponse.json({ ok: true });
}