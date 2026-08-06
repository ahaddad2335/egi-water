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

function ensureStoreExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, "");
  }
}

/** Safety net: always called regardless of whether the email actually sent,
 * so no inquiry is lost if Graph/email delivery hiccups. */
export function logContactSubmission(submission: ContactSubmission): void {
  ensureStoreExists();
  fs.appendFileSync(LOG_FILE, JSON.stringify(submission) + "\n", "utf8");
}

export function readContactSubmissions(sinceTs = 0): ContactSubmission[] {
  ensureStoreExists();
  const raw = fs.readFileSync(LOG_FILE, "utf8");
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
  ensureStoreExists();
  const kept = readContactSubmissions(olderThanTs);
  const body = kept.map((s) => JSON.stringify(s)).join("\n");
  fs.writeFileSync(LOG_FILE, body ? body + "\n" : "", "utf8");
}
