/**
 * F.R.I.D.A.Y. — metrics backend
 * ---------------------------------------------------------------------------
 * Serves the JSON the dashboard polls. Runs as a Google Apps Script web app,
 * i.e. on the same account that already handles the quiz and the booking form,
 * so there is no new server, no new bill and no new password.
 *
 * It pulls from three places, each optional:
 *   1. Gmail                               — enquiries and replies, automatically
 *   2. A Google Sheet you type into        — the numbers only you know
 *   3. Google Calendar                     — calls booked, counted automatically
 *   4. Stripe                              — revenue, counted automatically
 *
 * Anything it cannot reach is simply left out of the response, and the
 * dashboard keeps showing its own value for that field. Nothing breaks.
 *
 * SETUP (about ten minutes)
 * ---------------------------------------------------------------------------
 * 1. Make a Google Sheet. Add a tab named exactly:  FRIDAY
 *    Two columns, header row `field` | `value`, then one row per number:
 *
 *        field                   value
 *        objective.name          FIRST SIGNED STUDENT
 *        objective.current       0
 *        objective.target        1
 *        objective.deadline      2027-01-15
 *        stats.signed            0
 *        vitals.siteReadiness    60
 *        vitals.cashRunway       80
 *
 *    That is the whole sheet. Enquiries, replies, reply rate, calls and
 *    revenue are read from Gmail, Calendar and Stripe automatically — do not
 *    type those in, a sheet row would override the real number.
 *
 *    Leave out any row you do not track yet. Vitals are percentages, 0-100.
 *
 * 2. Extensions → Apps Script, paste this file in.
 *
 * 3. Project Settings → Script Properties, add:
 *        FRIDAY_TOKEN       a long random string you invent
 *        SPREADSHEET_ID     the id in the sheet's URL (between /d/ and /edit)
 *        GMAIL_QUERY        (optional) which mail counts as an enquiry, e.g.
 *                           "in:inbox -in:chats -category:promotions". Unset
 *                           to skip Gmail entirely.
 *        GMAIL_WEEKLY_GOAL  (optional) enquiries per week you are aiming for,
 *                           used for the LEAD FLOW vital. Defaults to 10.
 *        CALLS_WEEKLY_GOAL  (optional) calls per week you are aiming for,
 *                           used for the CALL PIPELINE vital. Defaults to 5.
 *        GMAIL_SUBJECTS     (optional) "no" to keep subject lines out of the
 *                           telemetry feed and show counts only.
 *        CALENDAR_MATCH     (optional) text that appears in your call events,
 *                           e.g. "UniBridge" — leave unset to skip Calendar
 *        STRIPE_SECRET_KEY  (optional) sk_live_... — leave unset to skip Stripe
 *        ELEVEN_API_KEY     (optional) ElevenLabs key, for her real voice
 *        ELEVEN_VOICE_ID    (optional) the voice id to speak with
 *        ELEVEN_MODEL_ID    (optional) defaults to eleven_turbo_v2_5
 *        ANTHROPIC_API_KEY  (optional) sk-ant-... , for conversational replies
 *        ANTHROPIC_MODEL    (optional) defaults to claude-opus-5
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

/**
 * POST endpoint — speech, and later the conversational replies.
 * The page posts text/plain on purpose: it avoids a CORS preflight that
 * Apps Script cannot answer, the same trick the quiz and booking forms use.
 *
 * Request:  { "action": "tts", "token": "...", "text": "Good morning." }
 * Response: { "audio": "<base64 mp3>", "mime": "audio/mpeg" }
 */
function doPost(e) {
  var body = {};
  try { body = JSON.parse((e && e.postData && e.postData.contents) || '{}'); }
  catch (err) { return json({ error: 'bad json' }); }

  var props = PropertiesService.getScriptProperties();
  var expected = props.getProperty('FRIDAY_TOKEN');
  if (expected && body.token !== expected) return json({ error: 'bad token' });

  if (body.action === 'tts')  return json(speakElevenLabs(props, body.text));
  if (body.action === 'chat') return json(askClaude(props, body.text, body.history, body.operator));
  return json({ error: 'unknown action' });
}

/**
 * ElevenLabs text to speech. The API key never leaves this script.
 * Identical phrases are cached for six hours, so the boot greeting and
 * repeated answers do not spend credits twice.
 */
function speakElevenLabs(props, text) {
  var key = props.getProperty('ELEVEN_API_KEY');
  var voiceId = props.getProperty('ELEVEN_VOICE_ID');
  if (!key || !voiceId) return { error: 'voice not configured' };

  text = String(text || '').slice(0, 2500);           // keep one reply from draining credits
  if (!text.trim()) return { error: 'no text' };

  var cache = CacheService.getScriptCache();
  var cacheKey = 'tts_' + Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, text + voiceId));
  var hit = cache.get(cacheKey);
  if (hit) return { audio: hit, mime: 'audio/mpeg', cached: true };

  try {
    var res = UrlFetchApp.fetch(
      'https://api.elevenlabs.io/v1/text-to-speech/' + encodeURIComponent(voiceId),
      {
        method: 'post',
        contentType: 'application/json',
        headers: { 'xi-api-key': key, 'Accept': 'audio/mpeg' },
        payload: JSON.stringify({
          text: text,
          model_id: props.getProperty('ELEVEN_MODEL_ID') || 'eleven_turbo_v2_5',
          voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.2 }
        }),
        muteHttpExceptions: true
      });

    if (res.getResponseCode() !== 200)
      return { error: 'elevenlabs ' + res.getResponseCode() + ': ' + res.getContentText().slice(0, 200) };

    var b64 = Utilities.base64Encode(res.getBlob().getBytes());
    if (b64.length < 95000) cache.put(cacheKey, b64, 21600);   // cache cap is 100KB per key
    return { audio: b64, mime: 'audio/mpeg' };
  } catch (err) {
    return { error: 'tts failed: ' + err.message };
  }
}

function doGet(e) {
  var params = (e && e.parameter) || {};
  var props  = PropertiesService.getScriptProperties();

  if (params.action !== 'metrics') return json({ error: 'unknown action' });

  var expected = props.getProperty('FRIDAY_TOKEN');
  if (expected && params.token !== expected) return json({ error: 'bad token' });

  return json(buildMetrics(props));
}

function buildMetrics(props) {
  var out = { generatedAt: new Date().toISOString(), telemetry: [] };
  readGmail(props, out);
  readSheet(props, out);
  readCalendar(props, out);
  readStripe(props, out);
  derive(out);
  return out;
}

/* --- 0. the inbox -------------------------------------------------------
 * Right now the mailbox IS the business: no students, no applications, no
 * placements — just conversations that have or have not been answered. So
 * this runs first and feeds the stats, two vitals and the radar.
 *
 * "Awaiting reply" means the last message in the thread is not from you.
 * That is the only definition that survives contact with a real inbox:
 * unread is useless (you read things and forget them) and starred depends
 * on you remembering to star.
 */
function readGmail(props, out) {
  var query = props.getProperty('GMAIL_QUERY');
  if (!query) return;

  try {
    var me = (Session.getActiveUser().getEmail() || '').toLowerCase();
    var weekGoal = Number(props.getProperty('GMAIL_WEEKLY_GOAL') || 10);
    var showSubjects = String(props.getProperty('GMAIL_SUBJECTS') || 'yes').toLowerCase() !== 'no';

    var threads = GmailApp.search(query + ' newer_than:30d', 0, 200);
    var now = Date.now();
    var weekAgo = now - 7 * 86400000;

    var received = 0, replied = 0, awaiting = 0, newThisWeek = 0;
    var oldestWaitHours = 0, waitingList = [];

    for (var i = 0; i < threads.length; i++) {
      var msgs = threads[i].getMessages();
      if (!msgs.length) continue;

      var inboundFromOthers = false, iReplied = false;
      for (var j = 0; j < msgs.length; j++) {
        var from = (msgs[j].getFrom() || '').toLowerCase();
        if (me && from.indexOf(me) !== -1) iReplied = true;
        else inboundFromOthers = true;
      }
      if (!inboundFromOthers) continue;        // a thread only I wrote in

      received++;
      if (iReplied) replied++;

      var last = msgs[msgs.length - 1];
      var lastFrom = (last.getFrom() || '').toLowerCase();
      var lastAt = last.getDate().getTime();
      if (lastAt > weekAgo) newThisWeek++;

      if (!me || lastFrom.indexOf(me) === -1) {   // they spoke last: my move
        awaiting++;
        var waitHours = (now - lastAt) / 3600000;
        if (waitHours > oldestWaitHours) oldestWaitHours = waitHours;
        waitingList.push({ subject: threads[i].getFirstMessageSubject(), hours: waitHours });
      }
    }

    out.stats = out.stats || {};
    out.stats.emailsIn = received;
    out.stats.awaitingReply = awaiting;
    out.stats.replyRate = received ? Math.round((replied / received) * 100) : 0;

    out.proximity = out.proximity || {};
    out.proximity.awaitingReply = awaiting;
    out.proximity.newEnquiries = newThisWeek;
    out.proximity.openThreads = received;

    out.vitals = out.vitals || {};
    // Cleared = the share of threads where the ball is not in your court.
    out.vitals.inboxClear = received ? Math.round(((received - awaiting) / received) * 100) : 100;
    // Reply speed: 100 under two hours, sliding to 0 at two days.
    out.vitals.replySpeed = awaiting === 0 ? 100
      : Math.max(0, Math.round(100 - ((oldestWaitHours - 2) / 46) * 100));
    out.vitals.leadFlow = Math.min(100, Math.round((newThisWeek / Math.max(1, weekGoal)) * 100));

    // Oldest unanswered first — that is the one that costs you a customer.
    waitingList.sort(function (a, b) { return b.hours - a.hours; });
    for (var k = 0; k < Math.min(4, waitingList.length); k++) {
      var w = waitingList[k];
      var age = w.hours < 24 ? Math.round(w.hours) + 'h' : Math.round(w.hours / 24) + 'd';
      out.telemetry.push({
        kind: w.hours > 48 ? 'warnln' : 'sys',
        text: showSubjects
          ? 'Waiting ' + age + ' — ' + String(w.subject || '(no subject)').slice(0, 60)
          : 'A thread has been waiting ' + age + ' for your reply'
      });
    }
    if (!waitingList.length && received)
      out.telemetry.push({ kind: 'okln', text: 'Inbox clear — nothing waiting on a reply' });

  } catch (err) {
    out.telemetry.push({ kind: 'warnln', text: 'Mailbox unreadable: ' + err.message });
  }
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
    out.vitals = out.vitals || {};
    out.vitals.callPipeline = Math.min(100, Math.round(
      (count / Math.max(1, Number(props.getProperty('CALLS_WEEKLY_GOAL') || 5))) * 100));

    var ahead = CalendarApp.getDefaultCalendar()
      .getEvents(now, new Date(now.getTime() + 7 * 86400000));
    var upcoming = 0;
    for (var j = 0; j < ahead.length; j++) {
      if (ahead[j].getTitle().toLowerCase().indexOf(match.toLowerCase()) !== -1) upcoming++;
    }
    out.proximity = out.proximity || {};
    out.proximity.callsAhead = upcoming;
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
    out.stats.revenue30d = Math.round(total / 100);
    if (n) out.stats.avgDeal = Math.round(total / n / 100);
    out.telemetry.push({
      kind: n ? 'okln' : 'sys',
      text: n ? n + ' payments cleared in the last 30 days, €' + Math.round(total / 100)
              : 'No payments in the last 30 days'
    });
  } catch (err) {
    out.telemetry.push({ kind: 'warnln', text: 'Stripe unreachable: ' + err.message });
  }
}

/* --- 4. numbers worked out from the others ------------------------------
 * Deliberately thin. A conversion rate with no signings is not a small
 * number, it is a meaningless one, so it is not computed until there is
 * something to divide.
 */
function derive(out) {
  var s = out.stats || {};
  var o = out.objective || {};
  if (s.conversion === undefined && o.current > 0 && s.calls7d > 0) {
    s.conversion = Math.round((o.current / (s.calls7d * 4)) * 100);
  }
  out.stats = s;
}

/**
 * Conversational replies, grounded in the same numbers the dashboard shows.
 *
 * The metrics are read server-side rather than trusted from the page, so she
 * can never be talked into quoting figures the caller made up. They are cached
 * for a minute so a back-and-forth does not re-hit Calendar and Stripe on
 * every sentence.
 *
 * Apps Script has no npm, so this is the documented raw HTTP shape.
 */
function askClaude(props, text, history, operator) {
  operator = String(operator || 'Commander').slice(0, 40);
  var key = props.getProperty('ANTHROPIC_API_KEY');
  if (!key) return { error: 'brain not configured' };

  text = String(text || '').slice(0, 1000);
  if (!text.trim()) return { error: 'no text' };

  var cache = CacheService.getScriptCache();
  var snapshot = cache.get('metrics_snapshot');
  if (!snapshot) {
    var metrics = buildMetrics(props);
    snapshot = JSON.stringify(metrics);
    cache.put('metrics_snapshot', snapshot, 60);
  }

  var system =
    'You are F.R.I.D.A.Y., the mission control assistant for UniBridge NL, a service that helps ' +
    'international students get into Dutch universities and settle in the Netherlands: enrolment, ' +
    'housing, residence permit, BSN, bank account and arrival week.\n\n' +
    'You are speaking out loud through a voice synthesiser, so: reply in at most three short ' +
    'sentences, plain spoken prose only. No markdown, no bullet points, no lists, no emoji, no ' +
    'headings, no asterisks. Write numbers the way you would say them.\n\n' +
    'Your manner is calm, dry and precise, like a trusted chief of staff. Address the operator as ' +
    operator + ' only when it lands naturally, not every sentence.\n\n' +
    'Ground every figure in the dashboard data below. Never invent a number, a name or a date. If ' +
    'the answer is not in the data, say plainly that you do not have that reading, and say what you ' +
    'do have. If asked for judgement, give it briefly and say what it rests on.\n\n' +
    'Current dashboard data as JSON:\n' + snapshot;

  var messages = [];
  if (history && history.length) {
    for (var i = 0; i < history.length; i++) {
      var turn = history[i];
      if (!turn || !turn.role || !turn.text) continue;
      messages.push({ role: turn.role === 'assistant' ? 'assistant' : 'user', content: String(turn.text).slice(0, 1000) });
    }
  }
  messages.push({ role: 'user', content: text });

  try {
    var res = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      method: 'post',
      contentType: 'application/json',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      payload: JSON.stringify({
        model: props.getProperty('ANTHROPIC_MODEL') || 'claude-opus-5',
        max_tokens: 400,                       // she is speaking; long answers are a bug
        output_config: { effort: 'low' },      // a spoken reply wants speed, not deliberation
        system: system,
        messages: messages
      }),
      muteHttpExceptions: true
    });

    if (res.getResponseCode() !== 200)
      return { error: 'claude ' + res.getResponseCode() + ': ' + res.getContentText().slice(0, 300) };

    var data = JSON.parse(res.getContentText());

    // Safety classifiers can decline with HTTP 200 — check before reading content.
    if (data.stop_reason === 'refusal')
      return { reply: 'I cannot answer that one, ' + operator + '.' };

    var out = '';
    for (var j = 0; j < (data.content || []).length; j++) {
      if (data.content[j].type === 'text') out += data.content[j].text;
    }
    return { reply: out.trim() || 'I have nothing to add.', usage: data.usage };
  } catch (err) {
    return { error: 'chat failed: ' + err.message };
  }
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
  readGmail(props, out); readSheet(props, out); readCalendar(props, out); readStripe(props, out); derive(out);
  Logger.log(JSON.stringify(out, null, 2));
}
