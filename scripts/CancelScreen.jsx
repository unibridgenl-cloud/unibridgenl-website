const { Card, Button, Icon, Alert, Field, Input, Select, Textarea, Toast } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Magnetic } = window;

const WEB3FORMS_KEY = "a828545d-4f6f-4f85-8ddf-888a55281203";

/* The online cancellation function required by artikel 6:230oa BW since 25 June 2026.
   It has to be clearly visible and labelled, take the buyer's name, order reference
   and contact details, have its own submit button, be reachable throughout the
   cancellation period, and confirm receipt on a durable medium stating the content,
   the date and the time. The confirmation email is what discharges that last part,
   so do not remove it from the flow. */

function CancelScreen({ go }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [ref, setRef] = React.useState("");
  const [what, setWhat] = React.useState("The Netherlands Student Handbook (€19)");
  const [ordered, setOrdered] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [error, setError] = React.useState(false);

  const ready = name.trim() && email.includes("@") && !sending;

  const submit = async () => {
    setSending(true);
    setError(false);
    const stamp = new Date().toISOString();
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `CANCELLATION received: ${name}`,
          from_name: "UniBridge NL cancellation function",
          email: email,
          message:
            `A buyer has cancelled using the online cancellation function.\n\n` +
            `Received (UTC): ${stamp}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "not given"}\n` +
            `Order reference: ${ref || "not given"}\nWhat is being cancelled: ${what}\n` +
            `Ordered or received on: ${ordered || "not given"}\n` +
            `Reason, if the buyer chose to give one: ${reason || "none given, and none is required"}\n\n` +
            `REQUIRED, TODAY: send this buyer a confirmation of receipt on a durable medium stating the content of this cancellation, the date and the time above. ` +
            `Then refund in full, by the same payment method, within 14 days. No reason is needed and none may be demanded.`
        })
      });
      const data = await res.json();
      if (data.success) { setSent(true); setToast(true); } else { setError(true); }
    } catch (e) { setError(true); }
    finally { setSending(false); }
  };

  return (
    <main style={{overflowX:'clip'}}>
      <PageHero overline="Cancelling an order" tone="ink"
        title="Cancel an order"
        lead="You do not have to give a reason, and we will not ask you for one. Fill this in and we will confirm it the same day and refund you in full within 14 days, by the same method you paid with."/>

      <section style={{maxWidth:'760px',margin:'0 auto',padding:'clamp(40px,6vw,72px) var(--gutter-inline) 0'}}>
        <Reveal>
          <Card padding="var(--space-7)">
            <h2 style={{margin:'0 0 var(--space-3)',fontSize:'var(--text-h4)'}}>Cancellation form</h2>
            <p style={{margin:'0 0 var(--space-6)',fontSize:'var(--text-body-sm)',color:'var(--text-muted)',maxWidth:'62ch'}}>
              Only your name and email are required. Everything else just helps us find your order faster.
            </p>

            <div style={{display:'grid',gap:'var(--space-4)',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))'}}>
              <Field label="Your name" required>
                <Input value={name} onChange={e=>setName(e.target.value)}/>
              </Field>
              <Field label="Email you ordered with" required>
                <Input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
              </Field>
              <Field label="Phone or WhatsApp">
                <Input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Optional"/>
              </Field>
              <Field label="Order reference">
                <Input value={ref} onChange={e=>setRef(e.target.value)} placeholder="On your receipt, optional"/>
              </Field>
              <Field label="What are you cancelling">
                <Select value={what} onChange={e=>setWhat(e.target.value)}
                  options={["The Netherlands Student Handbook (€19)","Bridge Admissions","Bridge Full","Bridge Settled","An add-on","Something else"]}/>
              </Field>
              <Field label="Ordered or received on">
                <Input value={ordered} onChange={e=>setOrdered(e.target.value)} placeholder="A rough date is fine"/>
              </Field>
            </div>

            <div style={{marginTop:'var(--space-4)'}}>
              <Field label="Anything you want us to know">
                <Textarea rows={3} value={reason} onChange={e=>setReason(e.target.value)}
                  placeholder="Entirely optional. You do not need a reason to cancel."/>
              </Field>
            </div>

            <div style={{marginTop:'var(--space-6)',paddingTop:'var(--space-5)',borderTop:'1px solid var(--border-hairline)',display:'flex',flexWrap:'wrap',gap:'var(--space-4)',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)',maxWidth:'46ch'}}>
                We confirm receipt in writing the same day, with the date and time we received it.
              </span>
              <Magnetic strength={0.18}>
                <Button disabled={!ready} onClick={submit} iconRight={<Icon name="arrow-right" size={16}/>}>
                  {sending ? "Sending…" : "Cancel my order"}
                </Button>
              </Magnetic>
            </div>

            {sent && (
              <Alert tone="success" title="Cancellation received" style={{marginTop:'var(--space-5)'}}>
                It is with us. You will get written confirmation today with the date and time we received it, and your refund within 14 days by the method you paid with. If you do not hear from us within a day, WhatsApp 06 25 29 40 80.
              </Alert>
            )}
            {error && (
              <Alert tone="danger" title="That did not send" style={{marginTop:'var(--space-5)'}}>
                Your cancellation did not reach us. Please email unibridgenl@gmail.com with your name and order reference, or WhatsApp 06 25 29 40 80. A cancellation sent any way you like is valid, this form is only the convenient route.
              </Alert>
            )}
          </Card>
        </Reveal>

        <Reveal delay={120}>
          <Card padding="var(--space-7)" tone="sunken" elevation="none" style={{marginTop:'var(--space-6)'}}>
            <h2 style={{margin:'0 0 var(--space-3)',fontSize:'var(--text-h4)'}}>Your right to cancel, in plain words</h2>
            <ul style={{margin:'0 0 var(--space-5)',paddingLeft:20,color:'var(--text-body)',fontSize:'var(--text-body-sm)',lineHeight:1.7,maxWidth:'66ch'}}>
              <li>You have 14 days to cancel, counted from the day the contract is made for a service, or from the day you receive the goods.</li>
              <li>You do not need a reason, and we may not ask for one or charge you for cancelling.</li>
              <li>We refund everything you paid within 14 days of being told, using the same payment method.</li>
              <li>For the handbook there is one exception, and only if you chose it yourself at checkout: if you asked us to send the file straight away and declared that you were giving up the right, the right ends once the file has been sent. If you did not tick that, the full 14 days still apply.</li>
              <li>If you booked a plan and asked us to start work inside the 14 days, and you then cancel, you pay only for the part we had already done.</li>
            </ul>

            <h3 style={{margin:'0 0 var(--space-3)',fontSize:'var(--text-body-lg)'}}>Model cancellation form</h3>
            <p style={{margin:'0 0 var(--space-4)',fontSize:'var(--text-body-sm)',color:'var(--text-muted)',maxWidth:'62ch'}}>
              You are not obliged to use this. The form above does the same job. It is here because the law says it has to be available to you.
            </p>
            <pre style={{margin:0,padding:'var(--space-5)',background:'var(--surface-card)',border:'1px solid var(--border-hairline)',borderRadius:'var(--radius-media)',overflowX:'auto',whiteSpace:'pre-wrap',fontSize:'13px',lineHeight:1.7,color:'var(--text-body)'}}>
{`To: UniBridge NL, Amsterdam, the Netherlands
Email: unibridgenl@gmail.com

I hereby give notice that I withdraw from my contract of sale of
the following goods / for the provision of the following service:

  .............................................................

Ordered on / received on: ....................................

Name of consumer: ............................................

Address of consumer: .........................................

Signature of consumer (only if this form is sent on paper):

  .............................................................

Date: ........................................................`}
            </pre>
          </Card>
        </Reveal>
      </section>

      {toast && <Toast tone="success" onClose={()=>setToast(false)}>Cancellation received</Toast>}
    </main>
  );
}
Object.assign(window, { CancelScreen });
