const { Card, Button, Field, Input, Select, Icon, Badge, Alert, Toast, Tag } = window.UnibridgeNLDesignSystem_3cb2d1;

const WEB3FORMS_KEY = "a828545d-4f6f-4f85-8ddf-888a55281203";

const DAYS = [
  { d:"Mon", n:"6 Oct", slots:["09:30","11:00","14:00"] },
  { d:"Tue", n:"7 Oct", slots:["10:00","13:30"] },
  { d:"Wed", n:"8 Oct", slots:["09:00","11:30","15:00","16:30"] },
  { d:"Thu", n:"9 Oct", slots:[] },
  { d:"Fri", n:"10 Oct", slots:["09:30","12:00","14:30"] }
];

function BookCallScreen({ go }) {
  const [day, setDay] = React.useState(0);
  const [slot, setSlot] = React.useState(null);
  const [booked, setBooked] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [language, setLanguage] = React.useState("English");
  const active = DAYS[day];

  const submitBooking = async () => {
    setSubmitting(true);
    setError(false);
    const message = `New call booking via unibridgenl.com

Name: ${name}
Email: ${email}
Language: ${language}
Requested slot: ${active.d} ${active.n}, ${slot} CET`;
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New call booking: ${name || "Website visitor"}`,
          from_name: name || "UniBridge NL website",
          email: email,
          message: message
        })
      });
      const data = await res.json();
      if (data.success) { setBooked(true); }
      else { setError(true); }
    } catch (e) {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (booked) {
    return (
      <main style={{maxWidth:720,margin:'0 auto',padding:'var(--space-16) var(--gutter-inline) 0'}}>
        <Card rule padding="var(--space-8)">
          <div className="ub-overline">Booked</div>
          <h1 style={{fontSize:'var(--text-h2)',margin:'var(--space-3) 0 var(--space-2)'}}>You're in for {active.d} {active.n}, {slot} CET</h1>
          <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)'}}>Harsh Raj has been notified and will send you a Google Meet invite by email shortly — add it to your calendar so the reminder reaches you.</p>
          <div style={{display:'flex',gap:'var(--space-3)'}}>
            <Button variant="secondary" onClick={()=>{setBooked(false);setSlot(null);}}>Pick another time</Button>
            <Button variant="ghost" onClick={()=>go('apply')}>Start my application instead</Button>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main style={{maxWidth:960,margin:'0 auto',padding:'var(--space-12) var(--gutter-inline) 0'}}>
      <div className="ub-overline">Free 15-minute call</div>
      <h1 style={{fontSize:'var(--text-h1)',margin:'var(--space-3) 0 var(--space-2)'}}>Book a time on Google Meet</h1>
      <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'56ch'}}>Fifteen minutes, straight to the point. Pick a slot and we'll send you a Google Meet link by email — no software to install, no payment, no obligation.</p>

      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:'var(--space-5)',marginTop:'var(--space-10)',alignItems:'start'}}>
        <Card padding="var(--space-6)">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'var(--space-5)'}}>
            <h3 style={{margin:0,fontSize:'var(--text-h4)'}}>October 2026 · week 41</h3>
            <span style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>Times shown in CET (Amsterdam)</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'var(--space-2)'}}>
            {DAYS.map((x,i)=>{
              const on = i===day, none = x.slots.length===0;
              return (
                <button key={x.n} disabled={none} onClick={()=>{setDay(i);setSlot(null);}} style={{
                  padding:'var(--space-4) 0',border:'1px solid '+(on?'var(--gold-500)':'var(--border-hairline)'),
                  borderRadius:'var(--radius-md)',cursor:none?'not-allowed':'pointer',
                  background:on?'var(--surface-accent-soft)':'var(--surface-card)',opacity:none?.45:1,
                  transition:'var(--transition-control)',fontFamily:'var(--font-sans)'}}>
                  <div style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>{x.d}</div>
                  <div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:19,color:'var(--text-heading)'}}>{x.n.split(' ')[0]}</div>
                  <div style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)'}}>{none?'full':x.slots.length+' slots'}</div>
                </button>
              );
            })}
          </div>
          <hr className="ub-rule" style={{margin:'var(--space-6) 0 var(--space-5)',width:56}}/>
          <div style={{display:'flex',gap:'var(--space-3)',flexWrap:'wrap'}}>
            {active.slots.map(t=>(
              <button key={t} onClick={()=>setSlot(t)} style={{
                height:'var(--field-height)',padding:'0 22px',cursor:'pointer',
                border:'1px solid '+(slot===t?'var(--gold-500)':'var(--border-default)'),
                background:slot===t?'var(--gold-500)':'var(--surface-card)',
                color:slot===t?'var(--text-on-accent)':'var(--text-heading)',
                borderRadius:'var(--radius-control)',font:'600 16px var(--font-sans)',
                transition:'var(--transition-control)'}}>{t}</button>
            ))}
          </div>
        </Card>

        <div style={{display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
          <Card>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:'var(--space-5)'}}>
              <div style={{width:40,height:40,borderRadius:999,background:'var(--gold-500)',color:'var(--cream-100)',display:'flex',alignItems:'center',justifyContent:'center',font:'700 15px var(--font-sans)'}}>H</div>
              <div>
                <div style={{fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>Harsh Raj</div>
                <div style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>Advisor · Amsterdam</div>
              </div>
            </div>
            <Field label="Your name" required style={{marginBottom:'var(--space-4)'}}><Input placeholder="Your full name" value={name} onChange={e=>setName(e.target.value)}/></Field>
            <Field label="Email" required hint="The Google Meet invite goes here." style={{marginBottom:'var(--space-4)'}}><Input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></Field>
            <Field label="Language" style={{marginBottom:'var(--space-5)'}}><Select value={language} onChange={e=>setLanguage(e.target.value)} options={["English","Nederlands","Hindi","Tamil","Telugu"]}/></Field>
            <Button full disabled={!slot || !name || !email.includes('@') || submitting} onClick={submitBooking} iconLeft={<Icon name="video" size={17}/>}>
              {submitting ? "Booking…" : (slot ? `Book ${active.d} ${slot}` : 'Pick a time first')}
            </Button>
            {error && <Alert tone="warning" title="Booking didn't go through" style={{marginTop:'var(--space-4)'}}>Please try again, or WhatsApp us at 06 25 29 40 80.</Alert>}
            <div style={{display:'flex',alignItems:'center',gap:8,marginTop:'var(--space-4)',fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>
              <Icon name="message-circle" size={14} color="var(--moss-500)"/>Prefer WhatsApp? 06 25 29 40 80
            </div>
          </Card>
          <Card tone="sunken" elevation="none">
            <h4 style={{margin:'0 0 var(--space-3)'}}>What we'll cover</h4>
            <div style={{display:'flex',flexDirection:'column',gap:10,fontSize:'var(--text-body-sm)',color:'var(--text-body)'}}>
              {["Which universities your grades actually clear","Real costs: tuition, rent, proof of funds","How housing works through our partner agency","Dates you cannot miss for your intake"].map(x=>(
                <div key={x} style={{display:'flex',gap:10}}><Icon name="check" size={16} color="var(--moss-500)"/>{x}</div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
Object.assign(window, { BookCallScreen });
