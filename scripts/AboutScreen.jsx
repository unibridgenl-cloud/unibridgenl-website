const { Card, Button, Icon, Badge, Tag } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Rise, Tilt, Stagger, Magnetic, Counter, DrawRule } = window;

const VALUES = [
  ["shield-check","We say no when the answer is no","If your grades don't clear a university's bar, we tell you before you pay. No commission from universities means nothing pushes us to oversell."],
  ["file-text","Everything in writing","One fee, fixed before you pay. Every deadline, every document, every cost written down where you can read it back."],
  ["message-circle","One advisor, not a call centre","The person on your first call is the person who files your application and answers your WhatsApp in August."]
];


function AboutScreen({ go }) {
  return (
    <main style={{overflowX:'clip'}}>
      <PageHero overline="About us" tone="ink"
        title="We built the service we needed as students"
        lead="UniBridge NL is a small Amsterdam team that walks international students from a first question to a room, a student number and a residence permit, without the guesswork."
        meta={[["map-pin","Amsterdam, the Netherlands"],["file-text","KvK 42087386"],["graduation-cap","16 universities we cover"]].map(([i,t])=>(
          <span key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:'var(--text-body-sm)'}}><Icon name={i} size={16} color="var(--gold-300)"/>{t}</span>
        ))}/>

      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(48px,7vw,96px) var(--gutter-inline) 0',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'clamp(28px,4vw,64px)',alignItems:'center'}}>
        <Reveal>
          <div className="ub-overline">Why we exist</div>
          <DrawRule delay={160} style={{margin:'12px 0 18px'}}/>
          <h2 style={{fontSize:'clamp(26px,3vw,40px)',letterSpacing:'-.025em',margin:'0 0 var(--space-4)',maxWidth:'22ch'}}>Moving countries is thirty small deadlines</h2>
          <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',margin:'0 0 var(--space-4)',textWrap:'pretty'}}>Every year, students with the grades to study here lose their place to a missing translation, a deposit paid to the wrong account, or a permit filed a week late.</p>
          <p style={{color:'var(--text-body)',margin:0,textWrap:'pretty'}}>We keep the list, file two weeks ahead of every university deadline, and stay reachable in the weeks where it actually matters, the ones between an offer letter and your first lecture.</p>
        </Reveal>
        <Reveal delay={140}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-4)'}}>
            {[[16,"universities we cover"],[13,"cities in the Netherlands"],[3,"years working in this field"],[5,"applications per student"]].map(([n,l])=>(
              <Tilt key={l} max={3}>
                <Card padding="var(--space-5)" style={{height:'100%'}}>
                  <div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:'clamp(30px,3.4vw,44px)',lineHeight:1,color:'var(--gold-700)',letterSpacing:'-.02em'}}>
                    <Counter to={n}/>
                  </div>
                  <div style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',marginTop:6}}>{l}</div>
                </Card>
              </Tilt>
            ))}
          </div>
        </Reveal>
      </section>

      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(48px,7vw,96px) var(--gutter-inline) 0'}}>
        <Reveal><div className="ub-overline">How we work</div></Reveal>
        <Reveal delay={60}><h2 style={{fontSize:'clamp(24px,2.6vw,34px)',letterSpacing:'-.02em',margin:'12px 0 var(--space-8)',maxWidth:'24ch'}}>Three rules we don't bend</h2></Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'var(--space-5)'}}>
          {VALUES.map(([ic,t,d],n)=>(
            <Reveal key={t} delay={n*110}>
              <Tilt max={3.5}>
                <Card padding="var(--space-6)" style={{height:'100%'}}>
                  <span style={{display:'inline-flex',width:46,height:46,borderRadius:'var(--radius-md)',alignItems:'center',justifyContent:'center',background:'var(--surface-accent-soft)',color:'var(--gold-700)',animation:'ub-float 6s var(--ease-standard) infinite'}}><Icon name={ic} size={22}/></span>
                  <h3 style={{margin:'var(--space-5) 0 8px',fontSize:'var(--text-h4)'}}>{t}</h3>
                  <p style={{margin:0,color:'var(--text-muted)',fontSize:'var(--text-body-sm)',lineHeight:1.6}}>{d}</p>
                </Card>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(48px,7vw,96px) var(--gutter-inline) 0'}}>
        <Reveal y={30}>
          <Card tone="ink" padding="clamp(32px,5vw,64px)" style={{position:'relative',overflow:'hidden',borderRadius:'var(--radius-2xl)',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'var(--space-8)',alignItems:'center'}}>
            <div className="ub-aurora" aria-hidden="true" style={{position:'absolute',inset:'-40%',opacity:.6,pointerEvents:'none'}}/>
            <div style={{position:'relative'}}>
              <h2 style={{color:'var(--cream-100)',fontSize:'var(--text-h2)',margin:'0 0 var(--space-3)',maxWidth:'24ch'}}>Ask us anything, before you commit</h2>
              <p style={{color:'var(--ink-100)',margin:0,maxWidth:'46ch'}}>Fifteen minutes on Google Meet. No payment, no obligation, and often we tell people they don't need us.</p>
            </div>
            <div style={{position:'relative',display:'flex',flexDirection:'column',gap:'var(--space-3)',alignItems:'flex-start'}}>
              <Magnetic><Button size="lg" onClick={()=>go('call')} iconLeft={<Icon name="video" size={17}/>}>Book a free 15-min call</Button></Magnetic>
              <Button size="lg" variant="ghost" style={{color:'var(--cream-200)'}} onClick={()=>go('contact')}>See all the ways to reach us</Button>
            </div>
          </Card>
        </Reveal>
      </section>
    </main>
  );
}
Object.assign(window, { AboutScreen });
