# Putting FRIDAY online, for your eyes only

The goal: a real URL you can open from any device, that asks for your Google
login and refuses everybody else. Free, and no change to the DNS that serves
unibridgenl.com.

The short version: **Cloudflare Pages hosts the folder, Cloudflare Access puts
a login in front of it.** About fifteen minutes, once.

---

## Why not just put it on unibridgenl.com

GitHub Pages cannot put a login in front of a page. Anything it serves is
public to anyone who knows the URL, and "nobody will guess `/friday/`" is not
access control — it is a hope. `_config.yml` in the repo root therefore
excludes `friday/` from the published site, so merging this branch does **not**
put your dashboard on the public web.

---

## Step 1 — merge the branch

Only needed if you connect Cloudflare to GitHub (the optional route below).
Deploying from your terminal works straight from the branch, unmerged.

Either way, once `friday/` does land on `main`, check that
`https://unibridgenl.com/friday/` returns a **404**. If it doesn't, stop and
say so — the Jekyll exclusion isn't working and your dashboard is public.

## Step 2a — the drag-and-drop route (no Git, no CLI)

Cloudflare's uploader takes HTML, CSS and JS only, so the mp3 and `_headers`
would be dropped. Build the standalone file instead — it inlines the voice
clip, leaving one file with no external references:

```bash
./friday/build-single-file.sh        # writes dist/index.html
```

Then drag `dist/index.html` into **Upload your static files**. Rebuild and
re-upload whenever index.html changes.

The trade-off versus the Git route: no auto-deploy, and `_headers` is gone,
so you lose the noindex and no-store headers. Access is still the thing doing
the actual protecting, so this is a cosmetic loss, not a security one.

## Step 2b — create the site from your terminal

Cloudflare keeps rearranging the dashboard, and the Pages "Connect to Git"
flow has moved more than once. The command line does not move, so use it:

```bash
# from the repo root, on your own machine (not in a Claude session)
npx wrangler login                    # opens a browser, sign in, approve
npx wrangler pages deploy friday --project-name=unibridgenl-friday
```

The first command authorises wrangler against your Cloudflare account. The
second creates the project and uploads the folder, printing a URL like
`https://unibridgenl-friday.pages.dev` when it finishes.

That is the whole deploy. No build step, no Git connection, no dashboard
navigation. To push a change later, run the same `pages deploy` line again.

Requirements: Node installed locally (`node --version`), and a Cloudflare
account (free, no card needed for Pages).

### If you would rather connect it to GitHub

Auto-deploy on every push is nice but optional, and it is the part of the
dashboard that keeps being redesigned. In the sidebar look for **Workers &
Pages**, **Compute**, or just **Workers** — the label has changed between
versions — then the option to import or connect an existing repository.
Settings, whatever the screen calls them:

- Framework preset: **None**
- Build command: **leave empty**
- Build output directory: **`friday`**
- Production branch: **main**

If you cannot find it, do not fight it. The `wrangler pages deploy` line above
produces exactly the same result.

## Step 3 — Cloudflare Access (the actual lock)

1. In the same dashboard: **Zero Trust**. It asks you to pick a team name and a
   plan — choose the **Free** plan (50 users, card may be requested, not charged).
2. **Access → Applications → Add an application → Self-hosted.**
   (Zero Trust lives at `one.dash.cloudflare.com`, a separate dashboard from
   the main one — if the menu looks unfamiliar, check you are on that domain.)
   - Application name: `FRIDAY`
   - Session duration: **1 month** (so you're not logging in daily)
   - Public hostname: your `<project>.pages.dev`
3. **Add a policy:**
   - Policy name: `Only me`
   - Action: **Allow**
   - Include → **Emails** → `unibridgenl@gmail.com`
4. Under **Login methods**, make sure **Google** is on (or use the one-time PIN
   method, which emails you a code — no Google app setup needed).
5. Save.

Open the URL in a private window. You should get a Cloudflare login screen, and
after signing in as that address, the dashboard. Any other address gets refused.

## Step 3b — her brain, her voice, and sync across your devices

Three secrets and one store turn her from a dashboard into an assistant.
All four are optional and she degrades cleanly without each one.

**Secrets** — the friday Worker → Settings → Variables and Secrets:

| Name | What it buys | Without it |
|---|---|---|
| `ANTHROPIC_API_KEY` | real conversation **and web search**, on every device | the built-in keyword engine |
| `ELEVEN_API_KEY` | Melania on every line she says | the five recorded lines, then the device voice |
| `ELEVEN_VOICE_ID` | `tUxvnIoZrrcsUY1wdYot` (Melania) | as above |

Two optional knobs on the same page, both plain variables rather than secrets:

| Name | Default | What it does |
|---|---|---|
| `ANTHROPIC_MODEL` | `claude-opus-5` | which model answers |
| `ANTHROPIC_EFFORT` | `medium` | `low` makes her quicker and less thorough |

**What web search changes.** With the key in place she can look things
up rather than answering from memory: Dutch tax and KvK rules, university
deadlines, prices, anything with a date on it. She searches at most five
times per question and prefers official sources. Two things follow from
that. She answers a researched question a few seconds slower than a
reading off your own board — set `ANTHROPIC_EFFORT` to `low` to trade
some of that back. And each search is billed to your Anthropic account on
top of the tokens, so the five-search ceiling is the cap on what one
question can cost.

When an answer is longer than the three sentences she says out loud, the
rest appears in a **Briefing** panel at the bottom right, with the sources
she used listed underneath — click one to check her. Escape or Close
dismisses it; the next question clears it.

**Sync** — one board behind the Mac, the iPad and the phone:

```bash
npx wrangler kv namespace create FRIDAY_STATE
```

It prints an id. Put it in `wrangler.jsonc`:

```jsonc
"kv_namespaces": [
  { "binding": "STATE", "id": "<the id it printed>" }
]
```

Push, and `/api/health` starts reporting `sync: true`. Queue work on the
MacBook and it is there on the phone; approve it on the iPad and the
MacBook sees that too. Until the binding exists she says "sync not
configured — this device only" in diagnostics and keeps working.

**A note on the key.** It lives in the Worker, never in the app. Anything
shipped to a device can be read off that device, so an app with a key
baked in is a leaked key. The Worker holds it, Access guards the Worker,
and the app never sees it.

## Step 4 — point her at the backend

Once she's online, fill in the three config blocks at the top of `index.html`
with your Apps Script `/exec` URL and token — see `backend/README.md`. Then
re-run `npx wrangler pages deploy friday` (or push to `main`, if you connected
Git) to publish the change.

---

## Adding a second device or a co-founder

Add the address to the same Access policy. Don't share the login itself —
each person signs in as themselves, and you can revoke one without touching
the other.

## If you'd rather not use Cloudflare

| Option | Verdict |
|---|---|
| **Netlify / Vercel password protection** | Works, but it's a paid plan on both now. |
| **Apps Script web app, access "Only myself"** | Free and no new account — but Apps Script serves pages in a sandboxed frame that doesn't grant microphone permission, so voice input breaks. Fine as a read-only screen, not as FRIDAY. |
| **Keep it local** — `npx http-server friday` | Free, zero exposure, full microphone. But only on that machine, and not on your phone. |

The microphone needs HTTPS or localhost either way. Opening `index.html`
straight from disk with `file://` disables speech recognition.
