/**
 * FRIDAY — the Worker behind the dashboard.
 *
 * It serves the static page as before, and adds two endpoints that need a
 * secret and therefore cannot live in the page:
 *
 *   POST /api/chat  { text, history, operator }  -> { reply }
 *   POST /api/tts   { text }                     -> audio/mpeg
 *
 * This is what closes the split between the two URLs. Until now the
 * artifact could think (Claude through the viewer) but not hear, and this
 * site could hear but not think. With these, one page does both — the
 * microphone works because it is a real origin, and the answers come from
 * Claude because the key is held here rather than shipped to the browser.
 *
 * SECRETS (Cloudflare dashboard -> the friday Worker -> Settings ->
 * Variables and Secrets, or `npx wrangler secret put NAME`):
 *
 *   ANTHROPIC_API_KEY   sk-ant-...   conversation. Without it she falls
 *                                    back to the built-in keyword engine.
 *   ELEVEN_API_KEY      ElevenLabs   her voice on every line. Without it
 *                                    the device voice is used.
 *   ELEVEN_VOICE_ID     tUxvnIoZrrcsUY1wdYot   (Melania)
 *
 * Nothing here is required: with no secrets set, both endpoints answer
 * with a plain error and the page degrades exactly as it does today.
 *
 * Access protects this Worker, so these endpoints are only reachable by
 * someone already through the login. They are not open to the internet.
 */

const JSON_HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: JSON_HEADERS });

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/state')) return handleState(request, env, url);
    if (url.pathname === '/api/chat') return handleChat(request, env);
    if (url.pathname === '/api/tts')  return handleTts(request, env, ctx);
    if (url.pathname === '/api/health') {
      return json({
        ok: true,
        brain: !!env.ANTHROPIC_API_KEY,
        voice: !!(env.ELEVEN_API_KEY && env.ELEVEN_VOICE_ID),
        sync: !!env.STATE
      });
    }

    return env.ASSETS.fetch(request);          // everything else is the page
  }
};

/* ---------- shared state across devices --------------------------------
 * One store behind every device, so the Mac, the iPad and the phone are
 * looking at the same board rather than three private copies. Access
 * already gates this Worker, so the store is only reachable by someone
 * through the login — it needs no auth of its own.
 *
 * Needs a KV namespace bound as STATE. Without it these endpoints answer
 * 503 and the app falls back to this-device-only, which is exactly how it
 * behaves today — nothing breaks while the binding is missing.
 *
 *   GET  /api/state                     -> the whole board
 *   POST /api/state/append  {collection, row}
 *   POST /api/state/update  {collection, id, patch}
 * ---------------------------------------------------------------------- */
const COLLECTIONS = ['commands', 'updates', 'approvals', 'projects'];
const STATE_KEY = 'board';
const MAX_ROWS = 200;                    // keeps one runaway loop from filling the store

async function readBoard(env){
  const raw = await env.STATE.get(STATE_KEY, 'json');
  const board = raw && typeof raw === 'object' ? raw : {};
  COLLECTIONS.forEach(c => { if (!Array.isArray(board[c])) board[c] = []; });
  return board;
}

async function handleState(request, env, url){
  if (!env.STATE) return json({ error: 'sync not configured' }, 503);

  if (request.method === 'GET'){
    const board = await readBoard(env);
    return json({ board, at: Date.now() });
  }

  if (request.method !== 'POST') return json({ error: 'GET or POST' }, 405);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400); }

  const collection = String(body.collection || '');
  if (!COLLECTIONS.includes(collection)) return json({ error: 'unknown collection' }, 400);

  const board = await readBoard(env);

  if (url.pathname.endsWith('/append')){
    const row = (body.row && typeof body.row === 'object') ? body.row : {};
    row.id = row.id || (Date.now().toString(36) + Math.random().toString(36).slice(2, 6));
    row.at = row.at || Date.now();
    board[collection] = [row, ...board[collection]].slice(0, MAX_ROWS);
    await env.STATE.put(STATE_KEY, JSON.stringify(board));
    return json({ ok: true, row });
  }

  if (url.pathname.endsWith('/update')){
    const id = String(body.id || '');
    const patch = (body.patch && typeof body.patch === 'object') ? body.patch : {};
    const row = board[collection].find(r => r.id === id);
    if (!row) return json({ error: 'no such row' }, 404);
    Object.assign(row, patch, { updatedAt: Date.now() });
    await env.STATE.put(STATE_KEY, JSON.stringify(board));
    return json({ ok: true, row });
  }

  return json({ error: 'append or update' }, 404);
}

/* ---------- conversation ---------------------------------------------- */
async function handleChat(request, env) {
  if (request.method !== 'POST') return json({ error: 'POST only' }, 405);
  if (!env.ANTHROPIC_API_KEY)    return json({ error: 'brain not configured' }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400); }

  const text = String(body.text || '').slice(0, 2000);
  if (!text.trim()) return json({ error: 'no text' }, 400);

  const operator = String(body.operator || 'Harsh').slice(0, 40);
  const snapshot = body.data ? JSON.stringify(body.data).slice(0, 6000) : '(none supplied)';

  const system =
    `You are F.R.I.D.A.Y., mission control for ${operator}, who runs UniBridge NL (helping ` +
    `international students into Dutch universities), Noviq Studios, and a Resit Study Board for ` +
    `his own university work.\n\n` +
    `You speak aloud through a voice synthesiser: at most three short sentences, plain spoken prose. ` +
    `No markdown, no lists, no emoji, no headings. Calm, dry, precise — a chief of staff, not a ` +
    `chatbot. Address him as ${operator} only when it lands naturally.\n\n` +
    `Ground every figure in the dashboard data below and never invent one. If something is not in ` +
    `the data, say you do not have that reading rather than guessing. You have no web access.\n\n` +
    `Dashboard data: ${snapshot}`;

  const messages = [];
  for (const turn of (Array.isArray(body.history) ? body.history.slice(-8) : [])) {
    if (!turn || !turn.text) continue;
    messages.push({
      role: turn.role === 'assistant' ? 'assistant' : 'user',
      content: String(turn.text).slice(0, 2000)
    });
  }
  messages.push({ role: 'user', content: text });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: env.ANTHROPIC_MODEL || 'claude-opus-5',
        max_tokens: 400,                      // she is speaking; long answers are a bug
        output_config: { effort: 'low' },     // a spoken reply wants speed
        system,
        messages
      })
    });

    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      return json({ error: `claude ${res.status}: ${detail}` }, 502);
    }

    const data = await res.json();

    // Safety classifiers decline with HTTP 200 — check before reading content.
    if (data.stop_reason === 'refusal') return json({ reply: `I cannot answer that one, ${operator}.` });

    const reply = (data.content || [])
      .filter(b => b.type === 'text').map(b => b.text).join('').trim();

    return json({ reply: reply || 'I have nothing to add.', usage: data.usage });
  } catch (err) {
    return json({ error: 'chat failed: ' + err.message }, 502);
  }
}

/* ---------- her voice --------------------------------------------------- */
async function handleTts(request, env, ctx) {
  if (request.method !== 'POST') return json({ error: 'POST only' }, 405);
  if (!env.ELEVEN_API_KEY || !env.ELEVEN_VOICE_ID) return json({ error: 'voice not configured' }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400); }

  const text = String(body.text || '').slice(0, 2000);
  if (!text.trim()) return json({ error: 'no text' }, 400);

  /* Identical lines are common — the greeting, acknowledgements, status
     phrasings — and every repeat is billed, so serve them from cache. */
  const cacheKey = new Request(
    new URL('/api/tts-cache/' + encodeURIComponent(text.slice(0, 180)), request.url).toString(),
    { method: 'GET' }
  );
  const cache = caches.default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(env.ELEVEN_VOICE_ID)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': env.ELEVEN_API_KEY,
          'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
          text,
          model_id: env.ELEVEN_MODEL_ID || 'eleven_turbo_v2_5',
          voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.2 }
        })
      }
    );

    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      return json({ error: `elevenlabs ${res.status}: ${detail}` }, 502);
    }

    const audio = new Response(res.body, {
      headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=21600' }
    });
    ctx.waitUntil(cache.put(cacheKey, audio.clone()));
    return audio;
  } catch (err) {
    return json({ error: 'tts failed: ' + err.message }, 502);
  }
}
