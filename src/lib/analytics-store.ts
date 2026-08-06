import { getRedis } from "@/lib/redis";

export type VisitEvent = {
  ts: number; // epoch ms
  sessionId: string;
  ip: string;
  country: string;
  path: string;
  event: "pageview" | "duration";
  durationMs?: number;
  referrer?: string;
  userAgent?: string;
};

const KEY = "egi:visits";

function toEvent(raw: unknown): VisitEvent | null {
  try {
    // @upstash/redis auto-parses JSON-looking strings, so a stored value may
    // come back as an object already or as the original string.
    const value = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (value && typeof value === "object" && "ts" in value) {
      return value as VisitEvent;
    }
    return null;
  } catch {
    return null;
  }
}

export async function appendVisitEvent(event: VisitEvent): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.zadd(KEY, { score: event.ts, member: JSON.stringify(event) });
  } catch (error) {
    console.error("analytics-store: failed to append visit event.", error);
  }
}

export async function readVisitEvents(sinceTs = 0): Promise<VisitEvent[]> {
  const redis = getRedis();
  if (!redis) return [];
  try {
    const raw = await redis.zrange(KEY, sinceTs, "+inf", { byScore: true });
    return raw.map(toEvent).filter((e): e is VisitEvent => e !== null);
  } catch (error) {
    console.error("analytics-store: failed to read visit events.", error);
    return [];
  }
}

/** Keep only events newer than `olderThanTs`, dropping everything before it. */
export async function pruneEventsOlderThan(olderThanTs: number): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.zremrangebyscore(KEY, 0, olderThanTs);
  } catch (error) {
    console.error("analytics-store: failed to prune old events.", error);
  }
}

export type SessionSummary = {
  sessionId: string;
  ip: string;
  country: string;
  firstSeen: number;
  pages: { path: string; durationMs: number | null }[];
  totalDurationMs: number;
};

export function summarizeSessions(events: VisitEvent[]): SessionSummary[] {
  const bySession = new Map<string, VisitEvent[]>();
  for (const event of events) {
    const list = bySession.get(event.sessionId) ?? [];
    list.push(event);
    bySession.set(event.sessionId, list);
  }

  const summaries: SessionSummary[] = [];
  for (const [sessionId, sessionEvents] of bySession) {
    sessionEvents.sort((a, b) => a.ts - b.ts);
    const first = sessionEvents[0];

    const pages: { path: string; durationMs: number | null }[] = [];
    let totalDurationMs = 0;
    for (const event of sessionEvents) {
      if (event.event === "pageview") {
        pages.push({ path: event.path, durationMs: null });
      } else if (event.event === "duration") {
        const entry = [...pages]
          .reverse()
          .find((p) => p.path === event.path && p.durationMs === null);
        if (entry) entry.durationMs = event.durationMs ?? 0;
        totalDurationMs += event.durationMs ?? 0;
      }
    }

    summaries.push({
      sessionId,
      ip: first.ip,
      country: first.country,
      firstSeen: first.ts,
      pages,
      totalDurationMs,
    });
  }

  return summaries.sort((a, b) => a.firstSeen - b.firstSeen);
}
