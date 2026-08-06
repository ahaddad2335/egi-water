/**
 * Minimal Microsoft Graph mail sender using the OAuth2 client-credentials flow.
 * No SDK dependency — two plain fetch calls (token, then sendMail).
 *
 * Required env vars:
 *   MS_TENANT_ID     - Azure AD directory (tenant) ID
 *   MS_CLIENT_ID     - App registration's Application (client) ID
 *   MS_CLIENT_SECRET - App registration's client secret value
 *   MS_SENDER_EMAIL  - Mailbox to send from (must exist in the tenant), e.g. egisupport@4ecomis.com
 */

type SendMailInput = {
  to: string;
  subject: string;
  html: string;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }

  const tenantId = requireEnv("MS_TENANT_ID");
  const clientId = requireEnv("MS_CLIENT_ID");
  const clientSecret = requireEnv("MS_CLIENT_SECRET");

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to get Graph access token (${res.status}): ${body}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return cachedToken.value;
}

export async function sendMail({ to, subject, html }: SendMailInput): Promise<void> {
  const sender = requireEnv("MS_SENDER_EMAIL");
  const token = await getAccessToken();

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: "HTML", content: html },
          toRecipients: [{ emailAddress: { address: to } }],
        },
        saveToSentItems: true,
      }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Graph sendMail failed (${res.status}): ${body}`);
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
