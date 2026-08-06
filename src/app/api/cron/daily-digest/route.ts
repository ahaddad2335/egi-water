import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/graph-mail";
import {
  pruneEventsOlderThan,
  readVisitEvents,
  summarizeSessions,
} from "@/lib/analytics-store";
import {
  CHALLENGE_LABELS,
  pruneContactSubmissionsOlderThan,
  readContactSubmissions,
} from "@/lib/contact-store";

export const runtime = "nodejs";

const DAY_MS = 24 * 60 * 60 * 1000;
const RETENTION_DAYS = 35;

function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

function formatTimestamp(ts: number): string {
  const timeZone = process.env.REPORT_TIMEZONE || "America/Chicago";
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(ts));
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const token = request.nextUrl.searchParams.get("token");
  // Vercel Cron automatically sends "Authorization: Bearer <CRON_SECRET>" when
  // a CRON_SECRET env var is set on the project — accept that as well as the
  // ?token= query param (used for manual testing or a non-Vercel scheduler).
  const authHeader = request.headers.get("authorization");
  const bearerOk = secret && authHeader === `Bearer ${secret}`;
  const tokenOk = secret && token === secret;
  if (!secret || (!bearerOk && !tokenOk)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const alertTo = process.env.ALERT_TO_EMAIL;
  if (!alertTo) {
    return NextResponse.json(
      { ok: false, error: "ALERT_TO_EMAIL is not configured." },
      { status: 500 },
    );
  }

  const since = Date.now() - DAY_MS;
  const events = readVisitEvents(since);
  const sessions = summarizeSessions(events);
  const contactSubmissions = readContactSubmissions(since);

  const totalPageviews = events.filter((e) => e.event === "pageview").length;

  const pageCounts = new Map<string, number>();
  for (const event of events) {
    if (event.event !== "pageview") continue;
    pageCounts.set(event.path, (pageCounts.get(event.path) ?? 0) + 1);
  }
  const topPages = [...pageCounts.entries()].sort((a, b) => b[1] - a[1]);

  const sessionRows = sessions
    .map((session) => {
      const pageList = session.pages
        .map((p) => {
          const duration =
            p.durationMs !== null ? formatDuration(p.durationMs) : "—";
          return `${escapeHtml(p.path)} <span style="color:#64748b;">(${duration})</span>`;
        })
        .join("<br/>");
      return `
        <tr>
          <td style="padding:8px 12px; border-bottom:1px solid #e2e8f0; vertical-align:top;">${formatTimestamp(session.firstSeen)}</td>
          <td style="padding:8px 12px; border-bottom:1px solid #e2e8f0; vertical-align:top;">${escapeHtml(session.country)}</td>
          <td style="padding:8px 12px; border-bottom:1px solid #e2e8f0; vertical-align:top;">${escapeHtml(session.ip)}</td>
          <td style="padding:8px 12px; border-bottom:1px solid #e2e8f0; vertical-align:top;">${pageList || "—"}</td>
          <td style="padding:8px 12px; border-bottom:1px solid #e2e8f0; vertical-align:top;">${formatDuration(session.totalDurationMs)}</td>
        </tr>`;
    })
    .join("");

  const failedLeads = contactSubmissions.filter((s) => !s.emailSent);

  const leadRows = contactSubmissions
    .map((s) => {
      const label = CHALLENGE_LABELS[s.challenge] ?? s.challenge;
      const statusHtml = s.emailSent
        ? `<span style="color:#0d9488;">Sent</span>`
        : `<span style="color:#dc2626; font-weight:bold;">Not sent — follow up manually</span>`;
      return `
        <tr>
          <td style="padding:8px 12px; border-bottom:1px solid #e2e8f0; vertical-align:top;">${formatTimestamp(s.ts)}</td>
          <td style="padding:8px 12px; border-bottom:1px solid #e2e8f0; vertical-align:top;">${escapeHtml(s.name)}<br/><span style="color:#64748b;">${escapeHtml(s.organization)}</span></td>
          <td style="padding:8px 12px; border-bottom:1px solid #e2e8f0; vertical-align:top;">${escapeHtml(s.email)}${s.phone ? "<br/>" + escapeHtml(s.phone) : ""}</td>
          <td style="padding:8px 12px; border-bottom:1px solid #e2e8f0; vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px; border-bottom:1px solid #e2e8f0; vertical-align:top;">${statusHtml}</td>
        </tr>`;
    })
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #0b1220;">
      <h2 style="color:#0d9488;">EGI Website — Daily Digest</h2>
      <p style="color:#475569;">Last 24 hours, ending ${formatTimestamp(Date.now())}.</p>

      ${
        failedLeads.length > 0
          ? `<div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:6px; padding:10px 14px; margin-bottom:16px; color:#991b1b;">
        <strong>${failedLeads.length} contact-form lead${failedLeads.length === 1 ? "" : "s"} failed to email</strong> — captured below, but weren't delivered instantly. Follow up manually.
      </div>`
          : ""
      }

      <h3>Contact form leads</h3>
      ${
        contactSubmissions.length > 0
          ? `<table style="border-collapse:collapse; width:100%; margin-bottom:24px;">
        <tr style="text-align:left; color:#64748b;">
          <th style="padding:8px 12px;">Submitted</th>
          <th style="padding:8px 12px;">Name / Org</th>
          <th style="padding:8px 12px;">Contact</th>
          <th style="padding:8px 12px;">Challenge</th>
          <th style="padding:8px 12px;">Email status</th>
        </tr>
        ${leadRows}
      </table>`
          : `<p style="color:#64748b; margin-bottom:24px;">No contact form submissions in the last 24 hours.</p>`
      }

      <h3>Traffic</h3>
      <table style="border-collapse:collapse; margin:16px 0;">
        <tr>
          <td style="padding-right:32px;">
            <strong style="font-size:20px;">${sessions.length}</strong><br/>
            <span style="color:#64748b;">Visitor sessions</span>
          </td>
          <td>
            <strong style="font-size:20px;">${totalPageviews}</strong><br/>
            <span style="color:#64748b;">Pageviews</span>
          </td>
        </tr>
      </table>

      ${
        topPages.length > 0
          ? `<h3 style="margin-top:24px;">Top pages</h3>
      <table style="border-collapse:collapse;">
        ${topPages
          .map(
            ([path, count]) => `
          <tr>
            <td style="padding:4px 12px 4px 0;">${escapeHtml(path)}</td>
            <td style="padding:4px 0; color:#64748b;">${count} view${count === 1 ? "" : "s"}</td>
          </tr>`,
          )
          .join("")}
      </table>`
          : ""
      }

      <h3 style="margin-top:24px;">Sessions</h3>
      ${
        sessions.length > 0
          ? `<table style="border-collapse:collapse; width:100%;">
        <tr style="text-align:left; color:#64748b;">
          <th style="padding:8px 12px;">First seen</th>
          <th style="padding:8px 12px;">Country</th>
          <th style="padding:8px 12px;">IP</th>
          <th style="padding:8px 12px;">Pages viewed</th>
          <th style="padding:8px 12px;">Total time</th>
        </tr>
        ${sessionRows}
      </table>`
          : `<p style="color:#64748b;">No visitor activity in the last 24 hours.</p>`
      }
    </div>
  `;

  try {
    await sendMail({
      to: alertTo,
      subject: `EGI Website Digest — ${sessions.length} session${sessions.length === 1 ? "" : "s"}, ${totalPageviews} pageview${totalPageviews === 1 ? "" : "s"}`,
      html,
    });
  } catch (error) {
    console.error("Failed to send daily digest email:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send digest email." },
      { status: 502 },
    );
  }

  pruneEventsOlderThan(Date.now() - RETENTION_DAYS * DAY_MS);
  pruneContactSubmissionsOlderThan(Date.now() - RETENTION_DAYS * DAY_MS);

  return NextResponse.json({
    ok: true,
    sessions: sessions.length,
    pageviews: totalPageviews,
    contactLeads: contactSubmissions.length,
  });
}
