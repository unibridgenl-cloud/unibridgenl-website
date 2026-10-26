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

/* ---------- conversation ----------------------------------------------
 * She answers out loud, so the spoken half of every reply stays short.
 * But a question like "how should I handle btw as a one-man company" has
 * no short answer worth having, and no answer at all inside the dashboard
 * data — so she is given the web search tool and splits her reply in two:
 * the sentence she says, and a written brief the page can show with its
 * sources. The marker below is how she separates them; if she forgets it,
 * the split happens here instead, deterministically.
 * -------------------------------------------------------------------- */
const BRIEF_MARK = '===BRIEF===';
const MAX_HOPS = 5;              // search rounds before we stop the turn

async function handleChat(request, env) {
  if (request.method !== 'POST') return json({ error: 'POST only' }, 405);
  if (!env.ANTHROPIC_API_KEY)    return json({ error: 'brain not configured' }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400); }

  const text = String(body.text || '').slice(0, 2000);
  if (!text.trim()) return json({ error: 'no text' }, 400);

  const operator = String(body.operator || 'Harsh').slice(0, 40);
  const snapshot = body.data ? JSON.stringify(body.data).slice(0, 6000) : '(none supplied)';
  const today = new Date().toISOString().slice(0, 10);

  const system =
    `You are F.R.I.D.A.Y., mission control for ${operator}, who runs UniBridge NL (helping ` +
    `international students into Dutch universities), Noviq Studios, and a Resit Study Board for ` +
    `his own university work. He is based in The Hague, Netherlands. Today is ${today}.\n\n` +

    `TWO KINDS OF QUESTION.\n` +
    `Readings off his own board — pipeline, inbox, objective, vitals, offices — come only from the ` +
    `dashboard data below. Never invent one of those figures; if it is not in the data, say you do ` +
    `not have that reading.\n` +
    `Everything else — Dutch tax and company rules, bookkeeping and auditing, pricing, hiring, ` +
    `university deadlines and resit rules, study planning, market and competitor questions, news, ` +
    `anything dated — you research with the web search tool before answering. Search rather than ` +
    `answering from memory whenever the answer could have changed, carries a number, a rate, a ` +
    `threshold or a deadline, or concerns a specific organisation. Prefer official sources: ` +
    `belastingdienst.nl, kvk.nl, rijksoverheid.nl, the university's own pages. Say what you found ` +
    `and name the source; if the sources disagree or you could not find it, say that plainly ` +
    `instead of filling the gap.\n` +
    `Never tell him you have no web access — you do.\n\n` +

    `HOW TO ANSWER.\n` +
    `Your reply is read aloud by a voice synthesiser, so the first part is at most three short ` +
    `spoken sentences: plain prose, no markdown, no lists, no emoji, no URLs, no headings. Calm, ` +
    `dry, precise — a chief of staff, not a chatbot. Address him as ${operator} only when it lands ` +
    `naturally.\n` +
    `If the answer has more to it than those three sentences — anything you researched, any ` +
    `recommendation, plan, comparison or set of steps — then after the spoken part write a line ` +
    `containing only ${BRIEF_MARK} and below it the full written answer for him to read on screen. ` +
    `There you may use short lines and numbered steps, and you should give concrete figures, ` +
    `dates and next actions. End a researched brief with the sources you used. Keep the brief ` +
    `under 300 words. If the spoken sentences already say everything, leave the marker out.\n\n` +

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

  const payload = {
    model: env.ANTHROPIC_MODEL || 'claude-opus-5',
    max_tokens: 2000,                 // spoken line + written brief + the searching
    output_config: { effort: env.ANTHROPIC_EFFORT || 'medium' },
    system,
    tools: [{
      type: 'web_search_20260209',
      name: 'web_search',
      max_uses: 5,                    // a ceiling on one question's search bill
      /* Dutch results for a Dutch company, without him having to say so. */
      user_location: { type: 'approximate', country: 'NL', city: 'The Hague', timezone: 'Europe/Amsterdam' }
    }],
    messages
  };

  const sources = [];
  let searched = 0;
  let out = '';
  let note = '';

  try {
    /* The search runs on Anthropic's side, but a long turn comes back
       paused rather than finished — so keep handing it back its own
       output until it stops for a reason that is not a pause. */
    for (let hop = 0; hop < MAX_HOPS; hop++) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const detail = (await res.text()).slice(0, 300);
        return json({ error: `claude ${res.status}: ${detail}` }, 502);
      }

      const data = await res.json();

      // Safety classifiers decline with HTTP 200 — check before reading content.
      if (data.stop_reason === 'refusal')
        return json({ reply: `I cannot answer that one, ${operator}.` });

      for (const block of (data.content || [])) {
        if (block.type === 'text') out += block.text;
        if (block.type !== 'web_search_tool_result') continue;
        /* On a good search .content is a list of results. On a failed one
           it is a single object carrying an error_code — and the request
           still came back 200, so indexing it blindly would read
           undefined and lose the reason. */
        if (Array.isArray(block.content)) {
          searched++;
          for (const r of block.content) {
            if (r && r.url && !sources.some(s => s.url === r.url))
              sources.push({ url: String(r.url).slice(0, 300), title: String(r.title || r.url).slice(0, 160) });
          }
        } else if (block.content && block.content.error_code) {
          note = block.content.error_code === 'max_uses_exceeded'
            ? 'search limit reached on this question'
            : 'web search failed: ' + block.content.error_code;
        }
      }

      if (data.stop_reason !== 'pause_turn') break;

      /* Paused: the whole turn so far goes back verbatim — thinking
         blocks and search blocks included — or she loses her place. */
      payload.messages = [...payload.messages, { role: 'assistant', content: data.content }];
      if (hop === MAX_HOPS - 1) note = note || 'answer cut short — the research ran long';
    }

    out = out.trim();
    if (!out) return json({ reply: 'I have nothing to add.', note });

    const split = splitReply(out);
    return json({ reply: split.spoken, brief: split.brief, sources, searched, note });
  } catch (err) {
    return json({ error: 'chat failed: ' + err.message }, 502);
  }
}

/* Spoken half / written half. The marker is the intended route; the
   sentence count is the fallback for when she answers in one long block,
   because the alternative is the synthesiser reading a 300-word essay
   out loud. */
function splitReply(out) {
  const at = out.indexOf(BRIEF_MARK);
  if (at !== -1) {
    const spoken = out.slice(0, at).trim();
    const brief  = out.slice(at + BRIEF_MARK.length).trim();
    if (spoken) return { spoken, brief: brief || '' };
    return { spoken: firstSentences(brief, 3), brief };
  }
  if (out.length <= 320) return { spoken: out, brief: '' };
  return { spoken: firstSentences(out, 3), brief: out };
}

function firstSentences(text, n) {
  const parts = String(text).replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+|\S[^.!?]*$/g) || [text];
  const taken = parts.slice(0, n).join(' ').trim();
  return taken.length > 400 ? taken.slice(0, 397).trimEnd() + '…' : taken;
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
