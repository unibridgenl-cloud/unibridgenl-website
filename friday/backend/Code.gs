/**
 * F.R.I.D.A.Y. — metrics backend
 * ---------------------------------------------------------------------------
 * Serves the JSON the dashboard polls. Runs as a Google Apps Script web app,
 * i.e. on the same account that already handles the quiz and the booking form,
 * so there is no new server, no new bill and no new password.
 *
 * It pulls from three places, each optional:
 *   1. A Google Sheet you type into        — the numbers only you know
 *   2. Google Calendar                     — calls booked, counted automatically
 *   3. Stripe                              — revenue, counted automatically
 *
 * Anything it cannot reach is simply left out of the response, and the
 * dashboard keeps showing its own value for that field. Nothing breaks.
 *
 * SETUP (about ten minutes)
 * ---------------------------------------------------------------------------
 * 1. Make a Google Sheet. Add a tab named exactly:  FRIDAY
 *    Two columns, header row `field` | `value`, then one row per number:
 *
 *        field                     value
 *        objective.name            SIGNED STUDENTS — INTAKE FEB 2027
 *        objective.current         34
 *        objective.target          50
 *        objective.deadline        2026-12-15
 *        stats.appsLive            61
 *        stats.housingSet          18
 *        stats.pipeline            21800
 *        vitals.enrolmentPipeline  74
 *        vitals.housingCapacity    48
 *        vitals.visaQueue          66
 *        vitals.responseSla        91
 *        vitals.cashRunway         82
 *        vitals.adEfficiency       57
 *        proximity.hotLeads        9
 *        proximity.awaitingDocs    14
 *        proximity.uniPartners     6
 *        proximity.openTickets     3
 *
 *    Leave out any row you do not track yet. Vitals are percentages, 0-100.
 *
 * 2. Extensions → Apps Script, paste this file in.
 *
 * 3. Project Settings → Script Properties, add:
 *        FRIDAY_TOKEN       a long random string you invent
 *        SPREADSHEET_ID     the id in the sheet's URL (between /d/ and /edit)
 *        CALENDAR_MATCH     (optional) text that appears in your call events,
 *                           e.g. "UniBridge" — leave unset to skip Calendar
 *        STRIPE_SECRET_KEY  (optional) sk_live_... — leave unset to skip Stripe
 *
 * 4. Deploy → New deployment → Web app.
 *        Execute as:    Me
 *        Who has access: Anyone
 *    Copy the /exec URL.
 *
 * 5. In friday/index.html set:
 *        sources: { enabled: true, endpoint: '<that /exec URL>', token: '<FRIDAY_TOKEN>' }
 *
 * A NOTE ON THE TOKEN
 * ---------------------------------------------------------------------------
 * The token ends up in the page's JavaScript, so it is only a speed bump
 * against a stranger who finds the URL — not real protection. That is fine
 * while the dashboard is behind a login (step 4 of the plan). Until then,
 * keep genuinely sensitive figures out of the sheet, and never put the
 * Stripe key anywhere but Script Properties, which stay server-side.
 */

function doGet(e) {
  var params = (e && e.parameter) || {};
  var props  = PropertiesService.getScriptProperties();

  if (params.action !== 'metrics') return json({ error: 'unknown action' });

  var expected = props.getProperty('FRIDAY_TOKEN');
  if (expected && params.token !== expected) return json({ error: 'bad token' });

  var out = { generatedAt: new Date().toISOString(), telemetry: [] };

  readSheet(props, out);
  readCalendar(props, out);
  readStripe(props, out);
  derive(out);

  return json(out);
}

/* --- 1. the sheet ------------------------------------------------------- */
function readSheet(props, out) {
  var id = props.getProperty('SPREADSHEET_ID');
  if (!id) return;
  try {
    var sheet = SpreadsheetApp.openById(id).getSheetByName('FRIDAY');
    if (!sheet) return;
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      var path = String(rows[i][0] || '').trim();
      var raw  = rows[i][1];
      if (!path || raw === '' || raw === null) continue;

      var parts = path.split('.');
      if (parts.length !== 2) continue;
      var group = parts[0], key = parts[1];

      var value = (typeof raw === 'number') ? raw
                : (raw instanceof Date)     ? Utilities.formatDate(raw, 'UTC', 'yyyy-MM-dd')
                : isFinite(Number(raw))     ? Number(raw)
                : String(raw);

      if (!out[group]) out[group] = {};
      out[group][key] = value;
    }
  } catch (err) {
    out.telemetry.push({ kind: 'warnln', text: 'Sheet unreadable: ' + err.message });
  }
}

/* --- 2. calls booked, from Calendar ------------------------------------- */
function readCalendar(props, out) {
  var match = props.getProperty('CALENDAR_MATCH');
  if (!match) return;
  try {
    var now = new Date();
    var weekAgo = new Date(now.getTime() - 7 * 86400000);
    var events = CalendarApp.getDefaultCalendar().getEvents(weekAgo, now);
    var count = 0;
    for (var i = 0; i < events.length; i++) {
      if (events[i].getTitle().toLowerCase().indexOf(match.toLowerCase()) !== -1) count++;
    }
    out.stats = out.stats || {};
    out.stats.calls7d = count;

    var ahead = CalendarApp.getDefaultCalendar()
      .getEvents(now, new Date(now.getTime() + 7 * 86400000));
    var upcoming = 0;
    for (var j = 0; j < ahead.length; j++) {
      if (ahead[j].getTitle().toLowerCase().indexOf(match.toLowerCase()) !== -1) upcoming++;
    }
    if (upcoming) out.telemetry.push({ kind: 'sys', text: upcoming + ' calls scheduled in the next seven days' });
  } catch (err) {
    out.telemetry.push({ kind: 'warnln', text: 'Calendar unreadable: ' + err.message });
  }
}

/* --- 3. revenue, from Stripe -------------------------------------------- */
function readStripe(props, out) {
  var key = props.getProperty('STRIPE_SECRET_KEY');
  if (!key) return;
  try {
    var since = Math.floor((Date.now() - 30 * 86400000) / 1000);
    var res = UrlFetchApp.fetch(
      'https://api.stripe.com/v1/charges?limit=100&created[gte]=' + since,
      { headers: { Authorization: 'Bearer ' + key }, muteHttpExceptions: true }
    );
    if (res.getResponseCode() !== 200) throw new Error('HTTP ' + res.getResponseCode());

    var charges = JSON.parse(res.getContentText()).data || [];
    var total = 0, n = 0;
    for (var i = 0; i < charges.length; i++) {
      var c = charges[i];
      if (c.paid && !c.refunded && c.status === 'succeeded') { total += c.amount; n++; }
    }
    out.stats = out.stats || {};
    if (n) out.stats.avgDeal = Math.round(total / n / 100);
    out.stats.revenue30d = Math.round(total / 100);
    out.telemetry.push({ kind: 'okln', text: n + ' payments cleared in the last 30 days, €' + Math.round(total / 100) });
  } catch (err) {
    out.telemetry.push({ kind: 'warnln', text: 'Stripe unreachable: ' + err.message });
  }
}

/* --- 4. numbers worked out from the others ------------------------------ */
function derive(out) {
  var s = out.stats || {};
  var o = out.objective || {};
  // conversion = signed students / calls booked, when both are known
  if (s.conversion === undefined && o.current && s.calls7d) {
    s.conversion = Math.round((o.current / (s.calls7d * 4)) * 100);   // calls7d ≈ weekly rate
  }
  out.stats = s;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* Run this once from the editor to check your setup without deploying. */
function testMetrics() {
  var props = PropertiesService.getScriptProperties();
  var out = { telemetry: [] };
  readSheet(props, out); readCalendar(props, out); readStripe(props, out); derive(out);
  Logger.log(JSON.stringify(out, null, 2));
}
