const { Card, Button, Icon, Alert, Field, Input, Radio, Checkbox } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Magnetic } = window;

const WEB3FORMS_KEY = "a828545d-4f6f-4f85-8ddf-888a55281203";
const CHECKOUT_URL = "https://buy.stripe.com/3cI9ASgC7gGAcYMgcee3e00";
const PRICE = 19;

/* The exact wording the buyer agrees to. It is kept in one constant so the same
   sentence appears on the page, in the record that reaches our inbox, and in the
   confirmation email we send back. Article 6:230p sub g BW needs all three to
   match: the consent, the buyer's own declaration, and our confirmation of both
   on a durable medium. If you change a word here, change it in the email too. */
const DECLARATION = "I am asking UniBridge NL to email me the handbook straight away, before the 14 day cancellation period has run out. I understand that once the file has been sent I can no longer cancel this order and ask for my money back under consumer law.";

function ConfirmScreen({ go }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [timing, setTiming] = React.useState("Send it now");
  const [declared, setDeclared] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(false);

  const waiving = timing === "Send it now";
  const ready = name.trim() && email.includes("@") && (!waiving || declared) && !sending;

  const proceed = async () => {
    setSending(true);
    setError(false);
    const stamp = new Date().toISOString();
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Handbook consent record: ${name}`,
          from_name: "UniBridge NL consent record",
          email: email,
          message:
            `CONSENT RECORD for The Netherlands Student Handbook 2026/27, €${PRICE}.\n\n` +
            `Name: ${name}\nEmail: ${email}\nRecorded (UTC): ${stamp}\n` +
            `Delivery chosen: ${timing}\n\n` +
            (waiving
              ? `The buyer ticked a box under the heading "Send it now, and I give up my 14 day cancellation right", agreeing to this exact text:\n\n"${DECLARATION}"\n\n` +
                `NEXT STEP, REQUIRED: reply to this buyer with a confirmation email that repeats the sentence above word for word. Until that email is sent, the waiver is not valid and the cancellation right still runs.`
              : `The buyer did NOT waive the cancellation right. Hold delivery until 14 days after purchase, or until the buyer asks for it sooner in writing.`)
        })
      });
      const data = await res.json();
      if (!data.success) { setError(true); setSending(false); return; }
    } catch (e) { setError(true); setSending(false); return; }

    const url = CHECKOUT_URL + (CHECKOUT_URL.includes("?") ? "&" : "?") +
      "prefilled_email=" + encodeURIComponent(email);
    window.location.href = url;
  };

  return (
    <main style={{overflowX:'clip'}}>
      <PageHero overline="One step before payment" tone="ink"
        title="When would you like the file?"
        lead={`The Netherlands Student Handbook 2026/27, €${PRICE}. The law gives you 14 days to cancel a digital purchase. Because the file is sent immediately, you have to tell us which you would rather have.`}/>

      <section style={{maxWidth:'760px',margin:'0 auto',padding:'clamp(40px,6vw,72px) var(--gutter-inline) 0'}}>
        <Reveal>
          <Card padding="var(--space-7)">
            <div style={{display:'grid',gap:'var(--space-4)',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))'}}>
              <Field label="Your name" required>
                <Input value={name} onChange={e=>setName(e.target.value)} placeholder="The name that goes on your copy"/>
              </Field>
              <Field label="Email" required>
                <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Where the PDF is sent"/>
              </Field>
            </div>

            <div style={{marginTop:'var(--space-6)'}}>
              <Field label="Delivery" required>
                <Radio name="timing" value={timing} onChange={e=>setTiming(e.target.value)}
                  options={["Send it now", "Send it after the 14 days"]}/>
              </Field>
              <p style={{margin:'10px 0 0',fontSize:'var(--text-body-sm)',color:'var(--text-muted)',maxWidth:'62ch'}}>
                {waiving
                  ? "Most people choose this. You get the file within a few hours, and you give up the statutory right to cancel in exchange."
                  : "You keep the full 14 day cancellation right. We hold the file and send it on day 15, or sooner if you email and ask for it."}
              </p>
            </div>

            {waiving && (
              <div style={{marginTop:'var(--space-6)',padding:'var(--space-5)',background:'var(--surface-sunken)',borderRadius:'var(--radius-media)'}}>
                <Checkbox checked={declared} onChange={v=>setDeclared(v)}
                  label="Send it now, and I give up my 14 day cancellation right."
                  description={DECLARATION}/>
              </div>
            )}

            <div style={{marginTop:'var(--space-6)',paddingTop:'var(--space-5)',borderTop:'1px solid var(--border-hairline)',display:'flex',flexWrap:'wrap',gap:'var(--space-4)',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)',maxWidth:'44ch'}}>
                €{PRICE}, one off. We email you a confirmation of this choice, and then the file. Card and iDEAL are handled by Stripe, and we never see your card details.
              </span>
              <Magnetic strength={0.18}>
                <Button disabled={!ready} onClick={proceed} iconRight={<Icon name="arrow-right" size={16}/>}>
                  {sending ? "One moment…" : "Continue to payment"}
                </Button>
              </Magnetic>
            </div>

            {error && (
              <Alert tone="danger" title="That did not go through" style={{marginTop:'var(--space-5)'}}>
                We could not record your choice, so we have not sent you to payment. Try again, or WhatsApp us on 06 25 29 40 80 and we will sort it out by hand.
              </Alert>
            )}
          </Card>
        </Reveal>

        <Reveal delay={120}>
          <div style={{marginTop:'var(--space-6)',display:'flex',flexWrap:'wrap',gap:'var(--space-5)'}}>
            <a href="/guide/" style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>Back to the handbook page</a>
            <a href="/cancel/" style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>How to cancel an order</a>
            <a href="/terms/" style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>Terms of sale</a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
Object.assign(window, { ConfirmScreen });
