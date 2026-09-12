const { Card, Button, Icon, Badge, Alert, Field, Input, Select, Checkbox, Toast, Tag } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Rise, Tilt, Stagger, Magnetic, MoneyCounter, HandbookCover } = window;

const WEB3FORMS_KEY = "a828545d-4f6f-4f85-8ddf-888a55281203";

/* Stripe payment link for the handbook. Paste the URL from the Stripe dashboard
   (Payment links > the €15 handbook link, it looks like https://buy.stripe.com/...).
   While this is empty the buy button opens the order form below instead, and we
   send a payment link by hand. */
const CHECKOUT_URL = "";

const PRICE = 15;

const PARTS = [
  ["Before you fly", "plane-takeoff", [
    "The twelve weeks before you land, week by week",
    "Your document pack, and getting it legalised or apostilled",
    "The money you have to prove, and every fee you will pay"
  ]],
  ["Landing", "map-pin", [
    "Your first two weeks, in the order that actually works",
    "Housing, rent law and how not to be robbed",
    "Registering with your council, and your BSN",
    "Collecting your residence permit",
    "DigiD, the key to every official website"
  ]],
  ["Running your life here", "house", [
    "Banking, iDEAL and paying the Dutch way",
    "Health insurance, and the trap nobody warns you about",
    "The huisarts, the pharmacy and what to do at 2am",
    "Phone and internet",
    "Getting around: OVpay, trains and a bike",
    "Working while you study, and what it changes",
    "Money you can claim back",
    "The Dutch admin year, and habits worth copying"
  ]],
  ["Appendices", "clipboard-list", [
    "The master checklist, made to print and tick",
    "A tenant introduction letter, ready to copy",
    "Five messages worth sending, written for you",
    "Numbers, links and offices",
    "Glossary of the Dutch words on your letters"
  ]]
];

const HIGHLIGHTS = [
  ["file-text", "61 pages", "Written for the 2026/27 intake"],
  ["shield-check", "Checked in September 2026", "Against official Dutch sources"],
  ["download", "Instant PDF", "Phone, tablet or printed"],
  ["refresh-cw", "Free update", "When the January figures change"]
];

const PROOF = [
  ["The rent you are allowed to be charged", "Every room in the Netherlands is rent regulated, whatever your contract says. We show you how to check your score and what to write if it is too high. On an all-in rent of €1,550, the official split formula alone stops €310 a month being owed."],
  ["The health insurance trap", "The rules do not depend on your nationality. They depend on whether you work. Get it wrong and it is a fine of about €530, twice, plus every medical bill."],
  ["The transport myth", "Most non-EU students will never get the student travel product, no matter what a forum told you. We say so plainly, and show you the €6.35 subscription that is worth it instead."],
  ["The registration you cannot be refused", "A landlord's objection is not a legal ground to keep you off the register. We give you the rule, and the message to send."]
];

const FAQ = [
  ["How do I get it?", "As a PDF, by email. If you pay by card or iDEAL the file arrives immediately. If you order through the form on this page, we send you a payment link and the file follows as soon as it clears, usually within a few hours."],
  ["Is it for EU students too?", "Yes. Roughly two thirds applies to everybody, and where the rules split between EU and non-EU, both answers are on the page. Nothing is written as though everyone came from the same place."],
  ["Will it go out of date?", "Most Dutch amounts are re-indexed on 1 January. Every figure in the handbook is dated and labelled, and we tell you where the live number lives. Buy it now and you get the January refresh free, at the same email address."],
  ["Is this the same as your services?", "No. The handbook is everything we know, written down, so you can do it yourself. Our plans are for students who would rather somebody else did it. If you buy the handbook and later book a plan, tell us and we will take the €15 off."],
  ["Can I share it with a friend?", "It is licensed for the student who bought it. We keep the price at €15, VAT included, precisely so that nobody has to share."],
  ["What if I am not happy with it?", "Reply to the email within 14 days and tell us why. We will refund you and you keep the file."]
];

function GuideScreen({ go }) {
  const [sent, setSent] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [city, setCity] = React.useState("Not decided yet");
  const [waiver, setWaiver] = React.useState(false);

  const orderRef = React.useRef(null);
  const buy = () => {
    if (CHECKOUT_URL) { window.open(CHECKOUT_URL, "_blank"); return; }
    if (orderRef.current) orderRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = async () => {
    setSending(true);
    setError(false);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Handbook order (€${PRICE}): ${name || "Website visitor"}`,
          from_name: name || "UniBridge NL website",
          email: email,
          message: `New order for The Netherlands Student Handbook 2026/27 via unibridgenl.com\n\nName: ${name}\nEmail: ${email}\nCity or university: ${city}\nPrice: €${PRICE} including VAT\nAgreed to immediate delivery: ${waiver ? "yes" : "no"}\n\nSend the payment link, then the PDF once it clears.`
        })
      });
      const data = await res.json();
      if (data.success) { setSent(true); setToast(true); } else { setError(true); }
    } catch (e) { setError(true); }
    finally { setSending(false); }
  };

  const canOrder = name && email.includes("@") && waiver && !sending;

  return (
    <main style={{overflowX:'clip'}}>
      <PageHero overline="The handbook" tone="ink"
        title="Everything you have to arrange, in one file"
        lead="The Netherlands Student Handbook is the written version of what we walk students through every intake. Sixty-one pages, in the order things actually happen to you, for €15."
        meta={[["file-text","61 pages, 2026/27 edition"],["download","Instant PDF"],["shield-check","Checked against official sources"]].map(([i,t])=>(
          <span key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:'var(--text-body-sm)'}}><Icon name={i} size={16} color="var(--gold-300)"/>{t}</span>
        ))}/>

      {/* ---------- Offer ---------- */}
      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(40px,6vw,72px) var(--gutter-inline) 0'}}>
        <div style={{display:'flex',flexWrap:'wrap',gap:'clamp(24px,3.4vw,52px)',alignItems:'flex-start'}}>

          <Reveal y={24} style={{order:2,flex:'1 1 min(100%,280px)',minWidth:0}}>
            <Tilt max={4}>
              <HandbookCover/>
            </Tilt>
            <div style={{textAlign:'center',fontSize:'var(--text-caption)',color:'var(--text-subtle)',marginTop:12}}>61 pages, A4, made to read on a phone or printed</div>
          </Reveal>

          <Reveal delay={120} y={24} style={{order:1,flex:'1.35 1 min(100%,360px)',minWidth:0}}>
            <Card elevation="lg" padding="var(--space-8)" style={{border:'1px solid var(--gold-500)'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                <span className="ub-overline">2026/27 edition</span>
                <Badge tone="accent">New</Badge>
              </div>
              <h2 style={{fontSize:'clamp(24px,2.6vw,34px)',letterSpacing:'-.02em',margin:'var(--space-3) 0 var(--space-2)'}}>The Netherlands Student Handbook</h2>
              <p style={{color:'var(--text-muted)',margin:'0 0 var(--space-5)'}}>Residence permit, BSN, DigiD, housing, banking, insurance, huisarts, SIM card, transport, working and money. Sixteen chapters and five appendices you will actually use.</p>

              <div style={{display:'flex',alignItems:'baseline',gap:10}}>
                <span style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:52,lineHeight:1,color:'var(--text-heading)'}}><MoneyCounter to={PRICE}/></span>
                <span style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>one-off, including VAT</span>
              </div>

              <hr className="ub-rule" style={{margin:'var(--space-5) 0'}}/>

              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {[
                  "61 pages, written for the 2026/27 intake",
                  "Every figure checked against official Dutch sources",
                  "A master checklist made to print and tick",
                  "A tenant introduction letter and five messages to copy",
                  "Glossary of the Dutch words on your official post",
                  "Free update when the January figures change"
                ].map(t=>(
                  <div key={t} style={{display:'flex',gap:10,fontSize:'var(--text-body-sm)',color:'var(--text-body)'}}>
                    <Icon name="check" size={16} color="var(--moss-500)" style={{marginTop:2,flex:'0 0 auto'}}/>{t}
                  </div>
                ))}
              </div>

              <div style={{marginTop:'var(--space-6)'}}>
                <Magnetic strength={0.16}><Button full size="lg" onClick={buy} iconRight={<Icon name="arrow-right" size={17}/>}>Get the handbook for €{PRICE}</Button></Magnetic>
              </div>
              <div style={{textAlign:'center',fontSize:'var(--text-caption)',color:'var(--text-subtle)',marginTop:10}}>Price includes VAT · PDF by email · 14 day refund if it does not help</div>
            </Card>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'var(--space-3)',marginTop:'var(--space-5)'}}>
              {HIGHLIGHTS.map(([ic,t,d],n)=>(
                <Reveal key={t} delay={200+n*70} y={16}>
                  <Card tone="sunken" elevation="none" padding="var(--space-5)" style={{height:'100%'}}>
                    <Icon name={ic} size={18} color="var(--gold-700)"/>
                    <div style={{fontWeight:700,fontSize:'var(--text-body-sm)',color:'var(--text-heading)',marginTop:8}}>{t}</div>
                    <div style={{fontSize:'var(--text-caption)',color:'var(--text-muted)',marginTop:2,lineHeight:1.5}}>{d}</div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- What is inside ---------- */}
      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(48px,7vw,96px) var(--gutter-inline) 0'}}>
        <Reveal>
          <div className="ub-overline">What is inside</div>
          <hr className="ub-rule" style={{width:56,margin:'12px 0 16px'}}/>
          <h2 style={{fontSize:'clamp(26px,3.2vw,42px)',letterSpacing:'-.02em',maxWidth:'22ch'}}>Sixteen chapters, in the order things happen</h2>
          <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'62ch'}}>You do not read it front to back. You open it at the week you are in.</p>
        </Reveal>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'var(--space-5)',marginTop:'var(--space-8)'}}>
          {PARTS.map(([title,icon,items],pi)=>(
            <Reveal key={title} delay={pi*100} y={22}>
              <Card padding="var(--space-6)" style={{height:'100%'}}>
                <span style={{width:40,height:40,borderRadius:'var(--radius-md)',background:'var(--surface-accent-soft)',color:'var(--gold-700)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name={icon} size={20}/></span>
                <h3 style={{margin:'var(--space-4) 0 var(--space-3)',fontSize:'var(--text-h4)'}}>{title}</h3>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {items.map(t=>(
                    <div key={t} style={{display:'flex',gap:9,fontSize:'var(--text-body-sm)',color:'var(--text-body)',lineHeight:1.5}}>
                      <Icon name="chevron-right" size={15} color="var(--gold-500)" style={{marginTop:3,flex:'0 0 auto'}}/>{t}
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- A look inside ---------- */}
      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(48px,7vw,96px) var(--gutter-inline) 0'}}>
        <Reveal>
          <div className="ub-overline">A look inside</div>
          <hr className="ub-rule" style={{width:56,margin:'12px 0 16px'}}/>
          <h2 style={{fontSize:'clamp(26px,3.2vw,42px)',letterSpacing:'-.02em',maxWidth:'22ch'}}>Three paragraphs, straight from the file</h2>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))',gap:'var(--space-5)',marginTop:'var(--space-8)'}}>
          {[
            ["clay","When the landlord says you cannot register","Registration is a legal duty, not a favour. The law requires the council to register anyone lawfully residing here for four months or more, and a council may refuse on only three grounds: fraud, a confirmed residence abroad of more than eight months a year, or a lack of lawful residence status. A landlord's objection is not one of them."],
            ["gold","If your rent is quoted as one all-in figure","When the Huurcommissie splits an all-in rent it applies a fixed formula: 55 percent becomes the bare rent, 25 percent becomes a service charge advance, and 20 percent is simply cancelled. On €1,550 that is €310 a month that stops being owed at all."],
            ["moss","The number that changes the maths","People tell each other that a side job costs you €157 a month in newly compulsory insurance. That is half the sum. Once you hold Dutch basic insurance you can claim healthcare allowance, so the net cost is nearer €15 to €30 a month. Do not turn down work because of the gross number."]
          ].map(([tone,title,body],n)=>{
            const c = tone === "clay" ? ["var(--clay-100)","var(--clay-500)","var(--clay-700)"]
                    : tone === "gold" ? ["var(--gold-100)","var(--gold-500)","var(--gold-700)"]
                    : ["var(--moss-100)","var(--moss-500)","var(--moss-700)"];
            return (
              <Reveal key={title} delay={n*90} y={22}>
                <div style={{height:'100%',background:c[0],borderLeft:`3px solid ${c[1]}`,borderRadius:'var(--radius-md)',padding:'var(--space-6)'}}>
                  <div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:'var(--text-body-lg)',color:c[2],marginBottom:8}}>{title}</div>
                  <p style={{margin:0,fontSize:'var(--text-body-sm)',lineHeight:1.65,color:'var(--text-body)'}}>{body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={260}>
          <p style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)',marginTop:'var(--space-5)'}}>Every figure in the handbook is dated, sourced from the responsible Dutch authority, and labelled where it changes on 1 January.</p>
        </Reveal>
      </section>

      {/* ---------- Why it is worth more than €15 ---------- */}
      <section style={{background:'var(--surface-page)',marginTop:'clamp(48px,7vw,96px)',padding:'clamp(48px,7vw,96px) 0'}}>
        <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'0 var(--gutter-inline)'}}>
          <Reveal>
            <div className="ub-overline">Four things most students find out too late</div>
            <hr className="ub-rule" style={{width:56,margin:'12px 0 16px'}}/>
            <h2 style={{fontSize:'clamp(26px,3.2vw,42px)',letterSpacing:'-.02em',maxWidth:'24ch'}}>Each of these costs more than the handbook</h2>
          </Reveal>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'var(--space-5)',marginTop:'var(--space-8)'}}>
            {PROOF.map(([t,d],n)=>(
              <Reveal key={t} delay={n*90} y={22}>
                <Card padding="var(--space-6)" style={{height:'100%'}}>
                  <h4 style={{margin:'0 0 8px'}}>{t}</h4>
                  <p style={{margin:0,color:'var(--text-muted)',fontSize:'var(--text-body-sm)',lineHeight:1.65}}>{d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <Alert tone="info" title="Honest about what it is not" style={{marginTop:'var(--space-6)'}}>
              This is a handbook, not a service. It will not apply to a university for you, find you a room, or sit on hold with the IND. If that is what you need, our plans start with a free 15 minute call and the €15 comes off.
            </Alert>
          </Reveal>
        </div>
      </section>

      {/* ---------- Order ---------- */}
      <section ref={orderRef} style={{scrollMarginTop:88,maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(48px,7vw,96px) var(--gutter-inline) 0',display:'flex',flexWrap:'wrap',gap:'clamp(24px,3vw,48px)',alignItems:'flex-start'}}>
        <Reveal y={22} style={{flex:'2 1 min(100%,380px)',minWidth:0}}>
          <Card padding="var(--space-8)">
            <div className="ub-overline">Order</div>
            <h2 style={{fontSize:'clamp(22px,2.4vw,30px)',letterSpacing:'-.02em',margin:'10px 0 var(--space-2)'}}>Get the handbook for €{PRICE}</h2>
            <p style={{color:'var(--text-muted)',fontSize:'var(--text-body-sm)',marginBottom:'var(--space-6)'}}>Tell us where to send it. You will get a payment link, and the PDF lands in the same inbox as soon as it clears.</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'var(--space-5)'}}>
              <Field label="Your name" required><Input placeholder="First and last name" value={name} onChange={e=>setName(e.target.value)}/></Field>
              <Field label="Email" required hint="The PDF goes here, so check the spelling."><Input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></Field>
              <Field label="Where are you heading" style={{gridColumn:'1 / -1'}}>
                <Select value={city} onChange={e=>setCity(e.target.value)} options={["Not decided yet","Amsterdam","Rotterdam","Utrecht","The Hague","Groningen","Eindhoven","Maastricht","Leiden","Delft","Tilburg","Nijmegen","Somewhere else"]}/>
              </Field>
            </div>
            <div style={{marginTop:'var(--space-5)'}}>
              <Checkbox checked={waiver} onChange={v=>setWaiver(v)}
                label="Send the file straight away"
                description="You agree that, once the PDF is sent, the 14 day statutory withdrawal right for digital downloads no longer applies. We will still refund you within 14 days if the handbook does not help."/>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-4)',alignItems:'center',justifyContent:'space-between',marginTop:'var(--space-6)',borderTop:'1px solid var(--border-hairline)',paddingTop:'var(--space-5)'}}>
              <span style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)'}}>€{PRICE} including VAT, one-off. No account, no subscription.</span>
              <Magnetic strength={0.18}><Button disabled={!canOrder} onClick={submit} iconRight={<Icon name="arrow-right" size={16}/>}>{sending ? "Sending…" : "Order the handbook"}</Button></Magnetic>
            </div>
            {sent && <Alert tone="success" title="Order received" style={{marginTop:'var(--space-5)'}}>Check your inbox. The payment link is on its way, and the PDF follows as soon as it clears. Your order is The Netherlands Student Handbook 2026/27 at €{PRICE} including VAT, delivered straight away, which is why the 14 day withdrawal right no longer applies. If nothing arrives within a few hours, WhatsApp us on 06 25 29 40 80.</Alert>}
            {error && <Alert tone="warning" title="That did not send" style={{marginTop:'var(--space-5)'}}>Please try again, or WhatsApp us on 06 25 29 40 80 and we will sort it out by hand.</Alert>}
          </Card>
        </Reveal>

        <div style={{flex:'1 1 260px',minWidth:0,display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
          <Reveal delay={120} y={22}>
            <Card tone="sunken" elevation="none" padding="var(--space-6)">
              <div className="ub-overline">Common questions</div>
              <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)',marginTop:'var(--space-4)'}}>
                {FAQ.map(([q,a])=>(
                  <div key={q}>
                    <div style={{fontWeight:700,fontSize:'var(--text-body-sm)',color:'var(--text-heading)'}}>{q}</div>
                    <p style={{margin:'4px 0 0',fontSize:'var(--text-body-sm)',color:'var(--text-muted)',lineHeight:1.6}}>{a}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
          <Reveal delay={200} y={22}>
            <Card padding="var(--space-6)">
              <div className="ub-overline">Rather have a person</div>
              <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)',marginTop:'var(--space-4)'}}>
                <Button variant="secondary" full onClick={()=>go('call')} iconLeft={<Icon name="video" size={16}/>}>Book a free 15-min call</Button>
                <Button variant="secondary" full onClick={()=>go('services')} iconLeft={<Icon name="file-text" size={16}/>}>See plans & pricing</Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ---------- Closing ---------- */}
      <div style={{maxWidth:'var(--content-max)',margin:'var(--section-y) auto 0',padding:'0 var(--gutter-inline)'}}>
        <Reveal>
          <Card tone="ink" padding="clamp(32px,5vw,56px)" style={{position:'relative',overflow:'hidden',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'var(--space-10)',alignItems:'center',borderRadius:'var(--radius-2xl)'}}>
            <div className="ub-aurora" aria-hidden="true" style={{position:'absolute',inset:'-40%',opacity:.55,pointerEvents:'none'}}/>
            <div style={{position:'relative'}}>
              <h2 style={{color:'var(--cream-200)',fontSize:'var(--text-h2)',maxWidth:'22ch'}}>Fifteen euro, and the next three months make sense</h2>
              <p style={{color:'var(--ink-100)',fontSize:'var(--text-body-lg)',margin:0,maxWidth:'50ch'}}>One file, sixty-one pages, written in Amsterdam by people who do this every intake.</p>
            </div>
            <div style={{position:'relative',display:'flex',flexDirection:'column',gap:'var(--space-3)',alignItems:'flex-start'}}>
              <Magnetic><Button size="lg" onClick={buy} iconLeft={<Icon name="download" size={17}/>}>Get the handbook for €{PRICE}</Button></Magnetic>
              <Button size="lg" variant="ghost" style={{color:'var(--cream-200)'}} onClick={()=>go('services')}>Or see the full service plans</Button>
            </div>
          </Card>
        </Reveal>
      </div>

      {toast && <div style={{position:'fixed',right:24,bottom:24,zIndex:50}}><Toast tone="success" title="Order received" message="Check your inbox for the payment link." onClose={()=>setToast(false)}/></div>}
    </main>
  );
}
Object.assign(window, { GuideScreen });
