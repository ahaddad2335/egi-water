import { getRedis } from "@/lib/redis";

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

const KEY = "egi:contact-submissions";

function toSubmission(raw: unknown): ContactSubmission | null {
  try {
    const value = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (value && typeof value === "object" && "ts" in value) {
      return value as ContactSubmission;
    }
    return null;
  } catch {
    return null;
  }
}

/** Safety net: always called regardless of whether the email actually sent,
 * so no inquiry is lost if Graph/email delivery hiccups. Never throws. */
export async function logContactSubmission(submission: ContactSubmission): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.zadd(KEY, { score: submission.ts, member: JSON.stringify(submission) });
  } catch (error) {
    console.error("contact-store: failed to log submission.", error);
  }
}

export async function readContactSubmissions(sinceTs = 0): Promise<ContactSubmission[]> {
  const redis = getRedis();
  if (!redis) return [];
  try {
    const raw = await redis.zrange(KEY, sinceTs, "+inf", { byScore: true });
    return raw.map(toSubmission).filter((s): s is ContactSubmission => s !== null);
  } catch (error) {
    console.error("contact-store: failed to read submissions.", error);
    return [];
  }
}

export async function pruneContactSubmissionsOlderThan(olderThanTs: number): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.zremrangebyscore(KEY, 0, olderThanTs);
  } catch (error) {
    console.error("contact-store: failed to prune old submissions.", error);
  }
}
