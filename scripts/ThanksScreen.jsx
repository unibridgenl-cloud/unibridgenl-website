const { Card, Button, Icon, Badge, Alert } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Rise, Magnetic, HandbookCover } = window;

const PRICE = 19;
const WHATSAPP = "06 25 29 40 80";

const STEPS = [
  ["mail", "Your receipt is already in your inbox", "Stripe sends it the moment the payment clears. It arrives from UniBridge NL. If you cannot find it, look in spam before you worry."],
  ["file-check", "Your copy is prepared with your name on it", "Every copy carries the buyer's name and order number on each page. That is why it is not an instant download link. Yours is put together for you."],
  ["clock", "It lands within a few hours", "Usually much sooner. It goes to the same email address you paid with, so check the spelling on your receipt."]
];

function ThanksScreen({ go }) {
  return (
    <main style={{overflowX:'clip'}}>
      <PageHero overline="Order complete" tone="moss"
        title="Thank you. Your handbook is on its way."
        lead="Your payment has gone through and your copy of The Netherlands Student Handbook is being prepared now. Here is exactly what happens next, so you are not left guessing."
        meta={[["circle-check","Payment received"],["mail","Delivered by email"],["refresh-cw","Next edition free"]].map(([i,t])=>(
          <span key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:'var(--text-body-sm)'}}><Icon name={i} size={16} color="var(--moss-100)"/>{t}</span>
        ))}/>

      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(40px,6vw,72px) var(--gutter-inline) 0'}}>
        <div style={{display:'flex',flexWrap:'wrap',gap:'clamp(24px,3.4vw,52px)',alignItems:'flex-start'}}>

          <Reveal y={24} style={{order:2,flex:'1 1 min(100%,260px)',minWidth:0}}>
            <HandbookCover width={260}/>
            <div style={{textAlign:'center',fontSize:'var(--text-caption)',color:'var(--text-subtle)',marginTop:12}}>61 pages, A4, made to read on a phone or printed</div>
          </Reveal>

          <Reveal delay={120} y={24} style={{order:1,flex:'1.4 1 min(100%,360px)',minWidth:0}}>
            <div className="ub-overline">What happens next</div>
            <hr className="ub-rule" style={{width:56,margin:'12px 0 16px'}}/>
            <h2 style={{fontSize:'clamp(26px,3.2vw,38px)',letterSpacing:'-.02em',maxWidth:'20ch',margin:'0 0 var(--space-6)'}}>Three things, in this order</h2>

            <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
              {STEPS.map(([ic,t,d],n)=>(
                <Reveal key={t} delay={180+n*90} y={18}>
                  <Card padding="var(--space-6)">
                    <div style={{display:'flex',gap:'var(--space-4)',alignItems:'flex-start'}}>
                      <span style={{flex:'0 0 auto',width:42,height:42,borderRadius:'var(--radius-md)',background:'var(--surface-accent-soft)',color:'var(--gold-700)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name={ic} size={20}/></span>
                      <div style={{minWidth:0}}>
                        <div style={{fontWeight:700,fontSize:'var(--text-body)',color:'var(--text-heading)'}}>{t}</div>
                        <p style={{margin:'4px 0 0',fontSize:'var(--text-body-sm)',color:'var(--text-muted)',lineHeight:1.6}}>{d}</p>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>

            <Reveal delay={480}>
              <Alert tone="info" title="Nothing after a few hours?" style={{marginTop:'var(--space-5)'}}>
                Check your spam folder first, then WhatsApp us on {WHATSAPP} with the name you paid under. We will send it by hand straight away. You can also reply to your Stripe receipt.
              </Alert>
            </Reveal>
          </Reveal>
        </div>
      </section>

      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(48px,7vw,88px) var(--gutter-inline) 0'}}>
        <Reveal>
          <div className="ub-overline">Your order</div>
          <hr className="ub-rule" style={{width:56,margin:'12px 0 16px'}}/>
          <h2 style={{fontSize:'clamp(26px,3.2vw,38px)',letterSpacing:'-.02em',maxWidth:'22ch'}}>What is coming, and what it keeps giving</h2>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'var(--space-5)',marginTop:'var(--space-8)'}}>
          <Reveal y={20}>
            <Card tone="sunken" elevation="none" padding="var(--space-6)" style={{height:'100%'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                <span className="ub-overline">The file</span>
                <Badge tone="accent">2026/27</Badge>
              </div>
              <h3 style={{margin:'10px 0 6px',fontSize:'var(--text-h4)'}}>61 pages, one PDF</h3>
              <p style={{margin:0,fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>Sixteen chapters and five appendices: residence permit, BSN, DigiD, housing and rent law, banking, insurance, the huisarts, SIM, transport, working and money. Nineteen euro including VAT, paid once.</p>
            </Card>
          </Reveal>
          <Reveal delay={100} y={20}>
            <Card tone="sunken" elevation="none" padding="var(--space-6)" style={{height:'100%'}}>
              <span className="ub-overline">Start here</span>
              <h3 style={{margin:'10px 0 6px',fontSize:'var(--text-h4)'}}>Appendix A, then your week</h3>
              <p style={{margin:0,fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>You do not read it front to back. Print the master checklist, tick what is already done, then open the chapter for the week you are actually in.</p>
            </Card>
          </Reveal>
          <Reveal delay={200} y={20}>
            <Card padding="var(--space-6)" style={{height:'100%',border:'1px solid var(--gold-300)'}}>
              <span className="ub-overline">The promise</span>
              <h3 style={{margin:'10px 0 6px',fontSize:'var(--text-h4)'}}>Next edition free</h3>
              <p style={{margin:0,fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>Dutch amounts re-index on 1 January. When the 2027 edition lands, it comes to this same email address at no cost. Nothing to claim. Corrections in the meantime are listed with their date on the guide page.</p>
            </Card>
          </Reveal>
        </div>
      </section>

      <div style={{maxWidth:'var(--content-max)',margin:'var(--section-y) auto 0',padding:'0 var(--gutter-inline)'}}>
        <Reveal>
          <Card tone="ink" padding="clamp(32px,5vw,56px)" style={{position:'relative',overflow:'hidden',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'var(--space-10)',alignItems:'center',borderRadius:'var(--radius-2xl)'}}>
            <div className="ub-aurora" aria-hidden="true" style={{position:'absolute',inset:'-40%',opacity:.55,pointerEvents:'none'}}/>
            <div style={{position:'relative'}}>
              <h2 style={{color:'var(--cream-200)',fontSize:'var(--text-h2)',maxWidth:'22ch'}}>If you would rather somebody else did the running around</h2>
              <p style={{color:'var(--ink-100)',fontSize:'var(--text-body-lg)',margin:0,maxWidth:'50ch'}}>The handbook shows you how to do it yourself. Our plans are for when you want it taken off your hands. Tell us you bought the handbook and we take the nineteen euro off.</p>
            </div>
            <div style={{position:'relative',display:'flex',flexDirection:'column',gap:'var(--space-3)',alignItems:'flex-start'}}>
              <Magnetic><Button size="lg" onClick={()=>go('call')} iconLeft={<Icon name="video" size={17}/>}>Book a free 15-min call</Button></Magnetic>
              <Button size="lg" variant="ghost" style={{color:'var(--cream-200)'}} onClick={()=>go('services')}>See plans and pricing</Button>
            </div>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
Object.assign(window, { ThanksScreen });
