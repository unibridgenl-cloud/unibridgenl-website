# F.R.I.D.A.Y. — backend setup

The dashboard is one static HTML file and runs perfectly well on its own, on
mock data, with nothing deployed. Everything here is optional, and each piece
works without the others. Turn on only what you want.

| You want | Set up | She gains |
|---|---|---|
| Real numbers | Sheet + Apps Script | The dashboard shows your actual figures instead of mock ones |
| Her real voice | ElevenLabs key | Every reply spoken in your designed voice, not the robotic system one |
| Real conversation | Anthropic key | She answers anything, grounded in the live numbers, instead of matching keywords |

All three run through **one** Apps Script web app — the same account that
already handles the quiz and the booking form. No new server, no new bill.

---

## 1. Deploy the script

1. Create a Google Sheet. Add a tab named exactly `FRIDAY`, with header row
   `field` | `value`, then one row per number you track. The full list of field
   names is in the comment at the top of `Code.gs`. Start with three rows if you
   like — anything you leave out keeps its mock value.
2. In that sheet: **Extensions → Apps Script**, paste in `Code.gs`.
3. **Project Settings → Script Properties**, add what applies:

   | Property | Needed for | Value |
   |---|---|---|
   | `FRIDAY_TOKEN` | everything | a long random string you invent |
   | `SPREADSHEET_ID` | real numbers | the id in the sheet URL, between `/d/` and `/edit` |
   | `CALENDAR_MATCH` | calls counted automatically | text in your call events, e.g. `UniBridge` |
   | `STRIPE_SECRET_KEY` | revenue counted automatically | `sk_live_…` |
   | `ELEVEN_API_KEY` | her voice | your ElevenLabs key |
   | `ELEVEN_VOICE_ID` | her voice | the voice id to speak with |
   | `ANTHROPIC_API_KEY` | conversation | `sk-ant-…` |

4. Run `testMetrics` once from the editor. It prints what it can read, so you
   find a wrong sheet id now rather than from a silent dashboard later.
5. **Deploy → New deployment → Web app**, execute as **Me**, access **Anyone**.
   Copy the `/exec` URL.

## 2. Point the dashboard at it

In `friday/index.html`, three places, all near the top:

```js
sources: { enabled: true, endpoint: '<exec URL>', token: '<FRIDAY_TOKEN>' }
voice:   { engine: 'elevenlabs', elevenlabs: { proxyUrl: '<exec URL>', token: '<FRIDAY_TOKEN>' } }
brain:   { enabled: true, proxyUrl: '<exec URL>', token: '<FRIDAY_TOKEN>' }
```

Every key stays in Script Properties, server-side. Nothing secret is ever in
the HTML — the page only ever holds the `FRIDAY_TOKEN`, and that is a speed
bump, not a lock, which is why the page itself needs to sit behind a login.

## 3. Where she lives

She is deliberately **not** published to unibridgenl.com. GitHub Pages cannot
put a login in front of a page, and a dashboard of live business figures on a
guessable public URL is a bad trade. `_config.yml` excludes `friday/` from the
published site.

The recommended home is **Cloudflare Pages + Cloudflare Access**, free, and it
needs no change to your existing DNS:

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**,
   pick this repo, set the build output directory to `friday`, no build command.
   You get a URL like `unibridgenl-friday.pages.dev`.
2. **Zero Trust → Access → Applications → Add an application → Self-hosted**,
   domain `unibridgenl-friday.pages.dev`.
3. Policy: **Allow**, include **Emails** → `unibridgenl@gmail.com`.

From then on that URL asks for a Google login and only that address gets in.
Everyone else gets a locked door, not the dashboard. Add your own address to
the policy on a second device rather than sharing the login.

If you would rather not use Cloudflare, the alternative is to keep her local:
open the file from disk or run `npx http-server friday` and use her at
`localhost`. Note that the microphone needs HTTPS or localhost — opening the
file directly with `file://` disables speech recognition.

## 4. What it costs

- Apps Script, Google Sheets, Calendar, Cloudflare Pages and Access: free at
  this scale.
- ElevenLabs: per character spoken. Identical phrases are cached server-side for
  six hours, so the boot greeting and repeated answers are only paid for once.
- Anthropic: per token. Replies are capped at 400 tokens and run at low effort,
  because she is speaking out loud and long answers are a bug. The metrics
  snapshot she reasons over is cached for a minute so a back-and-forth does not
  re-read Calendar and Stripe on every sentence.
