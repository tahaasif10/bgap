// Sends a form submission to the Google Apps Script web app.
// The URL and secret come from .env.local and are baked in at build time.
const URL = process.env.NEXT_PUBLIC_FORM_URL;
const SECRET = process.env.NEXT_PUBLIC_FORM_SECRET;

export async function submitForm(payload: Record<string, string>): Promise<{ ok: boolean; error?: string }> {
  if (!URL || !SECRET) return { ok: false, error: "not configured" };

  try {
    const res = await fetch(URL, {
      method: "POST",
      // text/plain avoids a CORS preflight, which Apps Script does not support
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, secret: SECRET }),
    });
    const json = await res.json();
    return { ok: json.ok === true, error: json.error };
  } catch {
    return { ok: false, error: "network" };
  }
}