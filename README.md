# EGI Water — Website

Next.js (App Router) site for EGI / Ecomis Group Inc.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in the real values (never
commit `.env.local` — it's gitignored). See that file for what each variable
does. Short version:

- `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET` — from an Azure AD App
  Registration with **Mail.Send** application permission (admin consent
  granted). Steps:
  1. [portal.azure.com](https://portal.azure.com) → **Azure Active
     Directory** → **App registrations** → **New registration**.
  2. Copy the **Application (client) ID** and **Directory (tenant) ID** from
     the app's overview page.
  3. **Certificates & secrets** → **New client secret** → copy the secret
     **value** immediately (it's hidden after you leave the page).
  4. **API permissions** → **Add a permission** → **Microsoft Graph** →
     **Application permissions** → add **Mail.Send**.
  5. Click **Grant admin consent** (requires a Microsoft 365 admin).
- `MS_SENDER_EMAIL` — the mailbox emails are sent from (`egisupport@4ecomis.com`).
- `ALERT_TO_EMAIL` — where contact-form leads and the daily digest are sent.
- `CRON_SECRET` — random string that authorizes the daily digest endpoint.
- `REPORT_TIMEZONE` — timezone used for timestamps in the digest email.

## What's built in

- **Visitor analytics** (`src/components/analytics/visitor-tracker.tsx` +
  `/api/track`): invisible, no UI. Logs pageviews and time-on-page per
  session, plus IP address and country, to `data/visits.jsonl` on the
  server. Not visible to site visitors.
- **Contact form** (`/api/contact`): sends an email instantly to
  `ALERT_TO_EMAIL` whenever someone submits the form.
- **Daily traffic digest** (`/api/cron/daily-digest`): summarizes the last
  24 hours (sessions, pageviews, top pages, per-session IP/country/pages/
  duration) into one email, sent once a day. Requires an external scheduler
  to actually call it once every 24 hours — see below.

## Deploying on Hostinger

1. **Confirm your plan supports Node.js.** VPS plans always do. Business/
   Cloud shared plans may have a **Node.js app** feature under hPanel →
   Advanced — check there first. Plain shared hosting (no Node.js option)
   cannot run this site's backend (tracking, contact form, digest) at all;
   it would need to be exported as static HTML and lose those features.
2. **Deploy the code** — either `git clone` + `npm install` + `npm run
   build` + `npm start` on a VPS (behind Nginx/PM2), or via hPanel's Node.js
   app + Git deploy feature on a Business/Cloud plan.
3. **Set the environment variables** from `.env.local.example` in whatever
   env-var UI your Hostinger plan provides (hPanel's Node.js app settings,
   or a `.env.local` file alongside the app on a VPS).
4. **Schedule the daily digest.** In hPanel → Advanced → **Cron Jobs**, add
   a daily job that hits:
   ```
   curl "https://yourdomain.com/api/cron/daily-digest?token=YOUR_CRON_SECRET"
   ```
   Pick whatever time of day you want the digest to land (e.g. 7:00 AM).
5. **Make sure `data/` persists** across deploys/restarts (it's a plain
   folder on disk — fine on a VPS or persistent Node app; if your plan ever
   moves to a serverless/ephemeral runtime, this would need to move to a
   real database instead).
