import { NextRequest, NextResponse } from "next/server";
import { appendVisitEvent } from "@/lib/analytics-store";
import { extractClientIp, lookupCountry } from "@/lib/geo-ip";

export const runtime = "nodejs";

type TrackPayload = {
  sessionId: string;
  path: string;
  event: "pageview" | "duration";
  durationMs?: number;
  referrer?: string;
};

export async function POST(request: NextRequest) {
  let payload: TrackPayload;
  try {
    // navigator.sendBeacon sends a Blob with an unset/text content-type,
    // so we parse the raw body as JSON rather than relying on request.json().
    const raw = await request.text();
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (
    !payload ||
    typeof payload.sessionId !== "string" ||
    typeof payload.path !== "string" ||
    (payload.event !== "pageview" && payload.event !== "duration")
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ip = extractClientIp(request.headers);
  const country = await lookupCountry(ip);

  appendVisitEvent({
    ts: Date.now(),
    sessionId: payload.sessionId,
    ip,
    country,
    path: payload.path,
    event: payload.event,
    durationMs: payload.durationMs,
    referrer: payload.referrer,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  return NextResponse.json({ ok: true });
}
