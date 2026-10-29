/**
 * unibridgenl.com — the Worker in front of the public site.
 *
 * Pages, scripts and images are served by Cloudflare's static assets directly;
 * this code runs only for /api/*.
 *
 *   POST /api/automation   { type: "quiz" | "booking", ...fields, turnstile? }
 *
 * It forwards the booking and quiz forms to the Google Apps Script backend, but
 * only after:
 *   1. the request comes from our own pages (Origin check),
 *   2. the visitor and the site as a whole are under the rate limits,
 *   3. the body is small and valid JSON,
 *   4. the Cloudflare Turnstile check passes (once TURNSTILE_SECRET is set).
 *
 * The Apps Script token lives here as a secret (UB_TOKEN), so it can be removed
 * from the public JavaScript and rotated.
 *
 * SECRETS (Workers & Pages -> unibridgenl-site -> Settings -> Variables and Secrets)
 *   UB_ENDPOINT        the Apps Script /exec URL
 *   UB_TOKEN           the Apps Script SHARED_TOKEN
 *   TURNSTILE_SECRET   (optional until the Turnstile widget exists)
 */

const ALLOWED_ORIGINS = new Set([
  'https://unibridgenl.com',
  'https://www.unibridgenl.com',
]);
const MAX_BODY = 8 * 1024;

const SECURITY = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};
const reply = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...SECURITY } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/automation') return automation(request, env, url);
    if (url.pathname.startsWith('/api/')) return reply({ ok: false, error: 'not found' }, 404);
    return env.ASSETS.fetch(request);
  },
};

function originAllowed(request, url) {
  const origin = request.headers.get('Origin') || '';
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // The workers.dev preview address, so the setup can be tested before DNS moves.
  return origin === url.origin && url.hostname.endsWith('.workers.dev');
}

async function automation(request, env, url) {
  if (request.method !== 'POST') return reply({ ok: false, error: 'POST only' }, 405);
  if (!originAllowed(request, url)) return reply({ ok: false, error: 'forbidden' }, 403);

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const [mine, all] = await Promise.all([
    env.FORM_LIMIT.limit({ key: 'ip:' + ip }),
    env.FORM_LIMIT_ALL.limit({ key: 'all' }),
  ]);
  if (!mine.success || !all.success) return reply({ ok: false, error: 'slow down' }, 429);

  const len = Number(request.headers.get('Content-Length') || 0);
  if (len > MAX_BODY) return reply({ ok: false, error: 'too large' }, 413);
  const raw = await request.text();
  if (raw.length > MAX_BODY) return reply({ ok: false, error: 'too large' }, 413);

  let body;
  try { body = JSON.parse(raw); } catch { return reply({ ok: false, error: 'bad request' }, 400); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return reply({ ok: false, error: 'bad request' }, 400);
  if (body.type !== 'quiz' && body.type !== 'booking') return reply({ ok: false, error: 'bad request' }, 400);

  if (env.TURNSTILE_SECRET) {
    const ok = await turnstileOk(env.TURNSTILE_SECRET, body.turnstile, ip);
    if (!ok) return reply({ ok: false, error: 'verification failed' }, 403);
  }

  if (!env.UB_ENDPOINT || !env.UB_TOKEN) return reply({ ok: false, error: 'not configured' }, 503);

  const { turnstile, token, ...fields } = body;      // never trust a token from the browser
  try {
    const res = await fetch(env.UB_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...fields, token: env.UB_TOKEN }),
      redirect: 'follow',
    });
    const data = await res.json().catch(() => null);
    // Pass on only ok/not-ok and a short reason, never upstream detail.
    if (data && data.ok) return reply({ ok: true });
    return reply({ ok: false, error: (data && typeof data.error === 'string') ? data.error.slice(0, 40) : 'upstream error' }, 502);
  } catch {
    return reply({ ok: false, error: 'upstream error' }, 502);
  }
}

async function turnstileOk(secret, token, ip) {
  if (typeof token !== 'string' || !token || token.length > 2048) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  form.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const out = await res.json();
    return out && out.success === true;
  } catch {
    return false;
  }
}
