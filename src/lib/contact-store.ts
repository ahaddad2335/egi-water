import fs from "node:fs";
import path from "node:path";

export const CHALLENGE_LABELS: Record<string, string> = {
  "scada-ai-monitoring": "SCADA / AI Monitoring",
  "cybersecurity-governance": "Cybersecurity & Governance",
  "non-revenue-water": "Non-Revenue Water (NRW)",
  "treatment-desalination-efficiency": "Treatment, Desalination & Efficiency",
  other: "Other",
};

export type ContactSubmission = {
  ts: number;
  name: string;
  organization: string;
  jobTitle: string;
  email: string;
  phone: string;
  challenge: string;
  description: string;
  ip: string;
  country: string;
  emailSent: boolean;
  emailError?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const LOG_FILE = path.join(DATA_DIR, "contact-submissions.jsonl");

// On serverless hosts (e.g. Vercel) the filesystem is read-only outside of
// /tmp, and /tmp isn't shared or persistent across invocations. Every
// filesystem call here is wrapped so a write failure never crashes the
// request that triggered it — losing the safety-net log is far better than
// the visitor seeing a failure for an email that actually sent.
function ensureStoreExists(): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOG_FILE)) {
      fs.writeFileSync(LOG_FILE, "");
    }
    return true;
  } catch (error) {
    console.error("contact-store: filesystem unavailable, skipping.", error);
    return false;
  }
}

/** Safety net: always called regardless of whether the email actually sent,
 * so no inquiry is lost if Graph/email delivery hiccups. Never throws. */
export function logContactSubmission(submission: ContactSubmission): void {
  if (!ensureStoreExists()) return;
  try {
    fs.appendFileSync(LOG_FILE, JSON.stringify(submission) + "\n", "utf8");
  } catch (error) {
    console.error("contact-store: failed to log submission.", error);
  }
}

export function readContactSubmissions(sinceTs = 0): ContactSubmission[] {
  if (!ensureStoreExists()) return [];

  let raw: string;
  try {
    raw = fs.readFileSync(LOG_FILE, "utf8");
  } catch (error) {
    console.error("contact-store: failed to read submissions.", error);
    return [];
  }
  if (!raw.trim()) return [];

  const submissions: ContactSubmission[] = [];
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      const parsed = JSON.parse(line) as ContactSubmission;
      if (parsed.ts >= sinceTs) submissions.push(parsed);
    } catch {
      // skip malformed lines rather than fail the whole read
    }
  }
  return submissions;
}

export function pruneContactSubmissionsOlderThan(olderThanTs: number): void {
  if (!ensureStoreExists()) return;
  try {
    const kept = readContactSubmissions(olderThanTs);
    const body = kept.map((s) => JSON.stringify(s)).join("\n");
    fs.writeFileSync(LOG_FILE, body ? body + "\n" : "", "utf8");
  } catch (error) {
    console.error("contact-store: failed to prune old submissions.", error);
  }
}
