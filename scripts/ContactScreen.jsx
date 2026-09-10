const { Card, Button, Icon, Badge, Field, Input, Textarea, Select, Toast, Alert } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Rise, Tilt, Stagger, Magnetic } = window;

const CHANNELS = [
  ["message-circle","WhatsApp","06 25 29 40 80","Fastest. Usually answered same day, 09:00 to 20:00 CET.","https://wa.me/31625294080","Open WhatsApp"],
  ["mail","Email","unibridgenl@gmail.com","Best for documents and long questions. Answered within one working day.","mailto:unibridgenl@gmail.com","Send an email"],
  ["video","Google Meet","Free 15 minutes","Pick a slot and get a link by email straight away.",null,"Book a call"]
];

const WEB3FORMS_KEY = "a828545d-4f6f-4f85-8ddf-888a55281203";

function ContactScreen({ go }) {
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [topic, setTopic] = React.useState("Choosing universities");
  const [message, setMessage] = React.useState("");

  const submit = async () => {
    setSending(true);
    setError(false);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New contact message: ${name || "Website visitor"}`,
          from_name: name || "UniBridge NL website",
          email: email,
          message: `New contact form message via unibridgenl.com\n\nName: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp || "Not provided"}\nTopic: ${topic}\n\nMessage:\n${message}`
        })
      });
      const data = await res.json();
      if (data.success) { setSent(true); } else { setError(true); }
    } catch (e) { setError(true); }
    finally { setSending(false); }
  };
  return (
    <main style={{overflowX:'clip'}}>
      <PageHero overline="Contact" tone="ink"
        title="Talk to a person, not a form robot"
        lead="One advisor handles your case from the first question to your first lecture. Reach us however you prefer, and WhatsApp is the quickest."
        meta={[["clock","Mon to Fri, 09:00 to 20:00 CET"],["languages","English, Dutch, Hindi, Tamil, Telugu"],["map-pin","Amsterdam"]].map(([i,t])=>(
          <span key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:'var(--text-body-sm)'}}><Icon name={i} size={16} color="var(--gold-300)"/>{t}</span>
        ))}/>

      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(40px,6vw,80px) var(--gutter-inline) 0'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'var(--space-5)'}}>
          {CHANNELS.map(([ic,t,v,d,href,cta],n)=>(
            <Reveal key={t} delay={n*110}>
              <Tilt max={3.5}>
                <Card padding="var(--space-6)" style={{height:'100%',display:'flex',flexDirection:'column'}}>
                  <span style={{display:'inline-flex',width:46,height:46,borderRadius:'var(--radius-md)',alignItems:'center',justifyContent:'center',background:'var(--surface-accent-soft)',color:'var(--gold-700)',animation:'ub-float 6s var(--ease-standard) infinite'}}><Icon name={ic} size={22}/></span>
                  <h3 style={{margin:'var(--space-5) 0 4px',fontSize:'var(--text-h4)'}}>{t}</h3>
                  <div style={{fontSize:'var(--text-body-lg)',color:'var(--gold-700)',marginBottom:'var(--space-3)'}}>{v}</div>
                  <p style={{margin:'0 0 var(--space-5)',color:'var(--text-muted)',fontSize:'var(--text-body-sm)',lineHeight:1.6}}>{d}</p>
                  <div style={{marginTop:'auto'}}>
                    {href
                      ? <Button variant="secondary" onClick={()=>window.open(href,'_blank')}>{cta}</Button>
                      : <Magnetic strength={0.16}><Button onClick={()=>go('call')}>{cta}</Button></Magnetic>}
                  </div>
                </Card>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(40px,6vw,80px) var(--gutter-inline) 0',display:'flex',flexWrap:'wrap',alignItems:'flex-start',gap:'clamp(24px,3vw,48px)'}}>
        <Reveal y={22} style={{flex:'3 1 min(100%,420px)',minWidth:0}}>
          <Card padding="var(--space-8)">
            <div className="ub-overline">Send a message</div>
            <h2 style={{fontSize:'clamp(22px,2.4vw,30px)',letterSpacing:'-.02em',margin:'10px 0 var(--space-6)'}}>Tell us where you are in the process</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'var(--space-5)'}}>
              <Field label="Your name" required><Input placeholder="First and last name" value={name} onChange={e=>setName(e.target.value)}/></Field>
              <Field label="Email" required hint="We reply here, so check your spam folder once."><Input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></Field>
              <Field label="WhatsApp number"><Input type="tel" placeholder="+31 …" value={whatsapp} onChange={e=>setWhatsapp(e.target.value)}/></Field>
              <Field label="What's this about" required><Select value={topic} onChange={e=>setTopic(e.target.value)} options={["Choosing universities","Application & documents","Housing","Visa, BSN & insurance","Pricing","Something else"]}/></Field>
              <Field label="Your message" required style={{gridColumn:'1 / -1'}}><Textarea rows={4} placeholder="Where you are now, which intake you're aiming for, and what you'd like help with." value={message} onChange={e=>setMessage(e.target.value)}/></Field>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-4)',alignItems:'center',justifyContent:'space-between',marginTop:'var(--space-6)',borderTop:'1px solid var(--border-hairline)',paddingTop:'var(--space-5)'}}>
              <span style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)'}}>Answered within one working day</span>
              <Magnetic strength={0.18}><Button disabled={!name || !email.includes('@') || !message || sending} onClick={submit} iconRight={<Icon name="arrow-right" size={16}/>}>{sending ? "Sending…" : "Send message"}</Button></Magnetic>
            </div>
            {error && <Alert tone="warning" title="Something went wrong" style={{marginTop:'var(--space-5)'}}>Your message didn't send. Please try again, or WhatsApp us directly at 06 25 29 40 80.</Alert>}
          </Card>
        </Reveal>

        <div style={{flex:'1 1 260px',minWidth:0,display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
          <Reveal delay={120} y={22}>
            <Card tone="sunken" elevation="none" padding="var(--space-6)">
              <div className="ub-overline">The company</div>
              <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:'var(--space-4)',fontSize:'var(--text-body-sm)',color:'var(--text-body)'}}>
                <span style={{display:'flex',gap:10}}><Icon name="file-text" size={16} color="var(--moss-500)"/>UniBridge NL · KvK 42087386</span>
                <span style={{display:'flex',gap:10}}><Icon name="map-pin" size={16} color="var(--moss-500)"/>Amsterdam, the Netherlands</span>
                <span style={{display:'flex',gap:10}}><Icon name="shield-check" size={16} color="var(--moss-500)"/>No commission from universities or landlords</span>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={200} y={22}>
            <Card padding="var(--space-6)">
              <div className="ub-overline">Before you write</div>
              <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)',marginTop:'var(--space-4)'}}>
                <Button variant="secondary" full onClick={()=>go('quiz')} iconLeft={<Icon name="graduation-cap" size={16}/>}>Not sure what to study?</Button>
                <Button variant="secondary" full onClick={()=>go('services')} iconLeft={<Icon name="file-text" size={16}/>}>See plans & pricing</Button>
                <Button variant="ghost" full onClick={()=>go('privacy')}>How we handle your data</Button>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={280} y={22}>
            <Alert tone="info" title="Documents by email only">Please don't send passports or diplomas over WhatsApp. We'll ask for them in a private upload link.</Alert>
          </Reveal>
        </div>
      </section>

      {sent && <div style={{position:'fixed',right:24,bottom:24,zIndex:50}}><Toast tone="success" title="Message sent" message="We'll reply by email within one working day." onClose={()=>setSent(false)}/></div>}
    </main>
  );
}
Object.assign(window, { ContactScreen });
