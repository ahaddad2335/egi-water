"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "egi_session_id";
const TRACK_URL = "/api/track";

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    // sessionStorage unavailable (e.g. blocked) — fall back to a per-load id
    return crypto.randomUUID();
  }
}

function sendBeaconJson(data: unknown) {
  try {
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(TRACK_URL, blob);
    } else {
      fetch(TRACK_URL, {
        method: "POST",
        body: JSON.stringify(data),
        keepalive: true,
      });
    }
  } catch {
    // tracking must never break the site
  }
}

/** Invisible — renders nothing. Logs pageviews + time-on-page for internal analytics. */
export function VisitorTracker() {
  const pathname = usePathname();
  const currentRef = useRef<{ path: string; enteredAt: number } | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!sessionIdRef.current) sessionIdRef.current = getSessionId();
    const sessionId = sessionIdRef.current;

    if (currentRef.current) {
      const { path, enteredAt } = currentRef.current;
      sendBeaconJson({
        sessionId,
        path,
        event: "duration",
        durationMs: Date.now() - enteredAt,
      });
    }

    sendBeaconJson({
      sessionId,
      path: pathname,
      event: "pageview",
      referrer: document.referrer || undefined,
    });

    currentRef.current = { path: pathname, enteredAt: Date.now() };
  }, [pathname]);

  useEffect(() => {
    function flushOnExit() {
      if (!currentRef.current || !sessionIdRef.current) return;
      const { path, enteredAt } = currentRef.current;
      sendBeaconJson({
        sessionId: sessionIdRef.current,
        path,
        event: "duration",
        durationMs: Date.now() - enteredAt,
      });
    }
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") flushOnExit();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", flushOnExit);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", flushOnExit);
    };
  }, []);

  return null;
}
