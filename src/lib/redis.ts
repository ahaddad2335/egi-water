import { Redis } from "@upstash/redis";

let client: Redis | null | undefined;

/** Returns the shared Upstash Redis client, or null if it isn't configured.
 * Callers should treat null as "storage unavailable" and degrade gracefully
 * rather than throwing — this must never be what breaks a request. */
export function getRedis(): Redis | null {
  if (client !== undefined) return client;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    console.error("redis: KV_REST_API_URL / KV_REST_API_TOKEN not configured.");
    client = null;
    return client;
  }

  client = new Redis({ url, token });
  return client;
}
