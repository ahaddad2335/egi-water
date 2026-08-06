import fs from "node:fs";
import path from "node:path";

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

const DATA_DIR = path.join(process.cwd(), "data");
const LOG_FILE = path.join(DATA_DIR, "visits.jsonl");

function ensureStoreExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, "");
  }
}

export function appendVisitEvent(event: VisitEvent): void {
  ensureStoreExists();
  fs.appendFileSync(LOG_FILE, JSON.stringify(event) + "\n", "utf8");
}

export function readVisitEvents(sinceTs = 0): VisitEvent[] {
  ensureStoreExists();
  const raw = fs.readFileSync(LOG_FILE, "utf8");
  if (!raw.trim()) return [];

  const events: VisitEvent[] = [];
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      const parsed = JSON.parse(line) as VisitEvent;
      if (parsed.ts >= sinceTs) events.push(parsed);
    } catch {
      // skip malformed lines rather than fail the whole read
    }
  }
  return events;
}

/** Keep only events newer than `olderThanTs`, dropping everything before it. */
export function pruneEventsOlderThan(olderThanTs: number): void {
  ensureStoreExists();
  const kept = readVisitEvents(olderThanTs);
  const body = kept.map((event) => JSON.stringify(event)).join("\n");
  fs.writeFileSync(LOG_FILE, body ? body + "\n" : "", "utf8");
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
