/**
 * Best-effort IP -> country lookup using ip-api.com's free endpoint (no API
 * key, ~45 req/min limit). Results are cached in-memory for the life of the
 * server process so repeat visits from the same IP don't re-query.
 */

const cache = new Map<string, string>();

const PRIVATE_IP_PATTERNS = [
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^::1$/,
  /^fc00:/i,
  /^fe80:/i,
];

export function extractClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const trueClientIp = headers.get("true-client-ip");
  if (trueClientIp) return trueClientIp.trim();
  return "unknown";
}

function isPrivateOrUnknown(ip: string): boolean {
  if (ip === "unknown") return true;
  return PRIVATE_IP_PATTERNS.some((pattern) => pattern.test(ip));
}

export async function lookupCountry(ip: string): Promise<string> {
  if (isPrivateOrUnknown(ip)) return "Local/Unknown";

  const cached = cache.get(ip);
  if (cached) return cached;

  try {
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode`,
      { signal: AbortSignal.timeout(3000) },
    );
    if (!res.ok) return "Unknown";
    const data = (await res.json()) as {
      status: string;
      country?: string;
      countryCode?: string;
    };
    const country =
      data.status === "success" && data.country ? data.country : "Unknown";
    cache.set(ip, country);
    return country;
  } catch {
    return "Unknown";
  }
}
