# Moving unibridgenl.com to Cloudflare

The public site keeps working on GitHub Pages until step 4. Nothing here touches FRIDAY.

## 1. Create the Worker (5 min)
Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository**
- Repository: `unibridgenl-cloud/unibridgenl-website`, branch `main`
- Project name: `unibridgenl-site` (must be exactly this)
- Advanced → Root directory: `site-worker`
- Build command: `bash build.sh`
- Deploy command: `npx wrangler deploy`

Save and deploy. It goes live at `unibridgenl-site.<your-subdomain>.workers.dev`.

## 2. Add the secrets (2 min)
Worker `unibridgenl-site` → **Settings** → **Variables and Secrets** → add as **Secret** (encrypted):
- `UB_ENDPOINT` = the Apps Script `/exec` URL
- `UB_TOKEN` = the `SHARED_TOKEN` from the Apps Script

## 3. Check the preview
Open the workers.dev address and click through a few pages. Then tell Claude, who will test it too.

## 4. Move the domain to Cloudflare (10 min, then up to a few hours to settle)
1. Dashboard → **Add a domain** → `unibridgenl.com` → **Free** plan.
2. Cloudflare copies the existing DNS records. **Check any MX / email records are in the list before continuing.**
3. At **Mijndomein** → domain → **Nameservers** → replace them with the two Cloudflare gives you.
4. When Cloudflare says the domain is active: Worker `unibridgenl-site` → **Settings** → **Domains & Routes** → **Add custom domain** → `unibridgenl.com`, then again for `www.unibridgenl.com`. Cloudflare replaces the old GitHub A-records and CNAME itself.

## 5. Turn on the protections (5 min)
Under the `unibridgenl.com` domain:
- **SSL/TLS → Edge Certificates**: Always Use HTTPS **on**, Minimum TLS **1.2**, HSTS **on**.
- **DNS → Settings**: DNSSEC **on**, then paste the DS record it shows at Mijndomein.
- **Security → Bots**: Bot Fight Mode **on**.
- **Security → WAF → Rate limiting rules** (free plan allows one): requests where URI Path starts with `/api/`, 10 requests per 10 seconds per IP → **Block** for 10 seconds.
- **Security → WAF → Managed rules**: leave the free managed ruleset **on**.

## 6. Hand back to Claude
Claude then: switches the booking and quiz forms to `/api/automation`, removes the Apps Script token from the public code, adds Turnstile, and you rotate the token in the Apps Script. Making the GitHub repo **private comes last**, because that switches GitHub Pages off.

## 7. Lock your accounts (most important)
Two-factor login (passkey or authenticator app, not SMS) on: GitHub, Cloudflare, unibridgenl@gmail.com, Mijndomein, Web3Forms. At Mijndomein also turn on the **transfer lock**.
